// src/components/NewsAndEvents.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { AnimatedElement } from './AnimatedElement';

// --- DATA ---
const eventsData = [
  { type: 'Workshop', title: 'AI in Wireless Tech', date: 'August 15, 2025', description: 'A hands-on workshop exploring the integration of AI and machine learning in next-generation wireless communication systems.', image: '/images/SLIDE_0.jpg' },
  { type: 'Bootcamp', title: 'Full Stack Development', date: 'September 01, 2025', description: 'An intensive two-week bootcamp covering the entire MERN stack, from backend APIs with Node.js to frontend development with React.', image: '/images/SLIDE_A copy.jpg' },
  { type: 'Summit', title: 'National Entrepreneurship', date: 'September 20, 2025', description: 'Join industry leaders, venture capitalists, and student innovators for a two-day summit on building the businesses of tomorrow.', image: '/images/SLIDE_B.jpg' },
  { type: 'Conference', title: 'Cyber Security Conclave', date: 'October 10, 2025', description: 'Explore the latest trends in cybersecurity, ethical hacking, and digital forensics with leading experts from around the globe.', image: '/images/SLIDE_C[1].jpg' },
];

// --- Helper Function for Date Formatting ---
const formatDateForTimeline = (dateStr: string): [string, string] => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  const line1 = new Intl.DateTimeFormat('en-US', options).format(date) + ',';
  const line2 = date.getFullYear().toString();
  return [line1, line2];
};

