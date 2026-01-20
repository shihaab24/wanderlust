import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Map, Bell, User, Menu, X } from 'lucide-react';
    import { cn } from '@/lib/utils';

    type Page = 'planner' | 'dashboard' | 'itinerary' | 'profile';

    interface HeaderProps {
      currentPage: Page;
      navigate: (page: Page) => void;
    }

    const Header: React.FC<HeaderProps> = ({ currentPage, navigate }) => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
      const [notifications, setNotifications] = useState([
        { id: 1, message: "Welcome to TravelGenie!", read: false, timestamp: new Date() },
        { id: 2, message: "Your trip to Paris is ready.", read: false, timestamp: new Date() },
        { id: 3, message: "New feature: Collaborative planning!", read: true, timestamp: new Date() }
      ]);

      const unreadCount = notifications.filter(n => !n.read).length;

      const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
      };

      const handleDeleteNotification = (id: number) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
      };
      
      const handleDeleteAllNotifications = () => {
        setNotifications([]);
      };

      return (
        <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Map className="h-8 w-8 text-purple-400" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                  TravelGenie
                </h1>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                <NavItem text="Planner" page="planner" currentPage={currentPage} navigate={navigate} />
                <NavItem text="Dashboard" page="dashboard" currentPage={currentPage} navigate={navigate} />
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full hover:bg-gray-700 transition-colors transform hover:scale-105">
                    <Bell className="h-6 w-6 text-gray-300" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-gray-900" />
                    )}
                  </button>
                  {isNotificationsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                    >
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">Notifications</h3>
                        <div className="flex justify-between mt-2">
                          <button onClick={handleMarkAllAsRead} className="text-sm text-purple-400 hover:underline">Mark all as read</button>
                          <button onClick={handleDeleteAllNotifications} className="text-sm text-red-400 hover:underline">Delete all</button>
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? notifications.map(n => (
                          <div key={n.id} className={`p-3 border-t border-gray-700 flex items-start space-x-3 ${!n.read ? 'bg-purple-900/20' : ''}`}>
                            <div className="flex-shrink-0">
                              {!n.read && <div className="h-2 w-2 rounded-full bg-purple-400 mt-1.5"></div>}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">{n.message}</p>
                              <p className="text-xs text-gray-400">{n.timestamp.toLocaleTimeString()}</p>
                            </div>
                            <button onClick={() => handleDeleteNotification(n.id)} className="p-1 rounded-full hover:bg-gray-700">
                              <X size={14} />
                            </button>
                          </div>
                        )) : <p className="p-4 text-center text-gray-400">No new notifications.</p>}
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="relative">
                  <button onClick={() => navigate('profile')} className="p-2 rounded-full hover:bg-gray-700 transition-colors transform hover:scale-105">
                    <User className="h-6 w-6 text-gray-300" />
                  </button>
                </div>
                <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-700">
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              className="md:hidden bg-gray-800"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavItem text="Planner" page="planner" currentPage={currentPage} navigate={navigate} isMobile />
                <NavItem text="Dashboard" page="dashboard" currentPage={currentPage} navigate={navigate} isMobile />
              </div>
            </motion.div>
          )}
        </header>
      );
    };

    interface NavItemProps {
      text: string;
      page: Page;
      currentPage: Page;
      navigate: (page: Page) => void;
      isMobile?: boolean;
    }

    const NavItem: React.FC<NavItemProps> = ({ text, page, currentPage, navigate, isMobile }) => {
      const isActive = currentPage === page;
      return (
        <button
          onClick={() => navigate(page)}
          className={cn(
            "font-medium rounded-md transition-all duration-200 transform hover:scale-105",
            isActive ? "text-white bg-gradient-to-r from-purple-600 to-indigo-600" : "text-gray-300 hover:bg-gray-700 hover:text-white",
            isMobile ? "block w-full text-left px-3 py-2" : "px-3 py-2"
          )}
        >
          {text}
        </button>
      );
    };

    export default Header;