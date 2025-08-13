// import React, { useState, useEffect, useRef } from 'react';
// import { useContext } from 'react';
// import { StoreContext } from '../storeContext/StoreContext';

// // Define the props for the Hero component, including the new onClick function
// interface HeroProps {
//   onClick?: () => void;
// }

// // --- Data for the slides ---
// // const slides = [
// //   { id: 1, desktopImage: "/images/SLIDE_0.jpg", mobileImage: "/images/SLIDE_0.jpg" },
// //   { id: 2, desktopImage: "/images/03 copy.jpg", mobileImage: "/images/03 copy.jpg" },
// //   { id: 3, desktopImage: "/images/SLIDE_A copy.jpg", mobileImage: "/images/SLIDE_A copy.jpg" },
// //   { id: 4, desktopImage: "/images/2021-25 copy.jpg", mobileImage: "/images/SLIDE_C[1].jpg" },
// // ];

// // --- Reusable Arrow Icon Component ---
// const ArrowIcon = ({ className = "" }: { className?: string }) => (
//   <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// // --- The Final Hero Component ---
// const Hero: React.FC<HeroProps> = ({ onClick }) => {
//   const {url,heroList} = useContext(StoreContext);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const slides = heroList;

//   // Effect to check screen size for mobile responsiveness
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkScreenSize(); // Initial check
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Effect for the automatic slideshow timer
//   useEffect(() => {
//     if (slides.length > 1) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlideIndex(prev => (prev + 1) % slides.length);
//       }, 7000);
//     }
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   // --- Slide navigation functions ---
//   const nextSlide = () => {
//     setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     // --- MODIFICATION ---
//     // The `onClick` prop is attached here. When this section is clicked,
//     // it will call the function passed from the parent component.
//     <section
//       onClick={onClick}
//       className={`relative w-full overflow-hidden group ${
//         isMobile ? 'mt-16' : 'h-[70vh] mt-[10vh]'
//     }`}>

//       {/* --------------------- DESKTOP VIEW ---------------------- */}
//       {!isMobile && (
//         <>
//           {slides.map((slide, index) => (
//             <div
//               key={slide.title}
//               className="absolute inset-0 w-full h-[70vh] bg-[length:100%_100%] bg-center transition-opacity duration-1000 ease-in-out"
//               style={{
//                 backgroundImage: `url(${url}/uploads/${slide.desktopImage})`,
//                 opacity: index === currentSlideIndex ? 1 : 0,
//                 transform: `scale(${index === currentSlideIndex ? 1 : 1.05})`,
//                 transition: 'opacity 1.5s ease-in-out, transform 10s ease-out',
//               }}
//             >
//             </div>
//           ))}
//           <div className="absolute inset-0 z-10 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <button
//               onClick={prevSlide}
//               className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition hover:bg-white/20 hover:scale-110"
//             >
//               <ArrowIcon className="w-6 h-6 transform rotate-180" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition hover:bg-white/20 hover:scale-110"
//             >
//               <ArrowIcon className="w-6 h-6" />
//             </button>
//           </div>
//         </>
//       )}

//       {/* --------------------- MOBILE VIEW (Unchanged) ---------------------- */}
//       {isMobile && (
//         <div className="relative w-full h-0 pb-[56.25%]">
//           {slides.map((slide, index) => (
//             <img
//               key={slide.title}
//               src={`${url}/uploads/${slide.mobileImage}`}
//               alt={`Slide ${slide.title}`}
//               className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
//                 index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
//               }`}
//             />
//           ))}
//           <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-between px-2">
//             <button
//               onClick={prevSlide}
//               className="p-2 rounded-full bg-black/25 text-white transition-opacity duration-300 hover:bg-black/40"
//             >
//               <ArrowIcon className="w-5 h-5 transform rotate-180" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="p-2 rounded-full bg-black/25 text-white transition-opacity duration-300 hover:bg-black/40"
//             >
//               <ArrowIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Hero;


// import React, { useState, useEffect, useRef } from 'react';
// import { useContext } from 'react';
// import { StoreContext } from '../storeContext/StoreContext';

// // --- Data for the slides ---
// // const slides = [
// //   { id: 1, desktopImage: "/images/SLIDE_0.jpg", mobileImage: "/images/SLIDE_0.jpg" },
// //   { id: 2, desktopImage: "/images/03 copy.jpg", mobileImage: "/images/03 copy.jpg" },
// //   { id: 3, desktopImage: "/images/SLIDE_A copy.jpg", mobileImage: "/images/SLIDE_A copy.jpg" },
// //   { id: 4, desktopImage: "/images/2021-25 copy.jpg", mobileImage: "/images/SLIDE_C[1].jpg" },
// // ];

// // --- Reusable Arrow Icon Component ---
// const ArrowIcon = ({ className = "" }: { className?: string }) => (
//   <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// // --- The Final Hero Component ---
// const Hero: React.FC = () => {
//   const {url,heroList} = useContext(StoreContext);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const slides = heroList;

//   // Effect to check screen size for mobile responsiveness
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkScreenSize(); // Initial check
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Effect for the automatic slideshow timer
//   useEffect(() => {
//     if (slides.length > 1) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlideIndex(prev => (prev + 1) % slides.length);
//       }, 7000);
//     }
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   // --- Slide navigation functions ---
//   const nextSlide = () => {
//     setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <section className={`relative w-full overflow-hidden group ${
//         isMobile ? 'mt-16' : 'h-[90vh] mt-[10vh]' // Restored desktop height, kept new mobile margin
//     }`}>

