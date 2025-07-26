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
  { name: 'Deloitte', logo: '/images/logos/deloitte.svg' },
  { name: 'TCS', logo: '/images/logos/tcs.svg' },
  { name: 'Accenture', logo: '/images/logos/accenture.svg' },
  { name: 'Cisco', logo: '/images/logos/cisco.svg' },
  { name: 'CRED', logo: '/images/logos/cred.svg' },
  { name: 'SAP Labs', logo: '/images/logos/sap-labs.svg' },
  { name: 'Infosys', logo: '/images/logos/infosys.svg' },
  { name: 'Meesho', logo: '/images/logos/meesho.svg' },
  { name: 'Incircles', logo: '/images/logos/incircles.svg' },
];

// --- SUB-COMPONENTS ---

const AnimatedStat: React.FC<{ value: number; decimals?: number; suffix: string; label: string }> = ({ value, decimals = 0, suffix, label }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const count = useCounter(value, 2000, inView, decimals);
  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl md:text-6xl font-bold text-gray-900">
        {count}<span className="text-blue-600">{suffix}</span>
      </p>
      <p className="text-base text-gray-600 mt-2">{label}</p>
    </div>
  );
};

const HighlightCard: React.FC<{ highlight: typeof highlights[0] }> = ({ highlight }) => {
  return (
    <Tilt
      className="w-72 h-96 rounded-2xl"
      perspective={1000} glareEnable={true} glareMaxOpacity={0.15} glareColor="#ffffff" glarePosition="all"
      tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={1500}
    >
      <div className="relative w-full h-full bg-gray-200 border border-gray-200/50 shadow-2xl rounded-2xl overflow-hidden">
        <img src={highlight.image} alt={highlight.student} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <img src={highlight.companyLogo} alt={`${highlight.company} logo`} className="w-24 h-auto mb-4 drop-shadow-lg" />
          <p className="text-xl font-bold drop-shadow-md">{highlight.student}</p>
          <p className="text-2xl font-extrabold text-white drop-shadow-md">{highlight.package}</p>
        </div>
      </div>
    </Tilt>
  );
};

// --- MAIN COMPONENT ---

const PlacementsSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length),
      4000
    );
    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const goToPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + highlights.length) % highlights.length);
  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length);

  // Duplicate arrays for seamless looping
  const duplicatedHighlights = [...highlights, ...highlights];
  const duplicatedRecruiters = [...recruiters, ...recruiters];

  return (
    <section ref={ref} className="relative bg-gray-50 text-gray-900 py-20 sm:py-28 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div aria-hidden="true" className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            A Legacy of Placement Excellence
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our graduates are catalysts for change, leading innovation at the world's most respected companies.
          </p>
        </div>

        {/* Interactive Data Dashboard */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 transition-opacity duration-1000 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <AnimatedStat value={45} suffix=" LPA" label="Highest Package" />
          <AnimatedStat value={8.5} decimals={1} suffix=" LPA" label="Average Package" />
          <AnimatedStat value={1250} suffix="+" label="Total Offers (2024)" />
          <AnimatedStat value={350} suffix="+" label="Companies Visited" />
        </div>

        {/* 3D Interactive Carousel */}
        <div className="relative h-[450px] w-full flex items-center justify-center [perspective:1000px] mb-24">
          <div className="relative w-72 h-96 [transform-style:preserve-3d]">
            {highlights.map((highlight, index) => {
              const offset = index - currentIndex;
              const rotateY = offset * 25;
              const translateX = offset * 110;
              const zIndex = highlights.length - Math.abs(offset);
              const opacity = Math.abs(offset) > 1 ? 0 : 1;

              return (
                <div key={index} className="absolute w-full h-full transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(${translateX}%) rotateY(${rotateY}deg)`, zIndex, opacity }}>
                  <HighlightCard highlight={highlight} />
                </div>
              );
            })}
          </div>
          {/* Carousel Controls */}
          <button onClick={goToPrev} className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/80 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goToNext} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/80 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Elite Recruiters Wall with SEAMLESS SCROLL */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
            Our Esteemed Recruiters
          </h3>
        </div>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex flex-nowrap animate-marquee-full motion-reduce:animate-none">
            {/* Render the list twice for the seamless effect */}
            {duplicatedRecruiters.map((recruiter, index) => (
              <div key={index} className="flex-shrink-0 w-48 h-24 mx-4 flex items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 shadow-md">
                <img src={recruiter.logo} alt={recruiter.name} className="max-h-12 w-auto object-contain" />
              </div>
            ))}
            {duplicatedRecruiters.map((recruiter, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0 w-48 h-24 mx-4 flex items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 shadow-md">
                <img src={recruiter.logo} alt={recruiter.name} className="max-h-12 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlacementsSection;