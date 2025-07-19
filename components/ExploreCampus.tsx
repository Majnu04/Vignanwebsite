
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
        <div className="bg-white py-20 sm:py-28" ref={ref}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">
                        Explore Our Campus
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover the world-class facilities and vibrant environment that make Vignan a premier institution. Click on the hotspots to learn more.
                    </p>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Map Section */}
                    <div className="lg:col-span-3 h-[60vh] bg-gray-200 rounded-2xl relative overflow-hidden shadow-lg">
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
                                className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2"
                                style={hotspot.position}
                                aria-label={`Show details for ${hotspot.name}`}
                            >
                                <div className={`w-full h-full rounded-full bg-white/50 backdrop-blur-sm shadow-2xl transition-all duration-300 ${activeHotspot.id === hotspot.id ? 'scale-125' : 'hover:scale-125'}`}>
                                     <div className={`pulse-dot w-full h-full rounded-full bg-blue-500`}></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="lg:col-span-2 flex flex-col overflow-hidden">
                        <div key={activeHotspot.id} className="bg-white rounded-2xl shadow-lg flex flex-col flex-grow p-4 animate-slide-in">
                            <div className="h-56 w-full rounded-xl overflow-hidden mb-4">
                                    <img 
                                    src={activeHotspot.image} 
                                    alt={activeHotspot.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold text-blue-900">{activeHotspot.name}</h3>
                                <p className="mt-2 text-gray-600 flex-grow">{activeHotspot.description}</p>
                                <a href="#" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-800 transition-colors">Learn More &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreCampus;