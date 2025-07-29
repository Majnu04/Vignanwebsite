import React, { useState, useEffect, useRef } from 'react';
const slides = [
{ id: 1, desktopImage: "/images/SLIDE_0.jpg", mobileImage: "/images/SLIDE_0.jpg" },
{ id: 2, desktopImage: "/images/03 copy.jpg", mobileImage: "/images/03 copy.jpg" },
{ id: 3, desktopImage: "/images/SLIDE_A copy.jpg", mobileImage: "/images/SLIDE_A copy.jpg" },
{ id: 4, desktopImage: "/images/2021-25 copy.jpg", mobileImage: "/images/SLIDE_C[1].jpg" },
];
const ArrowIcon = ({ className = "" }: { className?: string }) => (
<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
);
const Hero: React.FC = () => {
const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
const [isMobile, setIsMobile] = useState(false);
const intervalRef = useRef<NodeJS.Timeout | null>(null);
useEffect(() => {
const checkScreenSize = () => {
setIsMobile(window.innerWidth < 768);
};
checkScreenSize();
window.addEventListener('resize', checkScreenSize);
return () => window.removeEventListener('resize', checkScreenSize);
}, []);
useEffect(() => {
intervalRef.current = setInterval(() => {
setCurrentSlideIndex(prev => (prev + 1) % slides.length);
}, 7000);
return () => clearInterval(intervalRef.current!);
}, []);
const nextSlide = () => setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
const prevSlide = () => setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
return (
  <section className={`relative w-full overflow-hidden group ${isMobile ? 'h-[45vh] mt-[10vh]' : 'h-[90vh] mt-[10vh]'}`}> 
    {/* --------------------- DESKTOP VIEW ---------------------- */}
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
            {/* Removed background overlay to prevent biscuit color */}
          </div>
        ))}
        {/* Navigation for desktop */}
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

    {/* --------------------- MOBILE VIEW ---------------------- */}
    {isMobile && (
      <div className="relative w-full h-[45vh]  overflow-hidden flex items-center justify-center">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.mobileImage}
            alt={`Slide ${slide.id}`}
            className={`absolute inset-0 w-full h-[45vh] bg-[length:100%_100%] bg-center object-cover transition-opacity duration-1000 ease-in-out ${index === currentSlideIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              pointerEvents: index === currentSlideIndex ? 'auto' : 'none',
              transition: 'opacity 1.5s ease-in-out',
            }}
          />
        ))}
        {/* Simpler nav for mobile */}
        <div className="absolute inset-0 z-10 flex items-center justify-between px-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition hover:bg-white/20 hover:scale-105"
          >
            <ArrowIcon className="w-5 h-5 transform rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition hover:bg-white/20 hover:scale-105"
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