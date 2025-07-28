// src/components/StatsSection.tsx

import React from 'react';
import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';

// Data for the statistics cards
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

// Type definition for a single stat item
type StatItem = typeof statsData[0];

// StatCard Sub-Component
const StatCard: React.FC<{ stat: StatItem; inView: boolean; delay: string; }> = ({ stat, inView, delay }) => {
    const count = useCounter(stat.value, 2000, inView, stat.decimals);

    return (
        // Opening div for the card
        <div 
          className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-center`} 
          style={{ transitionDelay: delay }}
        >
            <div className="flex items-baseline justify-center gap-1">
              <p className="text-4xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>{count}</p>
              <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>{stat.suffix}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-2" style={{ fontFamily: 'Georgia, serif' }}>{stat.label}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
        </div>
    );
};

// Main StatsSection Component
const StatsSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    // Opening section tag for the whole component
    <section className="relative pt-16 sm:pt-24 pb-0 sm:pb-0 mb-0 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading container */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}> 
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            VIIT at a Glance
          </h2>
        </div>
        
        {/* Grid container for the stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} inView={inView} delay={`${index * 100}ms`} />
          ))}
        </div> {/* Closing grid container */}
        
        {/* Button container */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}> 
          <a
            href="#"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Download College Brochure
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

      </div> {/* Closing main content container */}
    </section> // Closing section tag
  );
};

export default StatsSection;