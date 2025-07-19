
import React, { useState, useEffect } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const ArrowUpIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);


const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const scrollProgress = useScrollProgress();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    
    const size = 56;
    const strokeWidth = 4;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            aria-label="Scroll to top"
        >
            <div className="relative" style={{ width: size, height: size }}>
                 <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="#2563eb"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-200"
                    />
                </svg>
                 <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg group-hover:bg-white transition-colors">
                    <ArrowUpIcon className="w-6 h-6 text-blue-800" />
                </div>
            </div>
        </button>
    );
};

export default ScrollToTopButton;
