// src/components/NewsAndEvents.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA ---
const eventsData = [
  { type: 'Workshop', title: 'AI in Wireless Tech', date: 'August 15, 2025', description: 'A hands-on workshop exploring the integration of AI and machine learning in next-generation wireless communication systems.', image: '/images/SLIDE_0.jpg', bgColor: 'from-blue-900 to-slate-900' },
  { type: 'Bootcamp', title: 'Full Stack Development', date: 'September 01, 2025', description: 'An intensive two-week bootcamp covering the entire MERN stack, from backend APIs with Node.js to frontend development with React.', image: '/images/SLIDE_A copy.jpg', bgColor: 'from-purple-900 to-slate-900' },
  { type: 'Summit', title: 'National Entrepreneurship', date: 'September 20, 2025', description: 'Join industry leaders, venture capitalists, and student innovators for a two-day summit on building the businesses of tomorrow.', image: '/images/SLIDE_B.jpg', bgColor: 'from-red-900 to-slate-900' },
  { type: 'Conference', title: 'Cyber Security Conclave', date: 'October 10, 2025', description: 'Explore the latest trends in cybersecurity, ethical hacking, and digital forensics with leading experts from around the globe.', image: '/images/SLIDE_C[1].jpg', bgColor: 'from-green-900 to-slate-900' },
];

// --- MAIN COMPONENT ---

