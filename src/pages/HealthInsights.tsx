
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  ActivitySquare, 
  Heart, 
  Brain, 
  Lungs, 
  Dumbbell, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Microscope,
  Salad,
  Info
} from 'lucide-react';
import { useAppStore } from '@/store';
import { useToast } from '@/hooks/use-toast';

const HealthInsights = () => {
  const { user, healthStats } = useAppStore();
  const { toast } = useToast();
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock risk scores - in a real app these would come from ML models
  const healthRisks = [
    {
      condition: "Heart Disease",
      riskScore: 23,
      icon: Heart,
      riskLevel: "low",
      trend: "stable",
      description: "Your regular exercise and healthy diet are helping maintain a low risk profile.",
      color: "#4ade80" // Green for low risk
    },
    {
      condition: "Diabetes Type 2",
      riskScore: 42,
      icon: ActivitySquare,
      riskLevel: "moderate",
      trend: "decreasing",
      description: "Recent improvements in your diet have reduced your risk factors.",
      color: "#facc15" // Yellow for moderate risk
    },
    {
      condition: "Hypertension",
      riskScore: 65,
      icon: Heart,
      riskLevel: "high",
      trend: "increasing",
      description: "Your blood pressure readings indicate increased risk. Consider consulting a specialist.",
      color: "#f87171" // Red for high risk
    },
    {
      condition: "Sleep Disorders",
      riskScore: 31,
      icon: Clock,
      riskLevel: "moderate",
      trend: "stable",
      description: "Your sleep patterns show some irregularity. Try to maintain consistent sleep hours.",
      color: "#facc15" // Yellow for moderate risk
    }
  ];

  const yearlyTrends = [
    { month: 'Jan', heartRisk: 30, diabetesRisk: 50 },
    { month: 'Feb', heartRisk: 28, diabetesRisk: 48 },
    { month: 'Mar', heartRisk: 25, diabetesRisk: 45 },
    { month: 'Apr', heartRisk: 27, diabetesRisk: 46 },
    { month: 'May', heartRisk: 26, diabetesRisk: 44 },
    { month: 'Jun', heartRisk: 28, diabetesRisk: 43 },
    { month: 'Jul', heartRisk: 24, diabetesRisk: 40 },
    { month: 'Aug', heartRisk: 22, diabetesRisk: 38 },
    { month: 'Sep', heartRisk: 23, diabetesRisk: 42 },
    { month: 'Oct', heartRisk: 20, diabetesRisk: 40 },
    { month: 'Nov', heartRisk: 22, diabetesRisk: 38 },
    { month: 'Dec', heartRisk: 23, diabetesRisk: 42 }
  ];
  
  const lifestyleFactors = [
    { name: 'Exercise', score: 75, fill: '#4ade80' },
    { name: 'Diet', score: 60, fill: '#facc15' },
    { name: 'Sleep', score: 50, fill: '#facc15' },
    { name: 'Stress', score: 40, fill: '#f87171' },
    { name: 'Hydration', score: 80, fill: '#4ade80' }
  ];

  const recommendedActions = [
    {
      title: "Increase Physical Activity",
      icon: Dumbbell,
      description: "Try to reach 30 minutes of moderate exercise 5 days a week.",
      impact: "Reduces heart disease risk by up to 30%"
    },
    {
      title: "Optimize Diet",
      icon: Salad,
      description: "Increase vegetable intake and reduce processed foods.",
      impact: "May lower diabetes risk by up to 25%"
    },
    {
      title: "Regular Check-ups",
      icon: Microscope,
      description: "Schedule annual physical and blood work.",
      impact: "Early detection improves treatment outcomes by 60%"
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch personalized insights
    const timer = setTimeout(() => {
      setInsights(healthRisks);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleGenerateFullReport = () => {
    toast({
      title: "Generating comprehensive health report",
      description: "Your personalized health report will be ready in a few moments.",
    });
  };

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge className="bg-green-500 hover:bg-green-600">{level}</Badge>;
      case 'moderate':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{level}</Badge>;
      case 'high':
        return <Badge className="bg-red-500 hover:bg-red-600">{level}</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') return '↑';
    if (trend === 'decreasing') return '↓';
    return '→';
  };

  return (
    <div className="bg-health-insights-bg bg-cover">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-health-deep-blue mb-2 animate-fade-in">
              AI Health Insights
            </h1>
            <p className="text-gray-600 mb-4">
              Personalized health risk assessments and recommendations powered by AI
            </p>
          </div>
          <Button onClick={handleGenerateFullReport} className="bg-health-bright-blue hover:bg-health-deep-blue">
            Generate Full Health Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="glass-card animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-7 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            insights.map((risk) => (
              <Card key={risk.condition} className="glass-card overflow-hidden">
                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <risk.icon className="text-health-bright-blue" size={18} />
                      {risk.condition}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getRiskLevelBadge(risk.riskLevel)}
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        Trend: {getTrendIcon(risk.trend)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Risk Score</span>
                      <span className="font-semibold">{risk.riskScore}%</span>
                    </div>
                    <Progress value={risk.riskScore} className="h-2" 
                      style={{
                        backgroundColor: "rgba(0,0,0,0.1)",
                        "--tw-progress-bar-background": risk.color
                      } as React.CSSProperties}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{risk.description}</p>
                </CardContent>
                <div className="h-1" style={{ backgroundColor: risk.color }}></div>
              </Card>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivitySquare className="text-health-bright-blue" size={18} />
                Health Risk Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="heartRisk" 
                    name="Heart Disease Risk" 
                    stroke="#f87171" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diabetesRisk" 
                    name="Diabetes Risk" 
                    stroke="#facc15" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="text-health-bright-blue" size={18} />
                Lifestyle Impact Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lifestyleFactors} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="score" nameKey="name">
                    {lifestyleFactors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="text-health-bright-blue" size={18} />
              AI-Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedActions.map((action) => (
                <div key={action.title} className="border border-gray-200 rounded-lg p-4 hover:border-health-bright-blue hover:bg-health-bright-blue/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue mb-4">
                    <action.icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                  <p className="text-xs font-medium text-health-bright-blue flex items-center gap-1">
                    <Info size={12} />
                    {action.impact}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="bg-health-bright-blue/10 rounded-lg p-4 w-full">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="text-health-bright-blue" size={18} />
                <h3 className="font-semibold">Important Note</h3>
              </div>
              <p className="text-sm text-gray-600">
                These AI-generated insights are based on available health data and should not replace professional medical advice. Always consult with healthcare providers before making health decisions.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HealthInsights;
