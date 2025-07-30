// src/components/DepartmentLayout.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Reusable Sidebar Component (with smooth scrolling) ---
const SidebarNav: React.FC<{ items: any[]; onBack: () => void; }> = ({ items, onBack }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="space-y-2">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-md transition-colors mb-4 font-semibold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Home
      </button>

      {items.map((item) => (
        <div key={item.title}>
          {item.children ? (
            <>
              <button onClick={() => toggleSubmenu(item.title)} className="w-full flex justify-between items-center text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium">
                <span>{item.title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === item.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`pl-4 overflow-hidden transition-all duration-300 ${openSubmenu === item.title ? 'max-h-96' : 'max-h-0'}`}>
                <div className="py-2 space-y-1 border-l border-blue-200">
                  {item.children.map((child: any) => (
                    <a key={child.title} href={child.href} onClick={(e) => handleSmoothScroll(e, child.href)} className="block pl-4 py-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50">{child.title}</a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium">{item.title}</a>
          )}
        </div>
      ))}
    </nav>
  );
};

// --- Main Layout Component ---
interface DepartmentLayoutProps {
  departmentName: string;
  heroImage: string;
  sidebarNavItems: any[];
  children: React.ReactNode;
  onBack: () => void;
}

const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({ departmentName, heroImage, sidebarNavItems, children, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-white"
      style={{ height: '100vh' }}
    >
      {/* --- RESPONSIVE HERO --- */}
      <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={`${departmentName} department`} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
            {departmentName}
          </h1>
        </div>
      </div>
      {/* --- END RESPONSIVE HERO --- */}

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <SidebarNav items={sidebarNavItems} onBack={onBack} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {children}
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default DepartmentLayout;