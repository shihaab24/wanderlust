import React from 'react';
    import { LayoutDashboard, Plane, UserCircle, Settings } from 'lucide-react';
    import { cn } from '@/lib/utils';

    type Page = 'planner' | 'dashboard' | 'itinerary' | 'profile';

    interface SidebarProps {
      currentPage: Page;
      navigate: (page: Page) => void;
    }

    const Sidebar: React.FC<SidebarProps> = ({ currentPage, navigate }) => {
      return (
        <aside className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700 p-4 space-y-2">
          <SidebarItem icon={LayoutDashboard} text="Dashboard" page="dashboard" currentPage={currentPage} navigate={navigate} />
          <SidebarItem icon={Plane} text="Planner" page="planner" currentPage={currentPage} navigate={navigate} />
          <SidebarItem icon={UserCircle} text="Profile" page="profile" currentPage={currentPage} navigate={navigate} />
        </aside>
      );
    };

    interface SidebarItemProps {
      icon: React.ElementType;
      text: string;
      page: Page;
      currentPage: Page;
      navigate: (page: Page) => void;
    }

    const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text, page, currentPage, navigate }) => {
      const isActive = currentPage === page;
      return (
        <button
          onClick={() => navigate(page)}
          className={cn(
            "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg",
            isActive 
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" 
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          )}
        >
          <Icon className="h-6 w-6" />
          <span>{text}</span>
        </button>
      );
    };

    export default Sidebar;