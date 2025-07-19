
import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

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

const ExploreCampus: React.FC = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [activeHotspot, setActiveHotspot] = useState(hotspots[0]);

    return (
        <div className="bg-white py-12 sm:py-20" ref={ref}>
            <div className="container mx-auto px-3 sm:px-6 lg:px-8">
                <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}> 
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-700 tracking-tight">
                        Explore Our Campus
                    </h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover the world-class facilities and vibrant environment that make Vignan a premier institution. Tap hotspots to learn more.
                    </p>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}> 
                    {/* Map Section */}
                    <div className="lg:col-span-3 h-64 xs:h-80 sm:h-[50vh] lg:h-[60vh] bg-gray-200 rounded-2xl relative overflow-hidden shadow-lg">
                        <img 
                            src="https://images.unsplash.com/photo-1600585152220-0140ABC847c2?q=80&w=2070&auto=format&fit=crop"
                            alt="Vignan Campus Map"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        {hotspots.map(hotspot => (
                             <button
                                key={hotspot.id}
                                onClick={() => setActiveHotspot(hotspot)}
                                className="absolute w-8 h-8 xs:w-10 xs:h-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                                style={hotspot.position}
                                aria-label={`Show details for ${hotspot.name}`}
                            >
                                <div className={`w-full h-full rounded-full bg-white/60 backdrop-blur-sm shadow-2xl transition-all duration-300 ${activeHotspot.id === hotspot.id ? 'scale-125 ring-2 ring-primary-500' : 'hover:scale-110'}`}> 
                                     <div className={`pulse-dot w-full h-full rounded-full bg-primary-500`}></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="lg:col-span-2 flex flex-col overflow-hidden mt-6 lg:mt-0">
                        <div key={activeHotspot.id} className="bg-white rounded-2xl shadow-lg flex flex-col flex-grow p-3 sm:p-4 animate-slide-in">
                            <div className="h-40 xs:h-56 w-full rounded-xl overflow-hidden mb-3 sm:mb-4">
                                    <img 
                                    src={activeHotspot.image} 
                                    alt={activeHotspot.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-2 sm:p-4 flex-grow flex flex-col">
                                <h3 className="text-xl sm:text-2xl font-bold text-primary-700">{activeHotspot.name}</h3>
                                <p className="mt-1 sm:mt-2 text-gray-600 flex-grow text-sm sm:text-base">{activeHotspot.description}</p>
                                <a href="#" className="mt-3 sm:mt-4 inline-block font-semibold text-primary-600 hover:text-primary-800 transition-colors text-sm sm:text-base">Learn More &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreCampus;