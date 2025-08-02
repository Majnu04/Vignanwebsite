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
        <div
          className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-blue-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} text-center`}
          style={{ transitionDelay: delay }}
        >
            <div className="flex items-baseline justify-center gap-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>{count}</p>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600" style={{ fontFamily: "'Georgia', serif" }}>{stat.suffix}</span>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mt-2 sm:mt-3" style={{ fontFamily: "'Georgia', serif" }}>{stat.label}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-1.5 line-clamp-2">{stat.description}</p>
        </div>
    );
};

// Main StatsSection Component
const StatsSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">

        <div className={`text-center mb-8 sm:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
            VIIT at a Glance
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 px-4">A snapshot of our achievements and community</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} inView={inView} delay={`${index * 100}ms`} />
          ))}
        </div>

        <div className={`mt-10 sm:mt-16 text-center transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href="#"
            className="inline-flex items-center px-5 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-full font-semibold text-sm sm:text-base hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Download Brochure
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;