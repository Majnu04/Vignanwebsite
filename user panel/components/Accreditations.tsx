// src/components/Accreditations.tsx

import React, { memo } from 'react';
import { useInView } from '../hooks/useInView';

const accreditationLogos = [
  { name: 'NAAC A+ Grade', src: '/images/accreditations/naac.png', alt: 'NAAC A+ Grade Accreditation'},
  { name: 'NBA Accredited', src: '/images/accreditations/nba.png', alt: 'NBA Accreditation Logo' },
  { name: 'UGC Autonomous', src: '/images/accreditations/ugc.png', alt: 'UGC Autonomous Logo' },
  { name: 'NIRF Innovation Ranking', src: '/images/accreditations/nirf.png', alt: 'NIRF Ranking Logo' },
  
];

const Accreditations: React.FC = memo(() => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-white py-6 sm:py-10" ref={ref} id="Accreditations">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Optional: Add a title for the section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
            Recognitions & Accreditations
          </h2>
          <div className="mx-auto mt-4 w-20 h-1 rounded-full bg-blue-500 opacity-50"></div>
        </div>

        {/* 
          CORRECTED: A more robust and responsive grid.
          - 2 columns on mobile.
          - 4 columns on tablets and desktops.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 items-center">
          {accreditationLogos.map((logo, index) => (
            <div
              key={logo.name}
              className={`transition-all duration-500 ease-out flex justify-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group p-4 transition-all duration-300 rounded-lg hover:bg-white relative z-10 hover:z-20 overflow-visible flex flex-col items-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-32 w-auto object-contain transition-all duration-500 ease-out transform group-hover:scale-150 group-hover:-translate-y-2 group-hover:drop-shadow-xl"
                />
                <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-500 text-center bg-blue-50 px-3 py-1 rounded-md text-blue-800 text-sm font-medium shadow-md transform translate-y-2 group-hover:translate-y-0">
                  {logo.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Display name for debugging purposes
Accreditations.displayName = 'Accreditations';

export default Accreditations;