//       {/* --------------------- DESKTOP VIEW (Restored to your original) ---------------------- */}
//       {!isMobile && (
//         <>
//           {slides.map((slide, index) => (
//             <div
//               key={slide.title}
//               className="absolute inset-0 w-full h-[90vh] bg-[length:100%_100%] bg-center transition-opacity duration-1000 ease-in-out"
//               style={{
//                 backgroundImage: `url(${url}/uploads/${slide.desktopImage})`,
//                 opacity: index === currentSlideIndex ? 1 : 0,
//                 transform: `scale(${index === currentSlideIndex ? 1 : 1.05})`,
//                 transition: 'opacity 1.5s ease-in-out, transform 10s ease-out',
//               }}
//             >
//               {/* This is your original div-based slide with the Ken Burns effect */}
//             </div>
//           ))}
//           {/* Your original desktop navigation */}
//           <div className="absolute inset-0 z-10 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <button
//               onClick={prevSlide}
//               className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition hover:bg-white/20 hover:scale-110"
//             >
//               <ArrowIcon className="w-6 h-6 transform rotate-180" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition hover:bg-white/20 hover:scale-110"
//             >
//               <ArrowIcon className="w-6 h-6" />
//             </button>
//           </div>
//         </>
//       )}

//       {/* --------------------- MOBILE VIEW (The new, working version) ---------------------- */}
//       {isMobile && (
//         <div className="relative w-full h-0 pb-[56.25%]"> {/* Aspect ratio container */}
//           {/* Slides */}
//           {slides.map((slide, index) => (
//             <img
//               key={slide.title}
//               src={`${url}/uploads/${slide.mobileImage}`}
//               alt={`Slide ${slide.title}`}
//               className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
//                 index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
//               }`}
//             />
//           ))}

//           {/* Mobile Navigation */}
//           <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-between px-2">
//             <button
//               onClick={prevSlide}
//               className="p-2 rounded-full bg-black/25 text-white transition-opacity duration-300 hover:bg-black/40"
//             >
//               <ArrowIcon className="w-5 h-5 transform rotate-180" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="p-2 rounded-full bg-black/25 text-white transition-opacity duration-300 hover:bg-black/40"
//             >
//               <ArrowIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Hero;




import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../storeContext/StoreContext';

// Define the props for the Hero component, including the new onClick function
interface HeroProps {
  onClick?: () => void;
}

// --- Reusable Arrow Icon Component ---
const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// --- The Final Hero Component ---
const Hero: React.FC<HeroProps> = ({ onClick }) => {
  const { url, heroList } = useContext(StoreContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const slides = heroList || []; // Fallback to empty array

  // Debug: Log the slides data
  useEffect(() => {
    console.log('Slides data:', slides);
    console.log('Number of slides:', slides.length);
  }, [slides]);

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
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only start interval if we have more than one slide
    if (slides.length > 1) {
      console.log('Starting slideshow timer with', slides.length, 'slides');
      intervalRef.current = setInterval(() => {
        setCurrentSlideIndex(prev => {
          const nextIndex = (prev + 1) % slides.length;
          console.log('Auto-advancing from slide', prev, 'to slide', nextIndex);
          return nextIndex;
        });
      }, 7000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]); // Added slides.length to dependencies

  // Reset slide index if slides change
  useEffect(() => {
    if (currentSlideIndex >= slides.length && slides.length > 0) {
      setCurrentSlideIndex(0);
    }
  }, [slides.length, currentSlideIndex]);

  // --- Slide navigation functions ---
  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent event bubbling
    setCurrentSlideIndex((prev) => {
      const nextIndex = (prev + 1) % slides.length;
      console.log('Manual next: from slide', prev, 'to slide', nextIndex);
      return nextIndex;
    });
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent event bubbling
    setCurrentSlideIndex((prev) => {
      const nextIndex = (prev - 1 + slides.length) % slides.length;
      console.log('Manual prev: from slide', prev, 'to slide', nextIndex);
      return nextIndex;
    });
  };

  // Don't render if no slides
  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  return (
    <section
      onClick={onClick}
      className={`relative w-full overflow-hidden group ${
        isMobile ? 'mt-16' : 'h-[70vh] mt-[10vh]'
      }`}
    >
      {/* Debug info - remove in production */}
      {/* <div className="absolute top-2 left-2 z-50 bg-black/50 text-white p-2 text-xs">
        Slide: {currentSlideIndex + 1} / {slides.length}
      </div> */}

      {/* --------------------- DESKTOP VIEW ---------------------- */}
      {!isMobile && (
        <>
          {slides.map((slide, index) => (
            <div
              key={slide.title || slide.id || index} // More flexible key generation
              className="absolute inset-0 w-full h-[70vh] bg-[length:100%_100%] bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${url}/uploads/${slide.desktopImage})`,
                opacity: index === currentSlideIndex ? 1 : 0,
                transform: `scale(${index === currentSlideIndex ? 1 : 1.05})`,
                transition: 'opacity 1.5s ease-in-out, transform 10s ease-out',
              }}
            />
          ))}
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
        <div className="relative w-full h-0 pb-[56.25%]">
          {slides.map((slide, index) => (
            <img
              key={slide.title || slide.id || index}
              src={`${url}/uploads/${slide.mobileImage}`}
              alt={`Slide ${slide.title || index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
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