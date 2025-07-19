
import React from 'react';
import { useInView } from '../hooks/useInView';

const accreditationLogos = [
  { name: 'VIGNAN\'s Institute of Information Technology', src: 'https://i.imgur.com/2sfH5oz.png', alt: 'Vignan Logo' },
  { name: 'NAAC A+ Grade', src: 'https://i.imgur.com/5c9iY3a.png', alt: 'NAAC A+ Grade' },
  { name: 'NBA Accredited', src: 'https://i.imgur.com/k2j425V.png', alt: 'NBA Accreditation Logo' },
  { name: 'UGC Autonomous', src: 'https://i.imgur.com/S33r5mX.png', alt: 'UGC Autonomous Logo' },
  { name: 'NIRF Innovation Ranking', src: 'https://i.imgur.com/rOHn6jP.png', alt: 'NIRF Ranking Logo' },
];

const Accreditations: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-white py-12 sm:py-16" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {accreditationLogos.map((logo, index) => (
            <div
              key={logo.name}
              className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center p-4">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-24 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accreditations;