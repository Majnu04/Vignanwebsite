// src/components/ProgramsSection.tsx

import React, { useState } from 'react';

// Data structure for all programs
const programsData = {
  UG: {
    btech: [
      'Artificial Intelligence & Data Science',
      'Computer Science & Engineering',
      'Computer Science & Engineering (Cyber Security)',
      'Computer Science & Engineering (AI)',
      'Computer Science & Engineering (Data Science)',
      'Civil Engineering',
      'Electrical & Electronics Engineering',
      'Electronics & Computer Engineering',
      'Electronics & Communication Engineering',
      'Information Technology',
      'Mechanical Engineering',
    ],
  },
  PG: {
    mtech: [
      'Artificial Intelligence & Machine Learning',
      'Computer Science & Engineering',
      'Digital Electronics & Communication Systems',
      'Electronics & Communication Engineering',
      'Information Technology',
      'Machine Design',
      'Power & Industrial Drives',
      'Transportation Engineering',
    ],
    management: [
      'Master of Business Administration (MBA)',
    ],
    mca: [
      'Master of Computer Applications (MCA)',
    ],
  },
};

const ProgramsSection: React.FC = () => {
  // State to manage which category is currently active ('UG' or 'PG')
  // We'll default to 'UG' so something is always showing initially.
  const [activeCategory, setActiveCategory] = useState<'UG' | 'PG'>('UG');

  // Blue theme colors
  const activeBgColor = 'bg-blue-600';
  const activeTextColor = 'text-white';
  const inactiveBgColor = 'bg-white/10';
  const inactiveTextColor = 'text-gray-800';
  const hoverBgColor = 'hover:bg-blue-500/50 hover:text-white';
  const borderColor = 'border-blue-300/50';

  return (
    <section className="relative bg-slate-50 py-20 sm:py-28 overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
      
      {/* Decorative Blobs for the glass effect */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* CORRECTED: Heading is now left-aligned */}
        <div className="text-left mb-12">
          <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
            Programmes Offered
          </h2>
        </div>

        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Category Tabs with onMouseEnter */}
          <div className="lg:w-1/4 flex flex-col space-y-4">
            <div
              onMouseEnter={() => setActiveCategory('UG')}
              className={`w-full p-4 text-lg text-center font-semibold border ${borderColor} rounded-md transition-all duration-300 backdrop-blur-md cursor-pointer
                ${activeCategory === 'UG' ? `${activeBgColor} ${activeTextColor}` : `${inactiveBgColor} ${inactiveTextColor} ${hoverBgColor}`}`}
            >
              Undergraduate
            </div>
            <div
              onMouseEnter={() => setActiveCategory('PG')}
              className={`w-full p-4 text-lg text-center font-semibold border ${borderColor} rounded-md transition-all duration-300 backdrop-blur-md cursor-pointer
                ${activeCategory === 'PG' ? `${activeBgColor} ${activeTextColor}` : `${inactiveBgColor} ${inactiveTextColor} ${hoverBgColor}`}`}
            >
              Postgraduate
            </div>
          </div>

          {/* Right Column: Program Lists */}
          <div className={`lg:w-3/4 bg-white/40 backdrop-blur-lg border ${borderColor} rounded-md p-8 lg:p-12 min-h-[400px]`}>
            {activeCategory === 'UG' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">UNDERGRADUATE COURSES (B.TECH)</h3>
                <div className="space-y-4">
                  {programsData.UG.btech.map((program, index) => (
                    <p key={index} className={`text-base text-gray-700 pb-4 border-b border-blue-900/10 last:border-b-0 p-2 rounded-md transition-all duration-200 hover:bg-blue-500/20 hover:text-gray-900 cursor-pointer`}>
                      {program}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {activeCategory === 'PG' && (
              <div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">POST GRADUATE COURSES (M.TECH)</h3>
                  <div className="space-y-4">
                    {programsData.PG.mtech.map((program, index) => (
                      <p key={index} className={`text-base text-gray-700 pb-4 border-b border-blue-900/10 last:border-b-0 p-2 rounded-md transition-all duration-200 hover:bg-blue-500/20 hover:text-gray-900 cursor-pointer`}>
                        {program}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">POST GRADUATE PROGRAMME: MANAGEMENT</h3>
                  <div className="space-y-4">
                    {programsData.PG.management.map((program, index) => (
                      <p key={index} className={`text-base text-gray-700 pb-4 border-b border-blue-900/10 last:border-b-0 p-2 rounded-md transition-all duration-200 hover:bg-blue-500/20 hover:text-gray-900 cursor-pointer`}>
                        {program}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">POST GRADUATE PROGRAMME: MCA</h3>
                  <div className="space-y-4">
                    {programsData.PG.mca.map((program, index) => (
                      <p key={index} className={`text-base text-gray-700 pb-4 border-b border-blue-900/10 last:border-b-0 p-2 rounded-md transition-all duration-200 hover:bg-blue-500/20 hover:text-gray-900 cursor-pointer`}>
                        {program}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;