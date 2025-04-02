
import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, FilePlus, Clock, Download, ClipboardList, Search, AlertCircle, Calendar, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const EHR = () => {
  const { user } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="flex flex-col gap-6 fade-in-animation">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Electronic Health Records</h1>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search records..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button size="sm" className="bg-health-bright-blue hover:bg-health-deep-blue">
            <FilePlus className="mr-1.5 h-4 w-4" /> Add Record
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Medical Summary Card */}
        <Card className="col-span-1 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 text-health-bright-blue" size={20} />
              Medical Summary
            </CardTitle>
            <CardDescription>Your essential health information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between border-b pb-2 mb-2">
                  <span className="font-medium">Blood Group:</span>
                  <span>O Positive</span>
                </div>
                <div className="flex justify-between border-b pb-2 mb-2">
                  <span className="font-medium">Height:</span>
                  <span>175 cm</span>
                </div>
                <div className="flex justify-between border-b pb-2 mb-2">
                  <span className="font-medium">Weight:</span>
                  <span>68 kg</span>
                </div>
                <div className="flex justify-between border-b pb-2 mb-2">
                  <span className="font-medium">BMI:</span>
                  <span>22.2 (Normal)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>June 12, 2023</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Allergies & Sensitivities:</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Penicillin</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Peanuts</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Latex</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Chronic Conditions:</h3>
                <div className="flex justify-between items-center">
                  <span>None reported</span>
                  <Button variant="ghost" size="sm" className="text-health-bright-blue hover:text-health-deep-blue p-1 h-auto">
                    <ArrowUpRight size={16} />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full flex justify-center items-center mt-2">
                <FileText className="mr-1.5" size={16} /> View Full Health Summary
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Prescriptions Card */}
        <Card className="md:col-span-2 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ClipboardList className="mr-2 text-health-bright-blue" size={20} />
              Recent Prescriptions
            </CardTitle>
            <CardDescription>Your current and recent medication orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Active</Badge>
                    <h3 className="font-medium">Antibiotics Course</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Dr. Sarah Johnson - June 15, 2023</p>
                  <div className="text-sm mt-2">
                    <span className="font-medium">Amoxicillin 500mg</span> - Take 1 capsule by mouth twice daily for 7 days
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <FileText size={16} className="mr-1" /> View
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center">
                    <Download size={16} className="mr-1" /> PDF
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Active</Badge>
                    <h3 className="font-medium">Vitamin D Supplements</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Dr. Michael Chen - May 22, 2023</p>
                  <div className="text-sm mt-2">
                    <span className="font-medium">Vitamin D3 1000 IU</span> - Take 1 tablet daily with food
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <FileText size={16} className="mr-1" /> View
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center">
                    <Download size={16} className="mr-1" /> PDF
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-gray-200 text-gray-600 border-gray-300">Expired</Badge>
                    <h3 className="font-medium">Pain Relief</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Dr. Emily Watson - April 5, 2023</p>
                  <div className="text-sm mt-2">
                    <span className="font-medium">Ibuprofen 400mg</span> - Take 1 tablet every 6-8 hours as needed for pain
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <FileText size={16} className="mr-1" /> View
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center">
                    <Download size={16} className="mr-1" /> PDF
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <p className="text-sm text-muted-foreground">Showing 3 of 12 prescriptions</p>
                <Button variant="link" className="text-health-bright-blue p-0 h-auto">
                  View All Prescriptions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FilePlus className="mr-2 text-health-bright-blue" size={20} />
            Medical Records
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge 
              className={`cursor-pointer ${activeFilter === 'all' ? 'bg-health-bright-blue text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </Badge>
            <Badge 
              className={`cursor-pointer ${activeFilter === 'recent' ? 'bg-health-bright-blue text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveFilter('recent')}
            >
              Recent
            </Badge>
            <Badge 
              className={`cursor-pointer ${activeFilter === 'important' ? 'bg-health-bright-blue text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveFilter('important')}
            >
              Important
            </Badge>
            <Badge 
              className={`cursor-pointer ${activeFilter === 'shared' ? 'bg-health-bright-blue text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveFilter('shared')}
            >
              Shared with me
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visits">
            <TabsList className="mb-4">
              <TabsTrigger value="visits">Doctor Visits</TabsTrigger>
              <TabsTrigger value="lab">Lab Results</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="immunizations">Immunizations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visits">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 border rounded-lg bg-white hover:border-health-bright-blue/30 transition-colors">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium">General Check-up</h4>
                          <p className="text-sm text-muted-foreground">Dr. Ryan Williams - Central Hospital</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock size={14} className="mr-1" /> 
                        May {10 - item}, 2023
                      </span>
                    </div>
                    <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm">
                      <p className="mb-2"><span className="font-medium">Chief Complaint:</span> Routine health examination</p>
                      <p className="mb-2"><span className="font-medium">Vitals:</span> BP 120/80, HR 72, Temp 98.6°F</p>
                      <p><span className="font-medium">Assessment:</span> Patient in good health. Blood pressure normal. Recommended regular exercise and balanced diet.</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex items-center text-sm">
                        <FileText size={14} className="mr-1" /> View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center text-sm">
                        <Download size={14} className="mr-1" /> Download
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center text-sm text-health-bright-blue">
                        <Calendar size={14} className="mr-1" /> Related Appointments
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="lab">
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="p-4 border rounded-lg bg-white hover:border-health-bright-blue/30 transition-colors">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium">Complete Blood Count</h4>
                          <p className="text-sm text-muted-foreground">Central Hospital Laboratory</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock size={14} className="mr-1" /> 
                        April {20 - item * 5}, 2023
                      </span>
                    </div>
                    
                    <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm">
                      <p className="text-xs uppercase font-semibold text-gray-500 mb-2">Test Results</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex justify-between">
                          <span>WBC:</span>
                          <span className="font-medium">7.5 K/uL</span>
                        </div>
                        <div className="flex justify-between">
                          <span>RBC:</span>
                          <span className="font-medium">4.8 M/uL</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hemoglobin:</span>
                          <span className="font-medium">14.2 g/dL</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hematocrit:</span>
                          <span className="font-medium">42%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platelets:</span>
                          <span className="font-medium">250 K/uL</span>
                        </div>
                      </div>
                      <p className="mt-2 text-green-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> All values within normal range
                      </p>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex items-center text-sm">
                        <FileText size={14} className="mr-1" /> View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center text-sm">
                        <Download size={14} className="mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="imaging">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-white hover:border-health-bright-blue/30 transition-colors">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Chest X-Ray</h4>
                        <p className="text-sm text-muted-foreground">Radiology Department, Central Hospital</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock size={14} className="mr-1" /> 
                      March 15, 2023
                    </span>
                  </div>
                  
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <div className="bg-gray-200 h-40 rounded flex items-center justify-center text-gray-500">
                          X-Ray Image Preview
                        </div>
                      </div>
                      <div className="col-span-2">
                        <h5 className="font-medium text-sm mb-1">Radiologist's Report</h5>
                        <p className="text-sm">
                          No abnormalities detected. Lungs are clear with no evidence of infiltrates, effusions, or pneumothorax. 
                          Heart size is normal. No pleural effusions or pneumothorax. Bony structures are intact.
                        </p>
                        <div className="mt-2 bg-green-50 text-green-700 text-sm p-2 rounded">
                          <p><strong>Conclusion:</strong> Normal chest radiograph with no acute findings.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="flex items-center text-sm">
                      <FileText size={14} className="mr-1" /> View Full Image
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center text-sm">
                      <Download size={14} className="mr-1" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="p-4 border rounded-lg bg-white hover:border-health-bright-blue/30 transition-colors">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium">Annual Health Assessment</h4>
                          <p className="text-sm text-muted-foreground">Dr. Julia Roberts - Wellness Clinic</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock size={14} className="mr-1" /> 
                        February {10 - item * 5}, 2023
                      </span>
                    </div>
                    
                    <div className="mt-3 bg-gray-50 p-3 rounded-md">
                      <p className="text-sm mb-2">
                        <span className="font-medium">Summary:</span> Overall health status is excellent. BMI within normal range.
                        Blood pressure and cholesterol levels are within healthy parameters.
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Recommendations:</span> Maintain current exercise regimen.
                        Consider increasing dietary fiber intake. Schedule follow-up in 12 months.
                      </p>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex items-center text-sm">
                        <Download size={14} className="mr-1" /> Download Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="immunizations">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-white">
                  <h3 className="font-medium mb-4">Immunization Records</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccine</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap">Tetanus/Diphtheria/Pertussis (Tdap)</td>
                          <td className="px-4 py-3 whitespace-nowrap">Jan 15, 2022</td>
                          <td className="px-4 py-3 whitespace-nowrap">Dr. Anna Martinez</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge className="bg-green-100 text-green-800">Up to date</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap">Influenza (Flu)</td>
                          <td className="px-4 py-3 whitespace-nowrap">Oct 5, 2022</td>
                          <td className="px-4 py-3 whitespace-nowrap">City Pharmacy</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge className="bg-green-100 text-green-800">Up to date</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap">COVID-19 (Primary series)</td>
                          <td className="px-4 py-3 whitespace-nowrap">Mar 10, 2021</td>
                          <td className="px-4 py-3 whitespace-nowrap">Community Clinic</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge className="bg-yellow-100 text-yellow-800">Booster recommended</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="flex items-center text-sm">
                      <Download size={14} className="mr-1" /> Download Records
                    </Button>
                    <Button size="sm" className="flex items-center text-sm bg-health-bright-blue hover:bg-health-deep-blue">
                      <Calendar size={14} className="mr-1" /> Schedule Vaccination
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EHR;
