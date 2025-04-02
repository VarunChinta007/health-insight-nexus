
import React from 'react';
import { useAppStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FilePlus, Clock, Download, ClipboardList } from 'lucide-react'; // Changed Prescription to ClipboardList

const EHR = () => {
  const { user } = useAppStore();

  return (
    <div className="flex flex-col gap-6 fade-in-animation">
      <h1 className="text-2xl font-bold">Electronic Health Records</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 text-health-bright-blue" size={20} />
              Medical Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your essential medical information at a glance.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Blood Group:</span>
                <span>O Positive</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Allergies:</span>
                <span>Penicillin, Peanuts</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Chronic Conditions:</span>
                <span>None</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ClipboardList className="mr-2 text-health-bright-blue" size={20} />
              Recent Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Antibiotics Course</p>
                  <p className="text-sm text-muted-foreground">Dr. Sarah Johnson - June 15, 2023</p>
                </div>
                <Button size="sm" variant="outline" className="flex items-center">
                  <Download size={16} className="mr-1" /> PDF
                </Button>
              </div>
              
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Vitamin D Supplements</p>
                  <p className="text-sm text-muted-foreground">Dr. Michael Chen - May 22, 2023</p>
                </div>
                <Button size="sm" variant="outline" className="flex items-center">
                  <Download size={16} className="mr-1" /> PDF
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
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visits">
            <TabsList className="mb-4">
              <TabsTrigger value="visits">Doctor Visits</TabsTrigger>
              <TabsTrigger value="lab">Lab Results</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visits">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">General Check-up</h4>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock size={14} className="mr-1" /> 
                        May {10 - item}, 2023
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Dr. Ryan Williams - Central Hospital</p>
                    <p className="text-sm mb-3">Routine health examination. Blood pressure normal. Recommended regular exercise.</p>
                    <Button variant="outline" size="sm" className="flex items-center text-sm">
                      <FileText size={14} className="mr-1" /> View Details
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="lab">
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Complete Blood Count</h4>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock size={14} className="mr-1" /> 
                        April {20 - item * 5}, 2023
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Central Hospital Laboratory</p>
                    <p className="text-sm mb-3">All values within normal range. No anomalies detected.</p>
                    <div className="flex space-x-2">
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
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Chest X-Ray</h4>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock size={14} className="mr-1" /> 
                      March 15, 2023
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Radiology Department, Central Hospital</p>
                  <p className="text-sm mb-3">No abnormalities detected. Lungs clear.</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center text-sm">
                      <FileText size={14} className="mr-1" /> View Image
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
                  <div key={item} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Annual Health Assessment</h4>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock size={14} className="mr-1" /> 
                        February {10 - item * 5}, 2023
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Dr. Julia Roberts - Wellness Clinic</p>
                    <p className="text-sm mb-3">Overall health status is excellent. Recommended dietary changes included.</p>
                    <Button variant="outline" size="sm" className="flex items-center text-sm">
                      <Download size={14} className="mr-1" /> Download Report
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EHR;
