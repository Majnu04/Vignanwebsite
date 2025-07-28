import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

interface SidebarItem {
  title: string;
  href?: string;
  children?: SidebarItem[];
}

interface DepartmentLayoutProps {
  children: React.ReactNode;
  departmentName: string;
  heroImage: string;
  sidebarNavItems: SidebarItem[];
}

const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({
  children,
  departmentName,
  heroImage,
  sidebarNavItems,
}) => {
  const navigate = useNavigate();

  // Handle back button click
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Include the Header component */}
      <Header />

      {/* Hero Section with Department Title */}
      <div 
        className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})` }}
      >
        <button
          onClick={handleBackClick}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all"
          aria-label="Back to home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-lg">
          {departmentName}
        </h1>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24 bg-slate-800 rounded-2xl shadow-2xl shadow-black/40 p-5 border border-white/10">
              <h2 className="text-xl font-bold text-amber-300 mb-4">Navigation</h2>
              <nav>
                <ul className="space-y-4">
                  {sidebarNavItems.map((item) => (
                    <li key={item.title} className="text-slate-200">
                      {item.href ? (
                        <a href={item.href} className="block p-2 hover:bg-slate-700 rounded transition-colors">
                          {item.title}
                        </a>
                      ) : (
                        <div className="p-2 font-medium text-amber-200">{item.title}</div>
                      )}
                      {item.children && (
                        <ul className="ml-4 mt-2 space-y-2 border-l-2 border-slate-600 pl-4">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <a 
                                href={child.href} 
                                className="block p-1.5 text-slate-300 hover:text-amber-300 transition-colors text-sm"
                              >
                                {child.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DepartmentLayout;