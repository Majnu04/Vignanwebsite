import React, { useState, useEffect, useRef } from 'react';

// Simplified slide data - only background images are needed now.
const slides = [
    { id: 1, backgroundImage: "/images/SLIDE_0.jpg" },
    { id: 2, backgroundImage: "/images/03 copy.jpg" },
    { id: 3, backgroundImage: "/images/SLIDE_A copy.jpg" },
    { id: 4, backgroundImage: "/images/SLIDE_C[1].jpg" },
];

// Reusable Arrow Icon for buttons
const ArrowIcon = ({ className = "" }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const Hero: React.FC = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Function to go to the next slide
    const nextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
    
    // Set up the automatic sliding timer
    useEffect(() => {
        intervalRef.current = setInterval(nextSlide, 7000); // 7-second interval

        // Clean up the interval when the component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []); // Empty dependency array means this effect runs only once on mount

    return (
        <section className="relative h-[90vh] mt-[10vh] w-full overflow-hidden group">
            {/* Background Image Container */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className="absolute inset-0 w-full h-full bg-[length:100%_100%] bg-center transition-opacity duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `url('${slide.backgroundImage}')`,
                        opacity: index === currentSlideIndex ? 1 : 0, // Fade in/out effect
                        transform: `scale(${index === currentSlideIndex ? 1 : 1.05})`, // Subtle zoom effect
                        transition: 'opacity 1.5s ease-in-out, transform 10s ease-out',
                    }}
                >
                    {/* A simple, dark overlay for better visibility if you ever add text back */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            ))}

            {/* Manual Navigation Buttons */}
            {/* These buttons will appear only on hover of the entire hero section */}
            <div className="absolute inset-0 z-10 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
                >
                    <ArrowIcon className="w-6 h-6 transform rotate-180" />
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
                >
                    <ArrowIcon className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
};

export default Hero;