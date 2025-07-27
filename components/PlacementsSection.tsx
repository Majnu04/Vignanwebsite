// src/components/PlacementsSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';

// --- DATA ---
const highlights = [
  { student: 'Souradeep Dash', company: 'Microsoft', package: 'Summer Internship', image: '/images/placements/highlight-1.jpg', companyLogo: '/images/logos/microsoft.svg' },
  { student: 'Ankit Sharma', company: 'LinkedIn', package: '42 LPA', image: '/images/placements/highlight-2.jpg', companyLogo: '/images/logos/linkedin.svg' },
  { student: 'K. Rishitha', company: 'ServiceNow', package: '42.93 LPA', image: '/images/placements/highlight-3.jpg', companyLogo: '/images/logos/servicenow.svg' },
  { student: 'B. Karunakar', company: 'Amazon', package: '26 LPA', image: '/images/placements/highlight-4.jpg', companyLogo: '/images/logos/amazon.svg' },
  { student: 'Alla Pooja', company: 'SAP Labs', package: '18 LPA', image: '/images/placements/highlight-5.jpg', companyLogo: '/images/logos/sap-labs.svg' },
];

const recruiters = [
  { name: 'Microsoft', logo: '/images/logos/microsoft.svg' },
  { name: 'Amazon', logo: '/images/logos/amazon.svg' },
  // ... rest of your recruiters
];

// --- SUB-COMPONENTS (No changes needed here) ---

const AnimatedStat: React.FC<{ value: number; decimals?: number; suffix: string; label: string }> = ({ value, decimals = 0, suffix, label }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const count = useCounter(value, 2000, inView, decimals);
  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
        {count}<span className="text-cyan-400">{suffix}</span>
      </p>
      <p className="text-base text-gray-300 mt-2">{label}</p>
    </div>
  );
};

// --- MAIN COMPONENT ---

const PlacementsSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalHighlights = highlights.length;

  // Autoplay logic
  useEffect(() => {
    const resetTimeout = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1)), // Just increment
      4000
    );
    return () => resetTimeout();
  }, [currentIndex]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <section ref={ref} className="relative text-white py-20 sm:py-28 overflow-hidden" style={{ backgroundColor: '#1a2b4f' }}>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Stats Dashboard */}
        <div className={`text-center mb-16 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
            A Legacy of Placement Excellence
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Our graduates are catalysts for change, leading innovation at the world's most respected companies.
          </p>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 transition-opacity duration-1000 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <AnimatedStat value={45} suffix=" LPA" label="Highest Package" />
          <AnimatedStat value={8.5} decimals={1} suffix=" LPA" label="Average Package" />
          <AnimatedStat value={1250} suffix="+" label="Total Offers (2024)" />
          <AnimatedStat value={350} suffix="+" label="Companies Visited" />
        </div>

        {/* 3D Interactive CIRCULAR Carousel */}
        <div className="relative h-[450px] w-full flex items-center justify-center [perspective:1000px]">
          <div className="relative w-72 h-96 [transform-style:preserve-3d]">
            {highlights.map((highlight, index) => {
              // --- CORE LOGIC FOR CIRCULAR CAROUSEL ---
              const modIndex = (currentIndex % totalHighlights + totalHighlights) % totalHighlights;
              let offset = index - modIndex;
              
              // Handle wrapping for seamless loop
              if (offset > totalHighlights / 2) {
                offset -= totalHighlights;
              }
              if (offset < -totalHighlights / 2) {
                offset += totalHighlights;
              }

              const rotateY = offset * 25;
              const translateX = offset * 120;
              const zIndex = totalHighlights - Math.abs(offset);
              const opacity = Math.abs(offset) > 1 ? 0 : 1; // Show 3 cards: center, left, right

              return (
                <div
                  key={index}
                  className="absolute w-full h-full transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(${translateX}%) rotateY(${rotateY}deg)`, zIndex, opacity }}
                >
                  <Tilt
                    className="w-full h-full rounded-2xl overflow-hidden"
                    perspective={1000} glareEnable={true} glareMaxOpacity={0.2} glareColor="#ffffff" glarePosition="all"
                    tiltMaxAngleX={8} tiltMaxAngleY={8} transitionSpeed={1000}
                  >
                    <div className="relative w-full h-full bg-slate-800 border border-blue-400/40 shadow-2xl">
                      <img src={highlight.image} alt={highlight.student} className="w-full h-full object-cover opacity-30" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <img src={highlight.companyLogo} alt={`${highlight.company} logo`} className="w-24 h-auto mb-4" />
                        <p className="text-xl font-bold">{highlight.student}</p>
                        <p className="text-2xl font-extrabold text-cyan-300">{highlight.package}</p>
                      </div>
                    </div>
                  </Tilt>
                </div>
              );
            })}
          </div>
          {/* Carousel Controls */}
          <button onClick={goToPrev} className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goToNext} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Recruiter Section remains the same */}
        <div className="mt-28 text-center">
          {/* ... recruiter grid code ... */}
        </div>

      </div>
    </section>
  );
};

export default PlacementsSection;