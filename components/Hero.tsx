import React, { useState, useEffect, useRef } from 'react';

// --- Data for the slides ---
const slides = [
  { id: 1, desktopImage: "/images/SLIDE_0.jpg", mobileImage: "/images/SLIDE_0.jpg" },
  { id: 2, desktopImage: "/images/03 copy.jpg", mobileImage: "/images/03 copy.jpg" },
  { id: 3, desktopImage: "/images/SLIDE_A copy.jpg", mobileImage: "/images/SLIDE_A copy.jpg" },
  { id: 4, desktopImage: "/images/2021-25 copy.jpg", mobileImage: "/images/SLIDE_C[1].jpg" },
];

// --- Reusable Arrow Icon Component ---
const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// --- The Final Hero Component ---
const Hero: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to check screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Effect for the automatic slideshow timer
  useEffect(() => {
    if (slides.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlideIndex(prev => (prev + 1) % slides.length);
      }, 7000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // --- Slide navigation functions ---
  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={`relative w-full overflow-hidden group ${
        isMobile ? 'mt-16' : 'h-[90vh] mt-[10vh]' // Restored desktop height, kept new mobile margin
    }`}>

      {/* --------------------- DESKTOP VIEW (Restored to your original) ---------------------- */}
      {!isMobile && (
        <>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 w-full h-[90vh] bg-[length:100%_100%] bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url('${slide.desktopImage}')`,
                opacity: index === currentSlideIndex ? 1 : 0,
                transform: `scale(${index === currentSlideIndex ? 1 : 1.05})`,
                transition: 'opacity 1.5s ease-in-out, transform 10s ease-out',
              }}
            >
              {/* This is your original div-based slide with the Ken Burns effect */}
            </div>
          ))}
          {/* Your original desktop navigation */}
          <div className="absolute inset-0 z-10 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition hover:bg-white/20 hover:scale-110"
            >
              <ArrowIcon className="w-6 h-6 transform rotate-180" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition hover:bg-white/20 hover:scale-110"
            >
              <ArrowIcon className="w-6 h-6" />
            </button>
          </div>
        </>
      )}

      {/* --------------------- MOBILE VIEW (The new, working version) ---------------------- */}
      {isMobile && (
        <div className="relative w-full h-0 pb-[56.25%]"> {/* Aspect ratio container */}
          {/* Slides */}
          {slides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.mobileImage}
              alt={`Slide ${slide.id}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* Mobile Navigation */}
          <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-between px-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-black/25 text-white transition-opacity duration-300 hover:bg-black/40"
            >
              <ArrowIcon className="w-5 h-5 transform rotate-180" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-black/25 text-white transition-opacity duration-300 hover:bg-black/40"
            >
              <ArrowIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;