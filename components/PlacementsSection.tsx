// src/components/PlacementsSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';

// --- DATA ---
const highlights = [
  { 
    student: 'Vasu Surisetty', 
    company: 'Microsoft', 
    package: '37 LPA', 
    image: 'public/images/02 copy.png', 
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' 
  },
  { 
    student: 'Ankit Sharma', 
    company: 'LinkedIn', 
    package: '42 LPA', 
    image: 'public/images/07 copy.png',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg' 
  },
  { 
    student: 'K. Rishit', 
    company: 'ServiceNow', 
    package: '42.93 LPA', 
    image: 'public/images/04 copy.png', 
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg' 
  },
  { 
    student: 'Umakanth ', 
    company: 'Amazon', 
    package: '26 LPA', 
    image: 'public/images/03 copy.png', 
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' 
  },
  { 
    student: 'Koushik', 
    company: 'SAP Labs', 
    package: '18 LPA', 
    image: 'public/images/06 copy.png', 
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg' 
  },
];

// --- SUB-COMPONENTS (No changes needed here) ---

const AnimatedStat: React.FC<{ value: number; decimals?: number; suffix: string; label: string }> = ({ value, decimals = 0, suffix, label }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const count = useCounter(value, 2000, inView, decimals);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
        {count}<span className="text-blue-600">{suffix}</span>
      </p>
      <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-1 sm:mt-2">{label}</p>
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
    <section ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden bg-white">
      {/* Background blobs removed */}

      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header and Stats Dashboard */}
        <div className={`text-center mb-10 sm:mb-16 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800" style={{ fontFamily: 'Georgia, serif' }}>
            A Legacy of Placement Excellence
          </h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-4">
      
          </p>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20 md:mb-24 transition-opacity duration-1000 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <AnimatedStat value={45} suffix=" LPA" label="Highest Package" />
          <AnimatedStat value={8.5} decimals={1} suffix=" LPA" label="Average Package" />
          <AnimatedStat value={1250} suffix="+" label="Total Offers (2024)" />
          <AnimatedStat value={350} suffix="+" label="Companies Visited" />
        </div>

        {/* 3D Interactive CIRCULAR Carousel */}
        <div className="relative h-[350px] sm:h-[400px] md:h-[450px] w-full flex items-center justify-center [perspective:1000px]">
          <div className="relative w-64 sm:w-68 md:w-72 h-80 sm:h-88 md:h-96 [transform-style:preserve-3d]">
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
                    perspective={1000} glareEnable={true} glareMaxOpacity={0.2} glareColor="#4299e1" glarePosition="all"
                    tiltMaxAngleX={8} tiltMaxAngleY={8} transitionSpeed={1000}
                  >
                    <div className="relative w-full h-full bg-white border border-slate-200 shadow-xl">
                      <img src={highlight.image} alt={highlight.student} className="w-full h-full object-cover opacity-70" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-white/30"></div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-slate-800">
                        <img src={highlight.companyLogo} alt={`${highlight.company} logo`} className="w-24 h-auto mb-4" />
                        <p className="text-xl font-bold">{highlight.student}</p>
                        <p className="text-2xl font-extrabold text-blue-600">{highlight.package}</p>
                      </div>
                    </div>
                  </Tilt>
                </div>
              );
            })}
          </div>
          {/* Carousel Controls */}
          <button onClick={goToPrev} className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-blue-500 bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-blue-500 hover:bg-opacity-30 transition-colors shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goToNext} className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-blue-500 bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-blue-500 hover:bg-opacity-30 transition-colors shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Recruiter Section with scrolling logos */}
        <div className="mt-28 text-center">
          <h3 className="text-3xl font-bold mb-10 text-slate-800">Top Recruiters</h3>
          
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            .logos {
              overflow: hidden;
              padding: 20px 0;
              background: rgba(226, 232, 240, 0.4);
              white-space: nowrap;
              position: relative;
              border-radius: 8px;
              border: 1px solid rgba(226, 232, 240, 0.8);
            }
            
            .logos:before,
            .logos:after {
              position: absolute;
              top: 0;
              width: 60px;
              height: 100%;
              content: "";
              z-index: 2;
            }
            
            .logos:before {
              left: 0;
              background: linear-gradient(to right, white, transparent);
            }
            
            .logos:after {
              right: 0;
              background: linear-gradient(to left, white, transparent);
            }
            
            .logos-slide {
              display: inline-block;
              animation: scroll 10s linear infinite;
              white-space: nowrap;
            }
            
            .logos:hover .logos-slide {
              animation-play-state: paused;
            }
            
            .logo {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              height: 70px;
              width: 140px;
              margin: 0 12px;
              background: white;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
              border-radius: 10px;
              padding: 12px;
              transition: all 0.3s ease;
            }
            
            @media (max-width: 640px) {
              .logo {
                height: 60px;
                width: 110px;
                margin: 0 8px;
                padding: 8px;
              }
              
              .logos:before,
              .logos:after {
                width: 40px;
              }
            }
            
            .logo:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px rgba(66, 153, 225, 0.3);
              background: white;
            }
            
            .dark-logo {
              filter: none;
            }
          `}</style>
          
          <div className="logos">
            <div className="logos-slide">
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-10" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-10" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-10" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn" className="h-8" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 dark-logo" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="Wipro" className="h-8 dark-logo" />
              </div>
              
              {/* Duplicate set for seamless infinite scrolling */}
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-10" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-10" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-10" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn" className="h-8" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 dark-logo" />
              </div>
              <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="Wipro" className="h-8 dark-logo" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlacementsSection;