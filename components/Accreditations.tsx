
import React, { memo } from 'react';
import { useInView } from '../hooks/useInView';

// Using local images for faster loading and better performance
const accreditationLogos = [
  { name: 'VIGNAN\'s Institute of Information Technology', src: '/images/Vignan_logo.png', alt: 'Vignan Logo', width: 120, height: 80 },
  { name: 'NAAC A+ Grade', src: '/images/naac-logo.png', alt: 'NAAC A+ Grade', width: 100, height: 80, fallback: 'https://i.imgur.com/5c9iY3a.png' },
  { name: 'NBA Accredited', src: '/images/nba-logo.png', alt: 'NBA Accreditation Logo', width: 100, height: 80, fallback: 'https://i.imgur.com/k2j425V.png' },
  { name: 'UGC Autonomous', src: '/images/ugc-logo.png', alt: 'UGC Autonomous Logo', width: 100, height: 80, fallback: 'https://i.imgur.com/S33r5mX.png' },
  { name: 'NIRF Innovation Ranking', src: '/images/nirf-logo.png', alt: 'NIRF Ranking Logo', width: 100, height: 80, fallback: 'https://i.imgur.com/rOHn6jP.png' },
];

const Accreditations: React.FC = memo(() => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-white py-12 sm:py-16" ref={ref} id="Accreditations">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center">
          {accreditationLogos.map((logo, index) => (
            <div
              key={logo.name}
              className={`transition-all duration-300 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="flex justify-center p-3 sm:p-4">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  loading="lazy"
                  className="max-h-16 sm:max-h-20 md:max-h-24 object-contain transition-transform hover:scale-105"
                  onError={(e) => {
                    // If image fails to load and we have a fallback, use it
                    const imgElement = e.target as HTMLImageElement;
                    const logoItem = accreditationLogos.find(l => l.src === imgElement.src);
                    if (logoItem?.fallback) {
                      console.log(`Using fallback for ${logoItem.name}`);
                      imgElement.src = logoItem.fallback;
                    } else if (logo.name === 'VIGNAN\'s Institute of Information Technology') {
                      // Special handling for Vignan logo since it's critical
                      console.warn('Vignan logo failed to load, trying alternative path');
                      imgElement.src = '/images/LOGO_AAA copy.png';
                    }
                  }}
                />
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