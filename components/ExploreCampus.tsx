
import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import ImageWithFallback from './ImageWithFallback';
import PulsingDot from './icons/PulsingDot';
import ColorfulArrow from './icons/ColorfulArrow';
import GradientHeaderBg from './icons/GradientHeaderBg';

const hotspots = [
    {
        id: 1,
        name: 'Central Library',
        description: 'A modern, two-storied, air-conditioned facility with a vast collection of books, journals, and digital resources to support academic and research activities.',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
        position: { top: '35%', left: '40%' }
    },
    {
        id: 2,
        name: 'Sports Complex',
        description: 'A sprawling complex with facilities for various indoor and outdoor sports, including cricket, basketball, and tennis, promoting physical fitness and teamwork.',
        image: 'https://images.unsplash.com/photo-1571260899104-6a8eda9c3a36?q=80&w=2070&auto=format&fit=crop',
        position: { top: '65%', left: '25%' }
    },
    {
        id: 3,
        name: 'Modern Hostels',
        description: 'Comfortable and secure on-campus housing with all necessary amenities, providing a home away from home for students.',
        image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=1974&auto=format&fit=crop',
        position: { top: '25%', left: '70%' }
    },
    {
        id: 4,
        name: 'Advanced Labs',
        description: 'State-of-the-art laboratories equipped with the latest technology to facilitate hands-on learning and cutting-edge research.',
        image: 'https://images.unsplash.com/photo-1581093450021-4a7362aa942b?q=80&w=2070&auto=format&fit=crop',
        position: { top: '55%', left: '60%' }
    },
];

// Local campus image for reliable fallback
const LOCAL_CAMPUS_MAP = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBmMmZlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwMzY5YTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlZpZ25hbiBDYW1wdXMgTWFwPC90ZXh0Pjwvc3ZnPg==';

const ExploreCampus: React.FC = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [activeHotspot, setActiveHotspot] = useState(hotspots[0]);

    return (
        <div className="bg-white pt-12 sm:pt-20 pb-0 sm:pb-0 mb-0" ref={ref}>
            <div className="container mx-auto px-3 sm:px-6 lg:px-8">
                <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}> 
                    <GradientHeaderBg theme="blue">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-700 tracking-tight">
                            Explore Our Campus
                        </h2>
                    </GradientHeaderBg>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover the world-class facilities and vibrant environment that make Vignan a premier institution. Tap hotspots to learn more.
                    </p>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}> 
                    {/* Map Section */}
                    <div className="lg:col-span-3 h-56 xs:h-64 sm:h-72 md:h-[50vh] lg:h-[60vh] bg-gray-200 rounded-xl sm:rounded-2xl relative overflow-hidden shadow-lg">
                        <ImageWithFallback 
                            src="/images/SLIDE_B.jpg"
                            alt="Vignan Campus Map"
                            fallbackSrc={LOCAL_CAMPUS_MAP}
                            fallbackCategory="campus"
                            className="w-full h-full"
                            objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        {hotspots.map(hotspot => (
                             <button
                                key={hotspot.id}
                                onClick={() => setActiveHotspot(hotspot)}
                                className="absolute w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none flex items-center justify-center"
                                style={hotspot.position}
                                aria-label={`Show details for ${hotspot.name}`}
                            >
                                <div className={`w-full h-full rounded-full bg-white/70 backdrop-blur-sm shadow-2xl transition-all duration-300 
                                      ${activeHotspot.id === hotspot.id ? 'scale-125 ring-2 ring-primary-500 animate-pulse' : 'hover:scale-110'} 
                                      flex items-center justify-center`}>
                                    <PulsingDot 
                                        size={activeHotspot.id === hotspot.id ? (window.innerWidth < 640 ? 16 : 20) : (window.innerWidth < 640 ? 12 : 16)} 
                                        color="#3b82f6"
                                        active={activeHotspot.id === hotspot.id}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="lg:col-span-2 flex flex-col overflow-hidden mt-4 sm:mt-5 lg:mt-0">
                        <div key={activeHotspot.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg flex flex-col flex-grow p-2 sm:p-3 md:p-4 animate-slide-in">
                            <div className="h-32 xs:h-40 sm:h-48 md:h-56 w-full rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 md:mb-4">
                                <ImageWithFallback 
                                    src={activeHotspot.image} 
                                    alt={activeHotspot.name} 
                                    fallbackCategory="facilities"
                                    className="w-full h-full"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-1 sm:p-2 md:p-4 flex-grow flex flex-col">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-700">{activeHotspot.name}</h3>
                                <p className="mt-1 sm:mt-2 text-gray-600 flex-grow text-xs sm:text-sm md:text-base line-clamp-3 sm:line-clamp-none">{activeHotspot.description}</p>
                                <a href="#" className="mt-2 sm:mt-3 md:mt-4 inline-flex items-center font-semibold text-primary-600 hover:text-primary-800 transition-colors text-xs sm:text-sm md:text-base group">
                                    Learn More 
                                    <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                                        <ColorfulArrow size={window.innerWidth < 640 ? 14 : 18} />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreCampus;