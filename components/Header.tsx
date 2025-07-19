
import React, { useState, useEffect } from 'react';
import AnimatedLogo from './AnimatedLogo';

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { 
      name: "About Us", 
      submenu: ["Our Vision", "Leadership", "Campus Tour", "Rankings & Accreditations", "Infrastructure"] 
    },
    { 
      name: "Academics", 
      submenu: ["Schools & Departments", "Programs Offered", "Academic Calendar", "Faculty Directory", "Syllabus"] 
    },
    { 
      name: "Admissions", 
      submenu: ["Admission Process", "Eligibility Criteria", "Fee Structure", "Scholarships", "International Admissions"] 
    },
    { 
      name: "Research", 
      submenu: ["Research Centers", "Publications", "Patents", "Funded Projects", "Collaborations"] 
    },
    { 
      name: "Placements", 
      submenu: ["Placement Statistics", "Our Recruiters", "Success Stories", "Training Programs", "Industry Connect"] 
    },
    { 
      name: "Campus Life", 
      submenu: ["Student Clubs", "Events", "Sports", "Hostel", "Facilities"] 
    }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center group">
                <AnimatedLogo isScrolled={isScrolled} logoSize={isScrolled ? 96 : 128} />
            </a>
          </div>
          <nav className="hidden lg:flex lg:items-center lg:space-x-1">
            {navLinks.map((link, index) => (
              <div key={link.name} className="relative group">
                <button 
                  className={`flex items-center px-4 py-2 font-medium transition-all duration-300 rounded-md ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-blue-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                  onMouseEnter={() => setActiveSubmenu(index)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {/* Animated Hover Indicator */}
                  <span className={`absolute inset-0 rounded-md opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 ${
                    isScrolled 
                      ? 'bg-gray-100' 
                      : 'bg-white/10'
                  }`}></span>
                  
                  {/* Text and Icon Container */}
                  <span className="relative z-10 flex items-center space-x-1">
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                      {link.name}
                    </span>
                    
                    {/* Animated Dropdown Icon */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                
                {/* Enhanced Dropdown Menu with Animations */}
                <div className="absolute left-0 mt-1 w-64 origin-top-left transition-all duration-300 transform translate-y-2 opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible z-50">
                  <div className="py-3 px-2 bg-white rounded-xl shadow-xl border border-gray-100 backdrop-blur-sm">
                    {/* Triangle indicator */}
                    <div className="absolute top-0 left-6 w-3 h-3 bg-white transform rotate-45 -mt-1.5 border-t border-l border-gray-100"></div>
                    
                    <div className="relative z-10">
                      {link.submenu.map((subItem, subIndex) => (
                        <a 
                          key={subItem} 
                          href="#" 
                          className="block px-4 py-2.5 my-0.5 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md hover:text-blue-700 transition-all duration-200 transform hover:translate-x-1"
                          style={{
                            transitionDelay: `${subIndex * 50}ms`,
                            animation: "fadeInUp 0.3s ease-out both",
                            animationDelay: `${subIndex * 50}ms`
                          }}
                        >
                          {/* Icon based on submenu item */}
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 flex items-center justify-center text-blue-500">
                              {subIndex % 5 === 0 && <span className="text-xs">📝</span>}
                              {subIndex % 5 === 1 && <span className="text-xs">🎓</span>}
                              {subIndex % 5 === 2 && <span className="text-xs">📚</span>}
                              {subIndex % 5 === 3 && <span className="text-xs">🔍</span>}
                              {subIndex % 5 === 4 && <span className="text-xs">📊</span>}
                            </span>
                            <span>{subItem}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
          
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Button with Animation */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className={`p-2 rounded-full transition-all duration-300 group ${
                isScrolled 
                  ? 'text-gray-500 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Enhanced Apply Now Button */}
            <a 
              href="#" 
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-400/50 hover:translate-y-[-2px] active:translate-y-[1px]"
            >
              {/* Animated shine effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></span>
              
              <span className="relative flex items-center justify-center">
                Apply Now
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1.5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 focus:outline-none relative overflow-hidden p-1.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-red-50 text-red-500' : isScrolled ? 'hover:bg-blue-50' : 'hover:bg-white/10'}`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? 
                <CloseIcon className="w-6 h-6 transform animate-wiggle" /> : 
                <MenuIcon className="w-6 h-6 transform transition-transform hover:scale-110" />
              }
              <span className={`absolute inset-0 rounded-full ${isMenuOpen ? 'animate-pulse-light bg-red-100/50' : 'bg-transparent'}`}></span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop Search Popup */}
      <div 
        ref={searchRef}
        className={`fixed inset-0 w-full h-full flex items-start justify-center z-50 transition-all duration-300 ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
      >
        <div 
          className={`w-full max-w-3xl bg-white rounded-2xl shadow-2xl mt-20 transform transition-all duration-300 ${
            isSearchOpen ? 'translate-y-0' : '-translate-y-20'
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Search Vignan University</h3>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search for courses, programs, faculty..."
                className="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                autoFocus
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 absolute left-4 top-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSearchQuery('B.Tech Computer Science')}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >B.Tech Computer Science</button>
                <button 
                  onClick={() => setSearchQuery('Admissions 2023')}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >Admissions 2023</button>
                <button 
                  onClick={() => setSearchQuery('Campus Map')}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >Campus Map</button>
                <button 
                  onClick={() => setSearchQuery('Research')}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >Research</button>
                <button 
                  onClick={() => setSearchQuery('Scholarships')}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >Scholarships</button>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Quick Links</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a href="#" className="p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium">Academic Programs</h5>
                    <p className="text-sm text-gray-500">Explore our range of courses</p>
                  </div>
                </a>
                <a href="#" className="p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium">Campus Life</h5>
                    <p className="text-sm text-gray-500">Experience student life</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out origin-top overflow-auto max-h-[80vh] ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-4">
          {/* Enhanced Search Bar for Mobile */}
          <div className="mb-4 pt-3">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search courses, faculty, events..."
                className="w-full px-4 py-3 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 shadow-sm bg-gray-50/50"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 absolute left-3 top-3 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              {/* Quick search buttons */}
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300">Admissions</button>
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300">Programs</button>
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300">Campus</button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Items */}
          <div className="space-y-1">
            {navLinks.map((navItem, index) => (
              <div key={navItem.name} className="border-b border-gray-100 last:border-0 py-2">
                <button
                  onClick={() => setActiveSubmenu(activeSubmenu === index ? null : index)}
                  className={`flex justify-between items-center w-full px-4 py-3 text-left text-base font-medium rounded-lg transition-all duration-300 ${
                    activeSubmenu === index 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    {/* Menu item icon based on index */}
                    <span className="w-8 h-8 flex items-center justify-center rounded-full mr-3 transition-all duration-300 bg-opacity-20" style={{
                      backgroundColor: activeSubmenu === index 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'rgba(229, 231, 235, 0.5)'
                    }}>
                      {index === 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )}
                      {index === 4 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      )}
                      {index === 5 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                    </span>
                    {navItem.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform duration-300 ${activeSubmenu === index ? 'rotate-180 text-blue-600' : 'rotate-0 text-gray-400'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`mt-1 pl-4 space-y-1 overflow-hidden transition-all duration-300 ${
                    activeSubmenu === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {navItem.submenu.map((subItem, subIndex) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 transform hover:translate-x-1 ml-6 border-l-2 border-gray-100 hover:border-blue-500"
                      style={{ animationDelay: `${subIndex * 50}ms` }}
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <a
              href="#"
              className="relative w-full text-center block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-blue-400/50 transform hover:translate-y-[-1px] active:translate-y-[1px] overflow-hidden"
            >
              {/* Animated shine effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></span>
              
              <span className="relative flex items-center justify-center">
                Apply Now
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1.5 animate-pulse" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;