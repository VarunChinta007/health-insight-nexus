
import { useAppStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CalendarDays, Clock, HeartPulse, Stethoscope } from 'lucide-react';

const healthData = {
  weeklyActivity: [
    { day: 'Mon', steps: 6800, calories: 420 },
    { day: 'Tue', steps: 7200, calories: 450 },
    { day: 'Wed', steps: 5400, calories: 380 },
    { day: 'Thu', steps: 8100, calories: 490 },
    { day: 'Fri', steps: 7600, calories: 470 },
    { day: 'Sat', steps: 9200, calories: 550 },
    { day: 'Sun', steps: 7100, calories: 430 },
  ],
  healthMetrics: [
    { name: 'Heart Rate', value: 78, color: '#3B82F6' },
    { name: 'Blood Pressure', value: 120, color: '#14B8A6' },
    { name: 'Glucose', value: 95, color: '#84CC16' },
    { name: 'Cholesterol', value: 180, color: '#F97316' },
  ],
  monthlyBP: [
    { date: '01/05', systolic: 125, diastolic: 82 },
    { date: '05/05', systolic: 128, diastolic: 84 },
    { date: '10/05', systolic: 122, diastolic: 80 },
    { date: '15/05', systolic: 130, diastolic: 85 },
    { date: '20/05', systolic: 118, diastolic: 78 },
    { date: '25/05', systolic: 126, diastolic: 82 },
    { date: '30/05', systolic: 120, diastolic: 80 },
  ],
  sleepPattern: [
    { date: '01/05', deep: 2.5, light: 5.5, rem: 1.5 },
    { date: '02/05', deep: 2.2, light: 5.8, rem: 1.3 },
    { date: '03/05', deep: 2.8, light: 5.2, rem: 1.7 },
    { date: '04/05', deep: 2.3, light: 5.7, rem: 1.4 },
    { date: '05/05', deep: 2.6, light: 5.4, rem: 1.6 },
    { date: '06/05', deep: 2.1, light: 5.9, rem: 1.2 },
    { date: '07/05', deep: 2.7, light: 5.1, rem: 1.8 },
  ],
};

const Dashboard = () => {
  const { user, appointments, healthStats } = useAppStore();

  const upcomingAppointment = appointments.find(apt => apt.status === 'scheduled');

  return (
    <div className="bg-dashboard-bg bg-cover">
      <h1 className="text-3xl font-bold text-health-deep-blue mb-6 animate-fade-in">
        Dashboard
      </h1>

      {/* Welcome and Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-2 glass-card">
          <CardHeader className="pb-2">
            <CardTitle>Welcome, {user?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Here's your health overview for today
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-health-bright-blue/10">
                <div className="w-10 h-10 rounded-full bg-health-bright-blue/20 flex items-center justify-center text-health-bright-blue">
                  <HeartPulse size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Heart Rate</p>
                  <p className="text-lg font-semibold">
                    {healthStats.find(s => s.type === 'heart_rate')?.value || '78'} BPM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-health-teal/10">
                <div className="w-10 h-10 rounded-full bg-health-teal/20 flex items-center justify-center text-health-teal">
                  <Stethoscope size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Blood Pressure</p>
                  <p className="text-lg font-semibold">
                    {healthStats.find(s => s.type === 'blood_pressure')?.value || '130/85'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-health-lime/10">
                <div className="w-10 h-10 rounded-full bg-health-lime/20 flex items-center justify-center text-health-lime">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Blood Sugar</p>
                  <p className="text-lg font-semibold">
                    {healthStats.find(s => s.type === 'blood_sugar')?.value || '95'} mg/dL
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle>Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointment ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue">
                    <CalendarDays size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {upcomingAppointment.date}
                    </p>
                    <p className="text-lg font-semibold">{upcomingAppointment.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">
                    With: <span className="font-medium">{upcomingAppointment.doctorName}</span>
                  </p>
                  {upcomingAppointment.notes && (
                    <p className="text-sm text-gray-500 mt-1">
                      {upcomingAppointment.notes}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <CalendarDays size={32} className="mb-2 opacity-50" />
                <p>No upcoming appointments</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthData.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="steps" fill="#3B82F6" name="Steps" />
                <Bar yAxisId="right" dataKey="calories" fill="#14B8A6" name="Calories" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Blood Pressure History</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData.monthlyBP}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis domain={[70, 140]} />
                <Tooltip />
                <Line type="monotone" dataKey="systolic" stroke="#3B82F6" name="Systolic" strokeWidth={2} />
                <Line type="monotone" dataKey="diastolic" stroke="#14B8A6" name="Diastolic" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Sleep Pattern</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData.sleepPattern}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="deep" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Deep Sleep" />
                <Area type="monotone" dataKey="light" stackId="1" stroke="#14B8A6" fill="#14B8A6" name="Light Sleep" />
                <Area type="monotone" dataKey="rem" stackId="1" stroke="#84CC16" fill="#84CC16" name="REM Sleep" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthData.healthMetrics}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {healthData.healthMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
