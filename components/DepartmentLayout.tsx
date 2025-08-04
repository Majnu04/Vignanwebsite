// // src/components/DepartmentLayout.tsx

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// // --- Reusable Sidebar Component (with smooth scrolling) ---
// const SidebarNav: React.FC<{ items: any[]; onBack: () => void; }> = ({ items, onBack }) => {
//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

//   const toggleSubmenu = (title: string) => {
//     setOpenSubmenu(openSubmenu === title ? null : title);
//   };

//   const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault();
//     const targetId = href.substring(1);
//     const targetElement = document.getElementById(targetId);
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   return (
//     <nav className="space-y-2">
//       <button 
//         onClick={onBack}
//         className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-md transition-colors mb-4 font-semibold"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//         Back to Home
//       </button>

//       {items.map((item) => (
//         <div key={item.title}>
//           {item.children ? (
//             <>
//               <button onClick={() => toggleSubmenu(item.title)} className="w-full flex justify-between items-center text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium">
//                 <span>{item.title}</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === item.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//               </button>
//               <div className={`pl-4 overflow-hidden transition-all duration-300 ${openSubmenu === item.title ? 'max-h-96' : 'max-h-0'}`}>
//                 <div className="py-2 space-y-1 border-l border-blue-200">
//                   {item.children.map((child: any) => (
//                     <a key={child.title} href={child.href} onClick={(e) => handleSmoothScroll(e, child.href)} className="block pl-4 py-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50">{child.title}</a>
//                   ))}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium">{item.title}</a>
//           )}
//         </div>
//       ))}
//     </nav>
//   );
// };

// // --- Main Layout Component ---
// interface DepartmentLayoutProps {
//   departmentName: string;
//   heroImage: string;
//   sidebarNavItems: any[];
//   children: React.ReactNode;
//   onBack: () => void;
// }

// const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({ departmentName, heroImage, sidebarNavItems, children, onBack }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       transition={{ duration: 0.3 }}
//       className="fixed inset-0 z-50 overflow-y-auto bg-white"
//       style={{ height: '100vh' }}
//     >
//       {/* --- RESPONSIVE HERO --- */}
//       <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center justify-center text-center px-4">
//         <div className="absolute inset-0 z-0">
//           <img 
//             src={heroImage} 
//             alt={`${departmentName} department`} 
//             className="w-full h-full object-cover" 
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
//         </div>
//         <div className="relative z-10">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
//             {departmentName}
//           </h1>
//         </div>
//       </div>
//       {/* --- END RESPONSIVE HERO --- */}

//       {/* Main Content Area */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Sidebar */}
//           <aside className="lg:w-1/4">
//             <div className="sticky top-24 p-4 bg-gray-50 rounded-xl border border-gray-200">
//               <SidebarNav items={sidebarNavItems} onBack={onBack} />
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="lg:w-3/4">
//             {children}
//           </main>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DepartmentLayout;














// ***********************************


// src/components/DepartmentLayout.tsx

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- SidebarNav Component with Back Button ---
// const SidebarNav: React.FC<{ items: any[]; onBack: () => void; closeSidebar?: () => void; }> = ({ items, onBack, closeSidebar }) => {
//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

//   const toggleSubmenu = (title: string) => { setOpenSubmenu(openSubmenu === title ? null : title); };

//   const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault();
//     if (closeSidebar) closeSidebar();
//     const targetElement = document.getElementById(href.substring(1));
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   return (
//     <nav className="space-y-2 p-4">
//       {/* Back button is here, inside the sidebar */}
//       <button 
//         onClick={onBack}
//         className="flex items-center bg-red-500 gap-2 w-full text-left text-white-900 px-4 py-2.5 hover:bg-white/90 hover:text-red-500 rounded-md transition-colors mb-4 font-semibold"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//         Back to Home
//       </button>

//       {items.map((item) => (
//         <div className="text-white-900 hover:bg-white/90 hover:text-blue-900" key={item.title}>
//           {item.children ? (
//             <>
//               <button onClick={() => toggleSubmenu(item.title)} className="w-full flex justify-between items-center text-left px-4 py-2.5 hover:bg-white/90 hover:text-blue-900 rounded-md transition-colors font-medium">
//                 <span>{item.title}</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${openSubmenu === item.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//               </button>
//               <AnimatePresence>
//                 {openSubmenu === item.title && (
//                   <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="pl-4 overflow-hidden">
//                     <div className="py-2 space-y-1 border-l border-white/20">
//                       {item.children.map((child: any) => (
//                         <a key={child.title} href={child.href} onClick={(e) => handleSmoothScroll(e, child.href)} className="block pl-4 py-1.5 bg-white/90 text-blue-900 opacity-80 hover:opacity-90 hover:bg-blue/90 hover:text-white-900 rounded-r-md">
//                           {child.title}
//                         </a>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           ) : (
//             <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block px-4 py-2.5 hover:bg-white/10 rounded-md transition-colors font-medium">{item.title}</a>
//           )}
//         </div>
//       ))}
//     </nav>
//   );
// };

// // --- Main Layout Component ---
// interface DepartmentLayoutProps {
//   departmentName: string;
//   heroImage: string;
//   sidebarNavItems: any[];
//   children: React.ReactNode;
//   onBack: () => void;
//   sidebarClassName?: string;
// }

// const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({ departmentName, heroImage, sidebarNavItems, children, onBack, sidebarClassName }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-white overflow-y-auto">
//       <AnimatePresence>
//         {isSidebarOpen && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
//             <motion.aside
//               initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               className={`fixed top-0 left-0 h-full w-72 z-50 overflow-y-auto shadow-xl ${sidebarClassName || 'bg-gray-50'}`}
//             >
//               <SidebarNav items={sidebarNavItems} onBack={onBack} closeSidebar={() => setSidebarOpen(false)} />
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
      
//       <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-30 lg:hidden bg-white/50 p-2 rounded-full backdrop-blur-sm shadow" aria-label="Open menu">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
//       </button>

//       {/* Hero Banner and Department Name */}
//       <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center justify-center text-center px-4">
//         <div className="absolute inset-0 z-0">
//           <img src={heroImage} alt={`${departmentName} department`} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
//         </div>
//         <div className="relative z-10">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
//             {departmentName}
//           </h1>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block lg:w-1/4">
//             <div className={`sticky top-10 rounded-xl border ${sidebarClassName || 'bg-gray-50 border-gray-200'}`}>
//               <SidebarNav items={sidebarNavItems} onBack={onBack} />
//             </div>
//           </aside>
//           {/* Main Content Area (where CsePage's <article> renders) */}
//           <main className="lg:w-3/4">
//             {children}
//           </main>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DepartmentLayout;














// src/components/DepartmentLayout.tsx

// src/components/DepartmentLayout.tsx

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// // --- Reusable Sidebar Component (with smooth scrolling) ---
// const SidebarNav: React.FC<{ items: any[]; onBack: () => void; }> = ({ items, onBack }) => {
//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

//   const toggleSubmenu = (title: string) => {
//     setOpenSubmenu(openSubmenu === title ? null : title);
//   };

//   const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault();
//     const targetId = href.substring(1);
//     const targetElement = document.getElementById(targetId);
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   return (
//     <nav className="space-y-2">
//       <button 
//         onClick={onBack}
//         className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-md transition-colors mb-4 font-semibold"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//         Back to Home
//       </button>

//       {items.map((item) => (
//         <div key={item.title}>
//           {item.children ? (
//             <>
//               <button onClick={() => toggleSubmenu(item.title)} className="w-full flex justify-between items-center text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium">
//                 <span>{item.title}</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === item.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//               </button>
//               <div className={`pl-4 overflow-hidden transition-all duration-300 ${openSubmenu === item.title ? 'max-h-96' : 'max-h-0'}`}>
//                 <div className="py-2 space-y-1 border-l border-blue-200">
//                   {item.children.map((child: any) => (
//                     <a key={child.title} href={child.href} onClick={(e) => handleSmoothScroll(e, child.href)} className="block pl-4 py-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50">{child.title}</a>
//                   ))}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium">{item.title}</a>
//           )}
//         </div>
//       ))}
//     </nav>
//   );
// };

// // --- Main Layout Component ---
// interface DepartmentLayoutProps {
//   departmentName: string;
//   heroImage: string;
//   sidebarNavItems: any[];
//   children: React.ReactNode;
//   onBack: () => void;
// }

// const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({ departmentName, heroImage, sidebarNavItems, children, onBack }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       transition={{ duration: 0.3 }}
//       className="fixed inset-0 z-50 overflow-y-auto bg-white"
//       style={{ height: '100vh' }}
//     >
//       {/* --- RESPONSIVE HERO --- */}
//       <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center justify-center text-center px-4">
//         <div className="absolute inset-0 z-0">
//           <img 
//             src={heroImage} 
//             alt={`${departmentName} department`} 
//             className="w-full h-full object-cover" 
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
//         </div>
//         <div className="relative z-10">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
//             {departmentName}
//           </h1>
//         </div>
//       </div>
//       {/* --- END RESPONSIVE HERO --- */}

//       {/* Main Content Area */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Sidebar */}
//           <aside className="lg:w-1/4">
//             <div className="sticky top-24 p-4 bg-gray-50 rounded-xl border border-gray-200">
//               <SidebarNav items={sidebarNavItems} onBack={onBack} />
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="lg:w-3/4">
//             {children}
//           </main>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DepartmentLayout;

// src/components/DepartmentLayout.tsx

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- SidebarNav Component with Back Button & Theming ---
// const SidebarNav: React.FC<{ items: any[]; onBack: () => void; closeSidebar?: () => void; }> = ({ items, onBack, closeSidebar }) => {
//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

//   const toggleSubmenu = (title: string) => { setOpenSubmenu(openSubmenu === title ? null : title); };

//   // This function ensures the mobile sidebar closes after a navigation click
//   const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault();
//     if (closeSidebar) closeSidebar();
//     const targetElement = document.getElementById(href.substring(1));
//     if (targetElement) {
//       // The timeout allows the sidebar to close before scrolling starts, preventing visual glitches
//       setTimeout(() => {
//         targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 300);
//     }
//   };

//   return (
//     <nav className="space-y-2 p-4">
//       {/* Back button is here, styled to match the theme */}
//       <button 
//         onClick={onBack}
//         className="flex items-center gap-2 w-full text-left px-4 py-2.5 hover:bg-white/10 rounded-md transition-colors mb-4 font-semibold"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//         Back to Home
//       </button>

//       {items.map((item) => (
//         <div key={item.title}>
//           {item.children ? (
//             <>
//               <button onClick={() => toggleSubmenu(item.title)} className="w-full flex justify-between items-center text-left px-4 py-2.5 hover:bg-white/10 rounded-md transition-colors font-medium">
//                 <span>{item.title}</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${openSubmenu === item.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//               </button>
//               <AnimatePresence>
//                 {openSubmenu === item.title && (
//                   <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="pl-4 overflow-hidden">
//                     <div className="py-2 space-y-1 border-l border-white/20">
//                       {item.children.map((child: any) => (
//                         <a key={child.title} href={child.href} onClick={(e) => handleSmoothScroll(e, child.href)} className="block pl-4 py-1.5 opacity-80 hover:opacity-100 hover:bg-white/10 rounded-r-md">
//                           {child.title}
//                         </a>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           ) : (
//             <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block px-4 py-2.5 hover:bg-white/10 rounded-md transition-colors font-medium">{item.title}</a>
//           )}
//         </div>
//       ))}
//     </nav>
//   );
// };

// // --- Main Layout Component (Corrected for proper scrolling) ---
// interface DepartmentLayoutProps {
//   departmentName: string;
//   heroImage: string;
//   sidebarNavItems: any[];
//   children: React.ReactNode;
//   onBack: () => void;
//   sidebarClassName?: string;
// }

// const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({ departmentName, heroImage, sidebarNavItems, children, onBack, sidebarClassName }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }} 
//       animate={{ opacity: 1 }} 
//       exit={{ opacity: 0 }} 
//       className="bg-white" // Removed fixed positioning to allow natural page scroll
//     >
//       {/* --- Mobile Sidebar (Restored) --- */}
//       <AnimatePresence>
//         {isSidebarOpen && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
//             <motion.aside
//               initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               className={`fixed top-0 left-0 h-full w-72 z-50 overflow-y-auto shadow-xl ${sidebarClassName || 'bg-gray-800 text-white'}`}
//             >
//               <SidebarNav items={sidebarNavItems} onBack={onBack} closeSidebar={() => setSidebarOpen(false)} />
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
      
//       {/* --- Mobile Menu Button --- */}
//       <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-30 lg:hidden bg-white/50 p-2 rounded-full backdrop-blur-sm shadow" aria-label="Open menu">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
//       </button>

//       {/* --- Hero Banner --- */}
//       <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center justify-center text-center px-4">
//         <div className="absolute inset-0 z-0">
//           <img src={heroImage} alt={`${departmentName} department`} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
//         </div>
//         <div className="relative z-10">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
//             {departmentName}
//           </h1>
//         </div>
//       </div>

//       {/* --- Main Content Area --- */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Desktop Sidebar (Now truly sticky) */}
//           <aside className="hidden lg:block lg:w-1/4">
//             <div className={`sticky top-24 rounded-xl border shadow-sm ${sidebarClassName || 'bg-gray-800 text-white border-gray-700'}`}>
//               <SidebarNav items={sidebarNavItems} onBack={onBack} />
//             </div>
//           </aside>
//           {/* Main Content Area */}
//           <main className="lg:w-3/4">
//             {children}
//           </main>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DepartmentLayout;









// src/components/DepartmentLayout.tsx

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// // --- Reusable Sidebar Component (with smooth scrolling) ---
// const SidebarNav: React.FC<{ items: any[]; onBack: () => void; }> = ({ items, onBack }) => {
//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

//   const toggleSubmenu = (title: string) => {
//     setOpenSubmenu(openSubmenu === title ? null : title);
//   };

//   const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault();
//     const targetId = href.substring(1);
//     const targetElement = document.getElementById(targetId);
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   return (
//     <nav className="space-y-2">
//       {/* --- HIGHLIGHTED BUTTON --- */}
//       <button 
//         onClick={onBack}
//         // CORRECTED: Styling updated for better visibility and a "highlighted" look.
//         className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//         Back to Home
//       </button>

//       {items.map((item) => (
//         <div key={item.title}>
//           {item.children ? (
//             <>
//               <button onClick={() => toggleSubmenu(item.title)} className="w-full flex justify-between items-center text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium">
//                 <span>{item.title}</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === item.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//               </button>
//               <div className={`pl-4 overflow-hidden transition-all duration-300 ${openSubmenu === item.title ? 'max-h-96' : 'max-h-0'}`}>
//                 <div className="py-2 space-y-1 border-l border-blue-200">
//                   {item.children.map((child: any) => (
//                     <a key={child.title} href={child.href} onClick={(e) => handleSmoothScroll(e, child.href)} className="block pl-4 py-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50">{child.title}</a>
//                   ))}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium">{item.title}</a>
//           )}
//         </div>
//       ))}
//     </nav>
//   );
// };

// // --- Main Layout Component ---
// interface DepartmentLayoutProps {
//   departmentName: string;
//   heroImage: string;
//   sidebarNavItems: any[];
//   children: React.ReactNode;
//   onBack: () => void;
// }

// const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({ departmentName, heroImage, sidebarNavItems, children, onBack }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       transition={{ duration: 0.3 }}
//       className="fixed inset-0 z-50 overflow-y-auto bg-white"
//       style={{ height: '100vh' }}
//     >
//       {/* --- RESPONSIVE HERO --- */}
//       <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center justify-center text-center px-4">
//         <div className="absolute inset-0 z-0">
//           <img 
//             src={heroImage} 
//             alt={`${departmentName} department`} 
//             className="w-full h-full object-cover" 
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
//         </div>
//         <div className="relative z-10">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
//             {departmentName}
//           </h1>
//         </div>
//       </div>
//       {/* --- END RESPONSIVE HERO --- */}

//       {/* Main Content Area */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Sidebar */}
//           <aside className="lg:w-1/4">
//             <div className="sticky top-24 p-4 bg-gray-50 rounded-xl border border-gray-200">
//               <SidebarNav items={sidebarNavItems} onBack={onBack} />
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="lg:w-3/4">
//             {children}
//           </main>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DepartmentLayout;




// src/components/DepartmentLayout.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Reusable Sidebar Component ---
// CORRECTED: Text and hover colors are now generic to support theming.
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
      {/* HIGHLIGHTED BUTTON: Styled to stand out on any background, especially the dark blue theme. */}
      <button 
        onClick={onBack}
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-red-600 text-white font-semibold rounded-md transition-all duration-300 hover:bg-white/90 hover:text-yellow-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Home
      </button>

      {items.map((item) => (
        <div className="hover:bg-white/90 hover:text-blue-900" key={item.title}>
          {item.children ? (
            <>
              <button onClick={() => toggleSubmenu(item.title)} className="w-full flex justify-between items-center text-left px-4 py-2.5 rounded-md transition-colors font-medium text-white-900 hover:bg-white/90 hover:text-blue-900">
                <span>{item.title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${openSubmenu === item.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`pl-4 overflow-hidden transition-all duration-300 ${openSubmenu === item.title ? 'max-h-96' : 'max-h-0'}`}>
                {/* CORRECTED: Themed for dark background */}
                <div className="py-2 space-y-1 border-l border-white/20">
                  {item.children.map((child: any) => (
                    <a key={child.title} href={child.href} onClick={(e) => handleSmoothScroll(e, child.href)} className="block pl-4 py-1.5 opacity-80 hover:opacity-100 hover:bg-white/90 text-blue-900 rounded-r-md">{child.title}</a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block px-4 py-2.5 rounded-md transition-colors font-medium hover:bg-white/10">{item.title}</a>
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
  sidebarClassName?: string; // Prop to accept custom sidebar classes
}

const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({ departmentName, heroImage, sidebarNavItems, children, onBack, sidebarClassName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-white"
      style={{ height: '100vh' }}
    >
      {/* Hero Section */}
      <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt={`${departmentName} department`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
            {departmentName}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            {/* CORRECTED: Applies the passed sidebarClassName or falls back to a default. */}
            <div className={`sticky top-10 p-4 rounded-xl border ${sidebarClassName || 'bg-gray-50 border-gray-200'}`}>
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