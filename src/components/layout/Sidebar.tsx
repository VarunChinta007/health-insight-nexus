
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart4, 
  FileText, 
  Home, 
  PieChart, 
  Stethoscope, 
  User,
  Heart,
  Info,
  Brain,
  ActivitySquare
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user } = useAppStore();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      name: 'Home',
      path: '/',
    },
    {
      icon: User,
      name: 'Profile',
      path: '/profile',
    },
    {
      icon: BarChart4,
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: FileText,
      name: 'EHR',
      path: '/ehr',
    },
    {
      icon: Stethoscope,
      name: 'Diagnostics',
      path: '/diagnostics',
    },
    {
      icon: ActivitySquare,
      name: 'Health Insights',
      path: '/health-insights',
    },
    {
      icon: PieChart,
      name: 'Analysis',
      path: '/analysis',
    },
    {
      icon: Heart,
      name: 'Health Tips',
      path: '/health-tips',
    },
    {
      icon: Info,
      name: 'About Us',
      path: '/about',
    },
  ];

  return (
    <aside className="w-[250px] fixed left-0 top-[60px] h-[calc(100vh-60px)] bg-sidebar border-r border-gray-200 py-6 px-4 flex flex-col z-40 overflow-y-auto">
      <div className="flex-1">
        {user?.role && (
          <div className="mb-6 px-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-health-bright-blue/10 text-health-bright-blue">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </div>
          </div>
        )}
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-health-bright-blue text-white"
                  : "text-gray-700 hover:bg-health-bright-blue/10"
              )}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto">
        <div className="px-4 py-2">
          <div className="flex items-center px-4 py-3 rounded-lg bg-health-teal/10 text-health-teal">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500">Health Assistant</p>
              <p className="text-sm font-medium">AI Powered</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
