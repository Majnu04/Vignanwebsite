// src/components/PlacementsSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';
import { AnimatedElement } from './AnimatedElement';
import { useContext } from 'react';
import { StoreContext } from '../storeContext/StoreContext';

// --- DATA ---
// const highlights = [
//   {
//     student: 'Vasu Surisetty',
//     company: 'Meesho',
//     package: '37 LPA',
//     image: '/images/02 copy.png',
//     companyLogo: '/images/meeshoLogo.svg'
//   },
//   {
//     student: 'Ankit Sharma',
//     company: 'LinkedIn',
//     package: '42 LPA',
//     image: '/images/07 copy.png',
//     companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg'
//   },
//   {
//     student: 'Seshu',
//     company: 'Cisco',
//     package: '23 LPA',
//     image: '/images/04 copy.png',
//     companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg'
//   },
//   {
//     student: 'Umakanth ',
//     company: 'Amazon',
//     package: '26 LPA',
//     image: '/images/03 copy.png',
//     companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
//   },
//   {
//     student: 'Koushik',
//     company: 'SAP Labs',
//     package: '15 LPA',
//     image: '/images/06 copy.png',
//     companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg'
//   },
// ];

// --- SUB-COMPONENTS ---
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
  const { url,placementList } = useContext(StoreContext);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const highlights= placementList;
  const totalHighlights = highlights.length;

  useEffect(() => {
    const resetTimeout = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    resetTimeout();
    timeoutRef.current = setTimeout(() => setCurrentIndex(prev => prev + 1), 4000);
    return () => resetTimeout();
  }, [currentIndex]);

  const goToPrev = () => setCurrentIndex(prev => prev - 1);
  const goToNext = () => setCurrentIndex(prev => prev + 1);

  return (
    <section ref={ref} className="relative py-6 md:py-8 lg:py-10 overflow-hidden bg-gray-50">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-20">
          <AnimatedElement animation="slide-down" className="block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              A Legacy of Placement Excellence
            </h2>
          </AnimatedElement>
          <AnimatedElement animation="fade-in" delay={200} className="block">
            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              Our students are shaping the future at the world's leading technology companies.
            </p>
          </AnimatedElement>
        </div>
        
        {/* --- STATS DASHBOARD --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-24">
          <AnimatedElement animation="slide-up" delay={100} className="h-full">
            <AnimatedStat value={45} suffix=" LPA" label="Highest Package" />
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={200} className="h-full">
            <AnimatedStat value={8.5} decimals={1} suffix=" LPA" label="Average Package" />
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={300} className="h-full">
            <AnimatedStat value={1250} suffix="+" label="Total Offers (2024)" />
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={400} className="h-full">
            <AnimatedStat value={350} suffix="+" label="Companies Visited" />
          </AnimatedElement>
        </div>

        {/* --- FINAL RESPONSIVE CAROUSEL --- */}
        <div className="relative h-[380px] sm:h-[420px] md:h-[450px] w-full flex items-center justify-center md:[perspective:1500px]">
          <div className="relative w-64 sm:w-72 md:w-80 h-full [transform-style:preserve-3d]">
            {highlights.map((highlight, index) => {
              const modIndex = (currentIndex % totalHighlights + totalHighlights) % totalHighlights;
              let offset = index - modIndex;
              if (offset > totalHighlights / 2) offset -= totalHighlights;
              if (offset < -totalHighlights / 2) offset += totalHighlights;

              const isCentralCard = offset === 0;
              const isVisibleOnDesktop = Math.abs(offset) <= 1;

              return (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transition: 'all 0.6s ease-out',
                    transform: `translateX(${offset * 105}%) rotateY(${offset * 25}deg) scale(${isCentralCard ? 1 : 0.85})`,
                    opacity: isVisibleOnDesktop ? 1 : 0,
                    zIndex: totalHighlights - Math.abs(offset),
                    '@media (max-width: 767px)': {
                      transform: 'translateX(0) rotateY(0) scale(1)',
                      opacity: isCentralCard ? 1 : 0,
                      zIndex: isCentralCard ? 1 : 0,
                    }
                  }}
                >
                  <Tilt
                    className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-slate-800"
                    perspective={1000} glareEnable={true} glareMaxOpacity={0.1} glareColor="#ffffff" glarePosition="all"
                    tiltMaxAngleX={5} tiltMaxAngleY={5} transitionSpeed={1500}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={`${url}/uploads/${highlight.image}`} 
                        alt={highlight.student} 
                        className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ease-out"
                        style={{
                          '@media (min-width: 768px)': {
                            filter: !isCentralCard ? 'blur(8px)' : 'blur(0px)',
                            transform: !isCentralCard ? 'scale(1.1)' : 'scale(1)',
                          }
                        }}
                      />
                      
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                          <img src={`${url}/uploads/${highlight.companyLogo}`} alt={`${highlight.company} logo`} className="w-24 h-auto mb-3" style={{filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))'}} />
                          <p className="text-xl font-bold tracking-wide" style={{textShadow: '0 1px 3px rgba(0,0,0,0.4)'}}>{highlight.student}</p>
                          <p className="text-2xl font-extrabold text-cyan-400" style={{textShadow: '0 1px 3px rgba(0,0,0,0.4)'}}>{highlight.package}</p>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </div>
              );
            })}
          </div>
          
          <button onClick={goToPrev} className="absolute left-0 sm:left-4 md:-left-4 top-1/2 -translate-y-1/2 p-2 bg-white/60 backdrop-blur-sm rounded-full text-slate-700 hover:bg-white transition-all shadow-lg z-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goToNext} className="absolute right-0 sm:right-4 md:-right-4 top-1/2 -translate-y-1/2 p-2 bg-white/60 backdrop-blur-sm rounded-full text-slate-700 hover:bg-white transition-all shadow-lg z-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* --- COMPLETE RECRUITER SECTION --- */}
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
            .logos:before, .logos:after {
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
              animation: scroll 20s linear infinite;
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
            .logo:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 25px rgba(66, 153, 225, 0.3);
            }
          `}</style>
          <div className="logos">
            <div className="logos-slide">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-10" /></div>
                  <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-10" /></div>
                  <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-10" /></div>
                  <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8" /></div>
                  <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn" className="h-8" /></div>
                  <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8" /></div>
                  <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="Wipro" className="h-8" /></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementsSection;