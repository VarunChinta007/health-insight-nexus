
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, Layers, MapPin } from 'lucide-react';

const regionalData = [
  { 
    region: "North",
    population: 2500000,
    conditions: {
      respiratory: 12500,
      cardiovascular: 18700,
      diabetes: 9800,
      mental: 16400
    }
  },
  { 
    region: "South",
    population: 3100000,
    conditions: {
      respiratory: 15300,
      cardiovascular: 21400,
      diabetes: 13600,
      mental: 18900
    }
  },
  { 
    region: "East",
    population: 1800000,
    conditions: {
      respiratory: 9200,
      cardiovascular: 12800,
      diabetes: 7500,
      mental: 10600
    }
  },
  { 
    region: "West",
    population: 2700000,
    conditions: {
      respiratory: 13800,
      cardiovascular: 19500,
      diabetes: 11200,
      mental: 14300
    }
  },
  { 
    region: "Central",
    population: 2200000,
    conditions: {
      respiratory: 11100,
      cardiovascular: 16300,
      diabetes: 8900,
      mental: 12500
    }
  }
];

const monthlyTrends = [
  { month: 'Jan', respiratory: 1250, cardiovascular: 1870, diabetes: 980, mental: 1640 },
  { month: 'Feb', respiratory: 1340, cardiovascular: 1920, diabetes: 1020, mental: 1580 },
  { month: 'Mar', respiratory: 1480, cardiovascular: 2050, diabetes: 1100, mental: 1650 },
  { month: 'Apr', respiratory: 1610, cardiovascular: 2130, diabetes: 1240, mental: 1720 },
  { month: 'May', respiratory: 1720, cardiovascular: 2080, diabetes: 1270, mental: 1790 },
  { month: 'Jun', respiratory: 1680, cardiovascular: 2010, diabetes: 1230, mental: 1830 },
  { month: 'Jul', respiratory: 1590, cardiovascular: 1950, diabetes: 1180, mental: 1880 },
  { month: 'Aug', respiratory: 1530, cardiovascular: 1920, diabetes: 1150, mental: 1910 },
  { month: 'Sep', respiratory: 1490, cardiovascular: 1880, diabetes: 1120, mental: 1860 },
  { month: 'Oct', respiratory: 1420, cardiovascular: 1850, diabetes: 1080, mental: 1790 },
  { month: 'Nov', respiratory: 1380, cardiovascular: 1830, diabetes: 1050, mental: 1730 },
  { month: 'Dec', respiratory: 1320, cardiovascular: 1890, diabetes: 1010, mental: 1690 }
];

const demographicData = [
  { name: '0-18', value: 15, color: '#3B82F6' },
  { name: '19-35', value: 28, color: '#14B8A6' },
  { name: '36-50', value: 25, color: '#F97316' },
  { name: '51-65', value: 18, color: '#84CC16' },
  { name: '65+', value: 14, color: '#DC2626' }
];

const conditionRadarData = [
  { subject: 'Respiratory', A: 85, B: 65, fullMark: 100 },
  { subject: 'Cardiovascular', A: 70, B: 60, fullMark: 100 },
  { subject: 'Diabetes', A: 60, B: 75, fullMark: 100 },
  { subject: 'Mental Health', A: 90, B: 78, fullMark: 100 },
  { subject: 'Cancer', A: 50, B: 45, fullMark: 100 },
  { subject: 'Obesity', A: 75, B: 80, fullMark: 100 }
];

const healthAlerts = [
  {
    id: 1,
    title: 'Seasonal Flu Outbreak',
    description: 'Increased cases of influenza reported in the Northern region',
    region: 'Northern',
    severity: 'medium',
    trend: 'increasing'
  },
  {
    id: 2,
    title: 'Respiratory Infections',
    description: 'Higher than average respiratory infections in urban areas',
    region: 'Urban Centers',
    severity: 'high',
    trend: 'stable'
  },
  {
    id: 3,
    title: 'Allergies Alert',
    description: 'Seasonal pollen count reaching peak levels',
    region: 'Nationwide',
    severity: 'low',
    trend: 'increasing'
  },
];

const Analysis = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  // Format data for charts
  const regionConditionData = regionalData.map(region => ({
    region: region.region,
    respiratory: region.conditions.respiratory,
    cardiovascular: region.conditions.cardiovascular,
    diabetes: region.conditions.diabetes,
    mental: region.conditions.mental
  }));

  return (
    <div className="bg-analysis-bg bg-cover">
      <h1 className="text-3xl font-bold text-health-deep-blue mb-6 animate-fade-in">
        Health Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {healthAlerts.map((alert) => (
          <Card 
            key={alert.id}
            className={`
              glass-card hover:shadow-lg transition-all
              ${alert.severity === 'high' ? 'border-l-4 border-l-health-red' :
                alert.severity === 'medium' ? 'border-l-4 border-l-health-orange' :
                'border-l-4 border-l-health-lime'}
            `}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{alert.title}</CardTitle>
                <Badge className={
                  alert.severity === 'high' ? 'bg-health-red' :
                  alert.severity === 'medium' ? 'bg-health-orange' :
                  'bg-health-lime'
                }>
                  {alert.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{alert.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {alert.region}
                </div>
                <div className="flex items-center text-sm">
                  {alert.trend === 'increasing' ? (
                    <span className="flex items-center text-health-red">
                      <ArrowUp size={14} className="mr-1" /> Rising
                    </span>
                  ) : alert.trend === 'decreasing' ? (
                    <span className="flex items-center text-health-lime">
                      <ArrowDown size={14} className="mr-1" /> Declining
                    </span>
                  ) : (
                    <span className="flex items-center text-health-orange">
                      Stable
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="regional">
        <TabsList className="mb-6 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="demographic">Demographic Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="regional">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Health Conditions by Region</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionConditionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar name="Respiratory" dataKey="respiratory" fill="#3B82F6" />
                    <Bar name="Cardiovascular" dataKey="cardiovascular" fill="#F97316" />
                    <Bar name="Diabetes" dataKey="diabetes" fill="#14B8A6" />
                    <Bar name="Mental Health" dataKey="mental" fill="#84CC16" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Regional Health Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-4 h-72 relative">
                  <div className="w-full h-full border border-gray-300 rounded-lg relative">
                    {/* Simplified Map UI */}
                    {regionalData.map((region) => {
                      // Position regions in a layout that resembles a map
                      const getPosition = () => {
                        switch(region.region) {
                          case 'North': return 'top-5 left-1/2 -translate-x-1/2';
                          case 'South': return 'bottom-5 left-1/2 -translate-x-1/2';
                          case 'East': return 'top-1/2 right-5 -translate-y-1/2';
                          case 'West': return 'top-1/2 left-5 -translate-y-1/2';
                          case 'Central': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
                          default: return '';
                        }
                      };

                      return (
                        <Button
                          key={region.region}
                          variant="outline"
                          className={`
                            absolute ${getPosition()} px-3 py-1.5 min-w-16
                            ${selectedRegion === region.region ? 'bg-health-bright-blue text-white' : 'bg-white'}
                          `}
                          onClick={() => handleRegionSelect(region.region)}
                        >
                          {region.region}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                
                {selectedRegion && (
                  <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-white">
                    <h4 className="font-semibold mb-2">{selectedRegion} Region</h4>
                    <p className="text-sm mb-2">
                      Population: {regionalData.find(r => r.region === selectedRegion)?.population.toLocaleString()}
                    </p>
                    <div className="space-y-2">
                      {Object.entries(regionalData.find(r => r.region === selectedRegion)?.conditions || {}).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{key}:</span>
                          <span className="text-sm font-medium">{Number(value).toLocaleString()} cases</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid grid-cols-1 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Health Trends Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="respiratory" stroke="#3B82F6" name="Respiratory" strokeWidth={2} />
                    <Line type="monotone" dataKey="cardiovascular" stroke="#F97316" name="Cardiovascular" strokeWidth={2} />
                    <Line type="monotone" dataKey="diabetes" stroke="#14B8A6" name="Diabetes" strokeWidth={2} />
                    <Line type="monotone" dataKey="mental" stroke="#84CC16" name="Mental Health" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Condition Prevalence Comparison</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={conditionRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="This Year" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                      <Radar name="Last Year" dataKey="B" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.5} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle>Key Insights</CardTitle>
                  <Badge variant="outline" className="bg-health-bright-blue/10">AI Generated</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Layers size={16} className="text-health-bright-blue" />
                        <h4 className="font-medium">Respiratory Conditions</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        15% increase in respiratory conditions over the last quarter, particularly in urban areas with higher pollution levels.
                      </p>
                    </div>
                    
                    <div className="p-3 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Layers size={16} className="text-health-teal" />
                        <h4 className="font-medium">Mental Health</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Consistent upward trend in mental health consultations, with a 22% increase in anxiety-related diagnoses.
                      </p>
                    </div>
                    
                    <div className="p-3 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Layers size={16} className="text-health-lime" />
                        <h4 className="font-medium">Diabetes Management</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Improved diabetes management showing in reduced emergency cases by 8%, likely due to better monitoring systems.
                      </p>
                    </div>
                    
                    <div className="p-3 border border-health-orange/30 rounded-lg bg-health-orange/5">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle size={16} className="text-health-orange" />
                        <h4 className="font-medium">Emerging Pattern</h4>
                      </div>
                      <p className="text-sm text-gray-700">
                        Our AI has detected a correlation between seasonal humidity changes and respiratory condition spikes in coastal regions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="demographic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {demographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="glass-card md:col-span-2">
              <CardHeader>
                <CardTitle>Demographic Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Age Groups</h3>
                      <div className="space-y-2">
                        {demographicData.map((item) => (
                          <div key={item.name} className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm">{item.name}:</span>
                            <span className="text-sm font-medium">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Gender Distribution</h3>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-health-bright-blue"></div>
                          <span className="text-sm">Male: 48%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-health-teal"></div>
                          <span className="text-sm">Female: 51%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-health-lime"></div>
                          <span className="text-sm">Other: 1%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Key Findings</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Highest healthcare utilization in 36-50 age group</li>
                        <li>Mental health issues most prevalent in 19-35 age group</li>
                        <li>Cardiovascular conditions dominant in 51+ age groups</li>
                        <li>Pediatric respiratory cases showing declining trend</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Recommendations</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Increase mental health resources for young adults</li>
                        <li>Expand cardiovascular screening programs for 45+ age group</li>
                        <li>Continue pediatric respiratory health initiatives</li>
                        <li>Develop targeted diabetes prevention for 36-50 age group</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">Risk Patterns</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-medium mb-1">High Risk</h4>
                      <p className="text-xs text-gray-600">Males 55+ with history of heart disease</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-medium mb-1">Medium Risk</h4>
                      <p className="text-xs text-gray-600">Adults 35+ with sedentary lifestyles</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-medium mb-1">Emerging Risk</h4>
                      <p className="text-xs text-gray-600">Young adults with increasing screen time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