const NewsAndEvents: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768); // md breakpoint in Tailwind
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Autoplay and interaction logic
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % eventsData.length);
      }, 5000);
    };

    startAutoplay();

    return () => {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    };
  }, [activeIndex, isDragging]); // Restart timer when slide changes or dragging stops

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % eventsData.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length);

  const currentBg = eventsData[activeIndex].bgColor;

  return (
    <section className={`relative w-full flex flex-col justify-center items-center overflow-hidden transition-all duration-1000 ease-in-out
      ${isMobileView ? 'min-h-[90vh] py-10' : 'min-h-screen py-20 sm:py-28'}
      bg-gradient-to-br from-white via-slate-100 to-gray-200`}>

      <div className="text-center mb-6 sm:mb-8 md:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight drop-shadow-2xl bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>
          News & Upcoming Events
        </h2>
        <p className="mt-2 sm:mt-4 text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
          Stay connected with the vibrant pulse of our campus.
        </p>
        <div className="mx-auto mt-4 w-24 h-1 rounded-full bg-gradient-to-r from-black via-gray-700 to-black opacity-40"></div>
      </div>

      {/* Conditional Rendering: Desktop or Mobile View */}
      {isMobileView ? (
        // --- MOBILE VIEW: VERTICAL STORY SWIPER ---
        <div className="relative w-full flex-1 flex flex-col items-center justify-center p-4">
          {/* Progress Bars */}
          <div className="absolute top-2 left-4 right-4 z-20 flex gap-1">
            {eventsData.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <AnimatePresence>
                  {index === activeIndex && (
                    <motion.div
                      className="h-full bg-gradient-to-r from-black via-gray-800 to-black"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      exit={{ width: '100%' }}
                      transition={{ duration: 5 }}
                    />
                  )}
                </AnimatePresence>
                {index < activeIndex && <div className="h-full bg-black"></div>}
              </div>
            ))}
          </div>
          <AnimatePresence initial={false}>
            <motion.div
              key={activeIndex}
              className="absolute w-[90%] h-[80%] bg-white rounded-2xl shadow-2xl border-2 border-black overflow-hidden ring-4 ring-black/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 w-full h-40 sm:h-48">
                <img 
                  src={eventsData[activeIndex].image} 
                  alt={eventsData[activeIndex].title} 
                  className="w-full h-full object-cover object-center rounded-t-2xl border-b-2 border-black/20 shadow-lg"
                  onError={(e) => {
                    // Fallback to a solid color if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.style.backgroundColor = "#f1f5f9"; // Light blue fallback
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white/30 rounded-t-2xl"></div>
              </div>
              <div className="relative h-full pt-44 sm:pt-52 flex flex-col p-4 sm:p-6 text-black">
                <span className="px-2 sm:px-3 py-1 bg-black text-white text-xs sm:text-sm font-semibold rounded-full self-start mb-3 sm:mb-4 border border-black shadow-md">{eventsData[activeIndex].type}</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg" style={{fontFamily: 'Georgia, serif'}}>{eventsData[activeIndex].title}</h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-1 font-semibold">{eventsData[activeIndex].date}</p>
                <p className="mt-3 sm:mt-4 text-gray-700 text-xs sm:text-sm">{eventsData[activeIndex].description}</p>
                <button className="mt-5 sm:mt-6 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-black via-gray-900 to-black text-white text-xs sm:text-sm font-semibold rounded-lg self-start hover:bg-gray-900 transition-colors duration-300 shadow-lg border border-black">
                  Register Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Tap Navigation Zones */}
          <div className="absolute left-0 top-0 h-full w-1/2 cursor-pointer" onClick={handlePrev}></div>
          <div className="absolute right-0 top-0 h-full w-1/2 cursor-pointer" onClick={handleNext}></div>
        </div>
      ) : (
        // --- DESKTOP VIEW: CINEMATIC CARDS & TIMELINE ---
        <>
          <div className="relative w-full h-[55vh] max-w-4xl [perspective:1500px]">
            {eventsData.map((event, index) => {
              const offset = index - activeIndex;
              const rotateY = offset * -20;
              const translateX = offset * 105;
              const scale = 1 - Math.abs(offset) * 0.15;
              const zIndex = eventsData.length - Math.abs(offset);
              const opacity = Math.abs(offset) > 2 ? 0 : 1;
              return (
                <motion.div
                  key={event.title}
                  className="absolute w-full h-full"
                  animate={{ transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`, zIndex, opacity }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className={`relative w-full h-full rounded-2xl shadow-2xl border-2 flex flex-col items-start justify-center p-8 md:p-12 transition-all duration-500
                    ${activeIndex === index ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800 border-black text-white ring-4 ring-black/10 scale-105' : 'bg-white border-gray-200 text-black opacity-80 hover:scale-102 hover:shadow-2xl hover:ring-2 hover:ring-black/10'}`}
                  >
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full self-start mb-4 border shadow-md
                      ${activeIndex === index ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}>{event.type}</span>
                    <h3 className="text-3xl md:text-4xl font-bold drop-shadow-lg" style={{fontFamily: 'Georgia, serif'}}>{event.title}</h3>
                    <p className="text-sm mt-1 font-semibold">{event.date}</p>
                    <p className="mt-4 max-w-md">{event.description}</p>
                    <button className={`mt-6 px-6 py-3 font-bold rounded-lg self-start transition-colors duration-300 shadow-lg border
                      ${activeIndex === index ? 'bg-white text-black hover:bg-gray-200 border-white' : 'bg-black text-white hover:bg-gray-900 border-black'}`}>Register Now</button>
                    {/* Decorative gradient bar */}
                    {activeIndex === index && <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-white via-gray-400 to-black opacity-30 rounded-b-2xl"></div>}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div ref={constraintsRef} className="relative w-full max-w-4xl h-24 mt-12 cursor-grab active:cursor-grabbing bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg p-2 shadow-inner border border-black/10">
            <motion.div
              className="absolute top-1/2 left-0 flex items-center gap-8"
              drag="x"
              dragConstraints={constraintsRef}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              {eventsData.map((event, index) => (
                <div key={index} onClick={() => setActiveIndex(index)} className="flex flex-col items-center flex-shrink-0 w-24 text-center group cursor-pointer">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${activeIndex === index ? 'bg-black border-black scale-150 shadow-lg' : 'bg-gray-300 border-gray-400 group-hover:bg-black/60 group-hover:border-black/60'}`}></div>
                  <p className={`mt-3 text-xs font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-black' : 'text-gray-500 group-hover:text-black/60'}`}>{event.date}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
};

export default NewsAndEvents;