// src/components/StatsSection.tsx

import React from 'react';
import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';

const statsData = [
    { value: 42, label: 'NIRF Ranking 2024', description: 'Among top engineering institutions', suffix: '', decimals: 0 },
    { value: 95, label: 'Placement Rate', description: '600+ companies visit annually', suffix: '%', decimals: 0 },
    { value: 120, label: 'Lush Green Campus', description: 'State-of-the-art infrastructure', suffix: ' acres', decimals: 0 },
    { value: 250, label: 'Faculty Members', description: '85% with PhD qualifications', suffix: '+', decimals: 0 },
    { value: 15000, label: 'Students', description: 'From 28 states & 12+ countries', suffix: '+', decimals: 0 },
    { value: 125, label: 'Research Projects', description: 'With ₹40+ crores in funding', suffix: '+', decimals: 0 },
    { value: 45, label: 'Academic Programs', description: 'Across 5 schools of excellence', suffix: '+', decimals: 0 },
    { value: 80, label: 'Industry Partners', description: 'For training & internships', suffix: '+', decimals: 0 },
];

const StatCard: React.FC<{ stat: typeof statsData[0]; inView: boolean; delay: string; }> = ({ stat, inView, delay }) => {
    const count = useCounter(stat.value, 2000, inView, stat.decimals);

    return (
        // Cards remain solid white for maximum readability.
        <div 
          className={`bg-white p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-blue-200/50 border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-center`} 
          style={{ transitionDelay: delay }}
        >
            <div className="flex items-baseline justify-center gap-1">
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">{count}</p>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">{stat.suffix}</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-2">{stat.label}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{stat.description}</p>
        </div>
    );
};

const StatsSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    // The section wrapper itself is now transparent.
    <div id="StatsSection" className="relative bg-transparent py-12 sm:py-16 md:py-24" ref={ref}>
      
      {/* REMOVED: The decorative blob elements are now gone. */}

      {/* Glass Panel Container - This will now blur the page content scrolling behind it. */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200/80 shadow-2xl">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            VIIT at a Glance
          </h2>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} inView={inView} delay={`${index * 100}ms`} />
          ))}
        </div>
        
        <div className={`mt-12 sm:mt-16 text-center transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <a
            href="#"
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Download College Brochure
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;