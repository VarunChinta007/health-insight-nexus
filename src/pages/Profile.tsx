
import { useState } from 'react';
import { useAppStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Edit2, Save, User } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, appointments, updateUser } = useAppStore();
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    gender: user?.gender || '',
    bloodGroup: user?.bloodGroup || '',
    allergies: user?.allergies?.join(', ') || '',
    conditions: user?.conditions?.join(', ') || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser = {
      name: formData.name,
      email: formData.email,
      age: Number(formData.age),
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : [],
      conditions: formData.conditions ? formData.conditions.split(',').map(c => c.trim()) : [],
    };
    
    updateUser(updatedUser);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="bg-profile-bg bg-cover">
      <h1 className="text-3xl font-bold text-health-deep-blue mb-6 animate-fade-in">
        My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden mb-4">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=3B82F6&color=fff';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-health-bright-blue text-white text-4xl">
                    <User size={48} />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <Badge className="mt-2 bg-health-bright-blue capitalize">
                {user?.role}
              </Badge>

              <div className="w-full mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-gray-500 text-sm">Age</p>
                    <p className="font-semibold">{user?.age || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Gender</p>
                    <p className="font-semibold">{user?.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Blood Group</p>
                    <p className="font-semibold">{user?.bloodGroup || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Patient ID</p>
                    <p className="font-semibold">{user?.id || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="mb-6 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => editing ? handleSubmit : setEditing(!editing)}
                    className="flex items-center gap-1"
                  >
                    {editing ? (
                      <>
                        <Save size={16} /> Save
                      </>
                    ) : (
                      <>
                        <Edit2 size={16} /> Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name} 
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email} 
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        name="age"
                        type="number"
                        value={formData.age} 
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Input 
                        id="gender" 
                        name="gender"
                        value={formData.gender} 
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Input 
                        id="bloodGroup" 
                        name="bloodGroup"
                        value={formData.bloodGroup} 
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                      <Input 
                        id="allergies" 
                        name="allergies"
                        value={formData.allergies} 
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="conditions">Medical Conditions (comma-separated)</Label>
                      <Input 
                        id="conditions" 
                        name="conditions"
                        value={formData.conditions} 
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1"
                      />
                    </div>
                    {editing && (
                      <div className="md:col-span-2 flex justify-end">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="mr-2"
                          onClick={() => setEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-health-bright-blue hover:bg-health-deep-blue">
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Allergies</h3>
                      {user?.allergies && user.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.allergies.map((allergy, index) => (
                            <Badge key={index} variant="outline" className="bg-red-50 text-red-600 border-red-200">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No known allergies</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Medical Conditions</h3>
                      {user?.conditions && user.conditions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.conditions.map((condition, index) => (
                            <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No medical conditions</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Medications</h3>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-500">No current medications</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Past Procedures</h3>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-500">No past procedures on record</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Appointment History</CardTitle>
                </CardHeader>
                <CardContent>
                  {appointments.length > 0 ? (
                    <div className="space-y-6">
                      {appointments.map((apt) => (
                        <div 
                          key={apt.id} 
                          className="p-4 rounded-lg border border-gray-200 bg-white flex flex-col md:flex-row gap-4 md:items-center justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue">
                                <CalendarDays size={20} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">{apt.date}</p>
                                <p className="font-semibold">{apt.time}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-500">Doctor</p>
                            <p className="font-semibold">{apt.doctorName}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge className={
                              apt.status === 'scheduled' ? 'bg-blue-100 text-blue-600 hover:bg-blue-100' :
                              apt.status === 'completed' ? 'bg-green-100 text-green-600 hover:bg-green-100' :
                              'bg-red-100 text-red-600 hover:bg-red-100'
                            }>
                              {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                            </Badge>
                            
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-center">
                        <Button className="bg-health-bright-blue hover:bg-health-deep-blue">
                          Schedule New Appointment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <CalendarDays size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-800">No Appointments</h3>
                      <p className="text-gray-500 mb-6">You haven't scheduled any appointments yet</p>
                      <Button className="bg-health-bright-blue hover:bg-health-deep-blue">
                        Schedule an Appointment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Calendar Days icon component
const CalendarDays = ({ size = 24, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
};

export default Profile;
