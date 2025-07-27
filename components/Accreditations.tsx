
import React, { memo } from 'react';
import { useInView } from '../hooks/useInView';
import ImageWithFallback from './ImageWithFallback';

// Using local images for faster loading and better performance
// All logos standardized to the same dimensions for visual consistency
const accreditationLogos = [
  { name: 'VIGNAN\'s Institute of Information Technology', src: '/images/Vignan_logo.png', alt: 'Vignan Logo', width: 100, height: 90, fallback: '/images/LOGO_AAA copy.png' },
  { name: 'NAAC A+ Grade', src: '/images/2.jpg', alt: 'NAAC A+ Grade', width: 160, height: 120, fallback: 'https://i.imgur.com/5c9iY3a.png' },
  { name: 'NBA Accredited', src: '/images/3.jpg', alt: 'NBA Accreditation Logo', width: 160, height: 120, fallback: 'https://i.imgur.com/k2j425V.png' },
  { name: 'UGC Autonomous', src: '/images/4.jpg', alt: 'UGC Autonomous Logo', width: 160, height: 120, fallback: 'https://i.imgur.com/S33r5mX.png' },
  { name: 'NIRF Innovation Ranking', src: '/images/5.jpg', alt: 'NIRF Ranking Logo', width: 160, height: 120, fallback: 'https://i.imgur.com/rOHn6jP.png' },
];

const Accreditations: React.FC = memo(() => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-white py-12 sm:py-16" ref={ref} id="Accreditations">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 items-center">
          {accreditationLogos.map((logo, index) => (
            <div
              key={logo.name}
              className={`transition-all duration-300 ease-out group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="flex justify-center items-center p-3 sm:p-4 h-24 sm:h-28 md:h-32 rounded-lg hover:bg-blue-50/50 transition-all duration-300">
                <ImageWithFallback
                  src={logo.src}
                  alt={logo.alt}
                  fallbackSrc={logo.fallback}
                  fallbackCategory="accreditation"
                  width={logo.width}
                  height={logo.height}
                  className="w-auto h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  objectFit="contain"
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