// --- MAIN COMPONENT ---
const NewsAndEvents: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const timelineControls = useAnimation();
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobileView(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
  }, [activeIndex]);

  useEffect(() => {
    if (isMobileView || !constraintsRef.current || !draggableRef.current) return;

    const container = constraintsRef.current;
    const draggable = draggableRef.current;
    const activeItem = draggable.children[activeIndex] as HTMLElement;

    if (!activeItem) return;

    const containerWidth = container.offsetWidth;
    const activeItemWidth = activeItem.offsetWidth;
    const activeItemOffsetLeft = activeItem.offsetLeft;

    const newX = (containerWidth / 2) - activeItemOffsetLeft - (activeItemWidth / 2);
    
    timelineControls.start({
      x: newX,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    });

  }, [activeIndex, isMobileView, timelineControls]);


  const handleNext = () => setActiveIndex((prev) => (prev + 1) % eventsData.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length);

  return (
    <section className={`relative w-full flex flex-col justify-center items-center overflow-hidden
      ${isMobileView ? 'py-4' : 'py-6 sm:py-8'}
      bg-white`}>

      <div className="text-center mb-6 sm:mb-8 md:mb-12 px-4">
        <AnimatedElement animation="slide-down" className="block">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>
            News & Upcoming Events
          </h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-in" delay={200} className="block">
          <p className="mt-2 sm:mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Stay connected with the vibrant pulse of our campus.
          </p>
        </AnimatedElement>
        <AnimatedElement animation="slide-up" delay={400} className="block">
          <div className="mx-auto mt-4 w-24 h-1 rounded-full bg-slate-300"></div>
        </AnimatedElement>
      </div>

      {isMobileView ? (
        // --- MOBILE VIEW ---
        <div className="relative w-full flex-1 flex flex-col items-center justify-center p-4">
          <div className="absolute top-2 left-4 right-4 z-20 flex gap-1">
            {eventsData.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-gray-200/70 rounded-full overflow-hidden">
                <AnimatePresence>
                  {index === activeIndex && (
                    <motion.div className="h-full bg-blue-600" initial={{ width: '0%' }} animate={{ width: '100%' }} exit={{ width: '100%' }} transition={{ duration: 5 }} />
                  )}
                </AnimatePresence>
                {index < activeIndex && <div className="h-full bg-blue-600"></div>}
              </div>
            ))}
          </div>
          <AnimatePresence initial={false}>
            <motion.div key={activeIndex} className="absolute w-[90%] h-[80%] bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-800 overflow-hidden ring-4 ring-black/10" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}>
              <div className="relative h-full flex flex-col p-6 sm:p-8 text-white">
                <span className="px-3 py-1 bg-white text-slate-900 text-xs sm:text-sm font-semibold rounded-full self-start mb-4 border border-black/10 shadow-md">{eventsData[activeIndex].type}</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{fontFamily: 'Georgia, serif'}}>{eventsData[activeIndex].title}</h3>
                <p className="text-sm text-slate-300 mt-1 font-semibold">{eventsData[activeIndex].date}</p>
                <p className="mt-4 text-slate-300 text-sm">{eventsData[activeIndex].description}</p>
                <button className="mt-auto px-5 py-2.5 bg-white text-slate-900 text-sm font-bold rounded-lg self-start hover:bg-slate-200 transition-colors duration-300 shadow-lg border border-black/10">Register Now</button>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-0 top-0 h-full w-1/2 cursor-pointer" onClick={handlePrev}></div>
          <div className="absolute right-0 top-0 h-full w-1/2 cursor-pointer" onClick={handleNext}></div>
        </div>
      ) : (
        // --- DESKTOP VIEW ---
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
                <motion.div key={event.title} className="absolute w-full h-full" animate={{ transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`, zIndex, opacity }} transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
                  <div className={`relative w-full h-full rounded-2xl shadow-xl border flex flex-col items-start justify-center p-8 md:p-12 transition-all duration-500 ${activeIndex === index ? 'bg-slate-900 border-slate-800 text-white ring-4 ring-blue-500/30' : 'bg-white border-gray-200 text-black opacity-80 hover:scale-102 hover:shadow-2xl'}`}>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full self-start mb-4 border shadow-sm ${activeIndex === index ? 'bg-white text-slate-900 border-white/20' : 'bg-slate-900 text-white border-slate-900'}`}>{event.type}</span>
                    <h3 className="text-3xl md:text-4xl font-bold" style={{fontFamily: 'Georgia, serif'}}>{event.title}</h3>
                    <p className={`text-base mt-1 font-semibold ${activeIndex === index ? 'text-slate-300' : 'text-gray-500'}`}>{event.date}</p>
                    <p className={`mt-4 max-w-md ${activeIndex === index ? 'text-slate-300' : 'text-gray-700'}`}>{event.description}</p>
                    <button className={`mt-6 px-6 py-3 font-bold rounded-lg self-start transition-colors duration-300 shadow-lg border ${activeIndex === index ? 'bg-white text-slate-900 hover:bg-slate-200 border-white/20' : 'bg-slate-900 text-white hover:bg-slate-700 border-slate-900'}`}>Register Now</button>
                    {activeIndex === index && <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-blue-700 to-slate-900 opacity-50 rounded-b-2xl"></div>}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div ref={constraintsRef} className="relative w-full max-w-4xl h-28 mt-12 bg-slate-100 rounded-lg shadow-inner border border-black/5 overflow-hidden flex items-center">
            <motion.div ref={draggableRef} className="flex items-start gap-4 px-4" animate={timelineControls} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.1}>
              {eventsData.map((event, index) => {
                const [line1, line2] = formatDateForTimeline(event.date);
                return (
                  <div key={index} onClick={() => setActiveIndex(index)} className="flex flex-col items-center flex-shrink-0 w-36 py-2 group cursor-pointer">
                    <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 ${activeIndex === index ? 'bg-blue-600 border-blue-600 scale-150 shadow-lg' : 'bg-gray-300 border-gray-400 group-hover:bg-blue-500/70 group-hover:border-blue-500/70'}`}></div>
                    <div className={`mt-3 text-sm text-center transition-colors duration-300 leading-tight ${activeIndex === index ? 'font-bold text-slate-900' : 'font-medium text-gray-500 group-hover:text-slate-800'}`}>
                      <span>{line1}</span><br/>
                      <span>{line2}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
};

export default NewsAndEvents;