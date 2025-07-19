
import React from 'react';
import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';

const recruiters = [
  'tata', 'infosys', 'deloitte', 'wipro', 'amazonaws', 
  'microsoft', 'google', 'capgemini', 'accenture', 'hcltech'
];

const placementStats = [
  { value: 15, label: 'Highest Package', suffix: ' LPA', decimals: 0 },
  { value: 5.2, label: 'Average Package', suffix: ' LPA', decimals: 1 },
];

const PlacementStat: React.FC<{ stat: typeof placementStats[0]; inView: boolean }> = ({ stat, inView }) => {
    const count = useCounter(stat.value, 1500, inView, stat.decimals);

    return (
        <div className="text-center">
            <p className="text-5xl font-extrabold text-white">
                {count}{stat.suffix}
            </p>
            <p className="text-lg font-medium text-blue-200/90 mt-2">{stat.label}</p>
        </div>
    );
};


const PlacementsSection: React.FC = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    const MarqueeContent = () => (
        <>
            {recruiters.map((logo, index) => (
                <div key={index} className="flex-shrink-0 w-48 h-20 flex items-center justify-center mx-5">
                    <img
                        src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${logo}.svg`}
                        alt={logo}
                        className="max-h-12 w-auto object-contain filter grayscale brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    />
                </div>
            ))}
        </>
    );

    return (
        <div className="bg-blue-900 py-20 sm:py-28" ref={ref}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Placements & Top Recruiters
                    </h2>
                    <p className="mt-4 text-lg text-blue-200/80 max-w-3xl mx-auto">
                        Our strong industry connections pave the way for excellent career opportunities for our graduates.
                    </p>
                </div>

                <div className={`flex justify-center gap-12 sm:gap-24 mb-16 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    {placementStats.map((stat) => (
                        <PlacementStat key={stat.label} stat={stat} inView={inView} />
                    ))}
                </div>

                <div className="relative marquee mt-12">
                    <div className="marquee__content">
                       <MarqueeContent />
                    </div>
                    <div className="marquee__content" aria-hidden="true">
                       <MarqueeContent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementsSection;
