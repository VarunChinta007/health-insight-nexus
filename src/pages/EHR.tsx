
import { useState } from 'react';
import { useAppStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  FileText, 
  Filter, 
  Search, 
  Upload,
  Calendar, 
  Prescription, 
  FlaskConical, 
  Activity, 
  Stethoscope
} from 'lucide-react';
import { toast } from 'sonner';
import { MedicalRecord } from '@/types';

const EHR = () => {
  const { user, medicalRecords } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = !searchTerm || 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = !filterType || record.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (record: MedicalRecord) => {
    toast.success(`Record "${record.title}" downloaded successfully`);
  };

  const handleFilterClear = () => {
    setFilterType(null);
    setSearchTerm('');
  };
  
  // Group records by year and month
  const groupedRecords = filteredRecords.reduce((groups, record) => {
    const date = new Date(record.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    
    if (!groups[year]) {
      groups[year] = {};
    }
    
    if (!groups[year][month]) {
      groups[year][month] = [];
    }
    
    groups[year][month].push(record);
    return groups;
  }, {} as Record<number, Record<number, MedicalRecord[]>>);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const recordTypeIcons = {
    prescription: <Prescription size={16} />,
    lab: <FlaskConical size={16} />,
    imaging: <Activity size={16} />,
    visit: <Stethoscope size={16} />,
    surgery: <Calendar size={16} />,
    other: <FileText size={16} />
  };

  return (
    <div className="bg-ehr-bg bg-cover">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-health-deep-blue animate-fade-in">
          Electronic Health Records
        </h1>
        
        <Button className="btn-primary">
          <Upload size={16} className="mr-2" />
          Upload Document
        </Button>
      </div>

      <Card className="glass-card mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Patient Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Patient</p>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">ID: {user?.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="font-semibold">{user?.age ? `Age ${user.age}` : 'N/A'}</p>
              <p className="text-sm text-gray-500">Blood Group: {user?.bloodGroup || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Allergies</p>
              {user?.allergies && user.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="font-semibold">No known allergies</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Medical Conditions</p>
              {user?.conditions && user.conditions.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="font-semibold">No medical conditions</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="timeline">
        <TabsList className="mb-6 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <Card className="glass-card mb-6">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Medical Timeline</CardTitle>
                  <div className="flex gap-2">
                    {filterType && (
                      <Badge variant="outline" className="bg-gray-100 gap-1 cursor-pointer" onClick={handleFilterClear}>
                        {filterType}
                        <span className="ml-1">✕</span>
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-6">
                    <Search size={20} className="text-gray-400" />
                    <Input
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" className="gap-2">
                      <Filter size={16} />
                      Filter
                    </Button>
                  </div>

                  {Object.keys(groupedRecords).length > 0 ? (
                    <div className="space-y-8">
                      {Object.keys(groupedRecords)
                        .sort((a, b) => Number(b) - Number(a)) // Sort years descending
                        .map(year => (
                          <div key={year} className="space-y-4">
                            <h3 className="text-xl font-bold text-health-deep-blue">{year}</h3>
                            {Object.keys(groupedRecords[Number(year)])
                              .sort((a, b) => Number(b) - Number(a)) // Sort months descending
                              .map(month => (
                                <div key={`${year}-${month}`} className="pl-6 border-l-2 border-gray-200">
                                  <h4 className="text-lg font-medium text-gray-700 mb-3">
                                    {monthNames[Number(month)]}
                                  </h4>
                                  <div className="space-y-4">
                                    {groupedRecords[Number(year)][Number(month)].map((record) => (
                                      <div 
                                        key={record.id} 
                                        className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200"
                                      >
                                        <div className="flex flex-wrap justify-between gap-4">
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <Badge className={`
                                                ${record.type === 'prescription' ? 'bg-purple-100 text-purple-600' : 
                                                  record.type === 'lab' ? 'bg-blue-100 text-blue-600' :
                                                  record.type === 'imaging' ? 'bg-indigo-100 text-indigo-600' :
                                                  record.type === 'visit' ? 'bg-green-100 text-green-600' :
                                                  record.type === 'surgery' ? 'bg-red-100 text-red-600' :
                                                  'bg-gray-100 text-gray-600'}
                                                flex items-center gap-1 capitalize cursor-pointer
                                              `}
                                                onClick={() => setFilterType(record.type)}
                                              >
                                                {record.type === 'prescription' ? recordTypeIcons.prescription :
                                                 record.type === 'lab' ? recordTypeIcons.lab :
                                                 record.type === 'imaging' ? recordTypeIcons.imaging :
                                                 record.type === 'visit' ? recordTypeIcons.visit :
                                                 record.type === 'surgery' ? recordTypeIcons.surgery :
                                                 recordTypeIcons.other}
                                                {record.type}
                                              </Badge>
                                              <span className="text-sm text-gray-500">{record.date}</span>
                                            </div>
                                            <h4 className="text-lg font-medium mt-1">{record.title}</h4>
                                          </div>
                                          
                                          <div className="flex items-start gap-2">
                                            <Button 
                                              variant="outline" 
                                              size="sm"
                                              onClick={() => handleDownload(record)}
                                              className="flex items-center gap-1"
                                            >
                                              <Download size={16} />
                                              Download
                                            </Button>
                                          </div>
                                        </div>
                                        
                                        <p className="text-gray-600 mt-2">{record.description}</p>
                                        
                                        {record.attachments && record.attachments.length > 0 && (
                                          <div className="mt-3 pt-3 border-t border-gray-100">
                                            <p className="text-sm text-gray-500 mb-2">Attachments:</p>
                                            <div className="flex flex-wrap gap-2">
                                              {record.attachments.map((attachment, index) => (
                                                <div 
                                                  key={index}
                                                  className="p-2 bg-gray-50 rounded border border-gray-200 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                  <FileText size={16} className="text-health-bright-blue" />
                                                  <span className="text-sm">
                                                    {attachment.split('/').pop()}
                                                  </span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                        
                                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                          <div className="text-sm text-gray-500">
                                            Doctor: <span className="font-medium">{record.doctorName}</span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-800">No Records Found</h3>
                      <p className="text-gray-500">
                        {searchTerm || filterType ? 'No records match your search criteria' : 'No medical records available'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/4">
              <Card className="glass-card sticky top-[84px]">
                <CardHeader className="pb-2">
                  <CardTitle>Filter by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['prescription', 'lab', 'imaging', 'visit', 'surgery', 'other'].map((type) => (
                      <div
                        key={type}
                        className={`
                          p-2 rounded-md flex items-center gap-2 cursor-pointer transition-colors
                          ${filterType === type ? 'bg-health-bright-blue/10 border border-health-bright-blue/30' : 'hover:bg-gray-100'}
                        `}
                        onClick={() => setFilterType(filterType === type ? null : type)}
                      >
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${type === 'prescription' ? 'bg-purple-100 text-purple-600' : 
                            type === 'lab' ? 'bg-blue-100 text-blue-600' :
                            type === 'imaging' ? 'bg-indigo-100 text-indigo-600' :
                            type === 'visit' ? 'bg-green-100 text-green-600' :
                            type === 'surgery' ? 'bg-red-100 text-red-600' :
                            'bg-gray-100 text-gray-600'}
                        `}>
                          {type === 'prescription' ? <Prescription size={16} /> : 
                           type === 'lab' ? <FlaskConical size={16} /> :
                           type === 'imaging' ? <Activity size={16} /> :
                           type === 'visit' ? <Stethoscope size={16} /> :
                           type === 'surgery' ? <Calendar size={16} /> :
                           <FileText size={16} />}
                        </div>
                        <span className="capitalize">{type}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Medical Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                This section will contain organized medical documents like test results, imaging studies, and discharge summaries.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Medication History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                This section will display current and past medications, dosage information, and prescription history.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Vital Signs History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                This section will track vital signs over time with graphs and trends for blood pressure, heart rate, temperature, etc.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EHR;
