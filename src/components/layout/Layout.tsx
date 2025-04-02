
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import Header from './Header';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/sonner';

const Layout = () => {
  const { isAuthenticated } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Auth protection for routes
  useEffect(() => {
    const publicRoutes = ['/', '/login', '/signup'];
    const isPublicRoute = publicRoutes.includes(location.pathname);
    
    if (!isAuthenticated && !isPublicRoute) {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Don't show sidebar on login/signup pages
  const showSidebar = isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup';
  
  return (
    <>
      <Header />
      <div className="flex min-h-screen pt-[60px]">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-[250px]' : ''} p-6 bg-gray-50`}>
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default Layout;
