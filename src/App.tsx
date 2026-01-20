import React, { useState, useEffect } from 'react';
    import Header from '@/components/layout/Header';
    import Sidebar from '@/components/layout/Sidebar';
    import PlannerPage from '@/pages/PlannerPage';
    import DashboardPage from '@/pages/DashboardPage';
    import ItineraryPage from '@/pages/ItineraryPage';
    import ProfilePage from '@/pages/ProfilePage';

    type Page = 'planner' | 'dashboard' | 'itinerary' | 'profile';

    function App() {
      const [currentPage, setCurrentPage] = useState<Page>('planner');

      useEffect(() => {
        const handlePopState = () => {
          const path = window.location.pathname.slice(1);
          if (['planner', 'dashboard', 'itinerary', 'profile'].includes(path)) {
            setCurrentPage(path as Page);
          } else {
            setCurrentPage('planner');
          }
        };

        window.addEventListener('popstate', handlePopState);
        
        // Set initial page based on URL
        handlePopState();

        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);

      const handleNavigation = (page: Page) => {
        setCurrentPage(page);
        window.history.pushState({}, '', `/${page}`);
      };

      const renderPage = () => {
        switch (currentPage) {
          case 'dashboard':
            return <DashboardPage />;
          case 'itinerary':
            return <ItineraryPage />;
          case 'profile':
            return <ProfilePage />;
          case 'planner':
          default:
            return <PlannerPage />;
        }
      };
      
      useEffect(() => {
        ["log", "warn", "error"].forEach((level) => {
        const original = console[level as keyof Console] as (...args: any[]) => void;

        console[level as keyof Console] = (...args: any[]) => {
        original.apply(console, args);

        const safeArgs = args.map((a) => {
        if (a instanceof Error) {
            return {
            message: a.message,
            stack: a.stack,
            name: a.name,
            };
        }
        try {
            JSON.stringify(a);
            return a;
        } catch {
            return String(a);
        }
        });

        try {
        window.parent?.postMessage(
            { type: "iframe-console", level, args: safeArgs },
            "*"
        );
        } catch (e) {
        original("Failed to postMessage:", e);
        }
        };
        });

        window.onerror = (msg, url, line, col, error) => {
        window.parent?.postMessage(
        {
        type: "iframe-console",
        level: "error",
        args: [
            msg,
            url,
            line,
            col,
            error ? { message: error.message, stack: error.stack } : null,
        ],
        },
        "*"
        );
        };

        window.onunhandledrejection = (event) => {
        const reason =
        event.reason instanceof Error
        ? { message: event.reason.message, stack: event.reason.stack }
        : event.reason;

        window.parent?.postMessage(
        {
        type: "iframe-console",
        level: "error",
        args: ["Unhandled Promise Rejection:", reason],
        },
        "*"
        );
        };
    }, []);

      return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
          <Header currentPage={currentPage} navigate={handleNavigation} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar currentPage={currentPage} navigate={handleNavigation} />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
              {renderPage()}
            </main>
          </div>
        </div>
      );
    }

    export default App;