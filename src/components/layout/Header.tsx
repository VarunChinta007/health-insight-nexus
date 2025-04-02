
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAppStore } from '@/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { isAuthenticated, user, notifications, logout, markNotificationAsRead } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  return (
    <header className="w-full py-3 px-4 sm:px-6 bg-white border-b border-gray-200 shadow-sm fixed top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-health-deep-blue to-health-bright-blue">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-semibold text-health-deep-blue hidden md:block">
              Health Insight Nexus
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {isAuthenticated ? (
            <>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell size={20} />
                  {unreadNotificationsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-health-red text-white">
                      {unreadNotificationsCount}
                    </Badge>
                  )}
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No notifications</div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={16} />
                      )}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">
                      {user?.name || "User"}
                    </span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/profile" 
                      className="flex items-center cursor-pointer"
                    >
                      <User size={16} className="mr-2" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/settings" 
                      className="flex items-center cursor-pointer"
                    >
                      <Settings size={16} className="mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center cursor-pointer text-red-500 focus:text-red-500"
                    onClick={logout}
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            location.pathname !== "/login" && location.pathname !== "/signup" && (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-health-bright-blue hover:bg-health-deep-blue">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
