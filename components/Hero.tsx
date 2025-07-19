
import React, { useState, useEffect, useRef } from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

// Updated with reliable image sources and more detailed content
const slides = [
    {
        id: 1,
        title: "Admissions Open for 2025",
        subtitle: "Join a community of innovators and leaders. Your journey to excellence starts at Vignan.",
        backgroundImage: "/images/SLIDE_0.jpg",
        overlayColor: "from-blue-900/80 via-blue-800/60 to-transparent",
        badge: "Admissions",
        cta1_text: "Apply Now",
        cta2_text: "View Programs",
    },
    {
        id: 2,
        title: "Innovision 2025",
        subtitle: "Our annual National Tech Symposium is back! Get ready for a confluence of ideas, innovation, and technology.",
        backgroundImage: "/images/SLIDE_A copy.jpg",
        overlayColor: "from-indigo-900/80 via-indigo-800/60 to-transparent",
        badge: "Event",
        cta1_text: "Register Here",
        cta2_text: "Learn More",
    },
    {
        id: 3,
        title: "Celebrating Excellence",
        subtitle: "Ranked among the top engineering institutions by NIRF, with NAAC A+ accreditation. A testament to our commitment to quality education.",
        backgroundImage: "/images/excellence-1.svg",
        overlayColor: "from-emerald-900/80 via-emerald-800/60 to-transparent",
        badge: "Recognition",
        cta1_text: "View Rankings",
        cta2_text: "About Us",
    },
    {
        id: 4,
        title: "World-Class Infrastructure",
        subtitle: "Experience learning in state-of-the-art laboratories, modern classrooms, and a sprawling green campus designed for holistic development.",
        backgroundImage: "/images/infrastructure-1.svg",
        overlayColor: "from-purple-900/80 via-purple-800/60 to-transparent",
        badge: "Campus",
        cta1_text: "Virtual Tour",
        cta2_text: "Explore Facilities",
    },
];

// Add custom animation keyframes
const keyframes = `
@keyframes slideUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  0% { opacity: 0; transform: translateX(-30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes scaleUp {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes shine {
  0% { background-position: -100%; }
  100% { background-position: 200%; }
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes rotateIn {
  0% { opacity: 0; transform: rotate(-90deg) scale(0.3); }
  100% { opacity: 1; transform: rotate(0) scale(1); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-slideUp {
  animation: slideUp 0.8s ease forwards;
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease forwards;
}

.animate-slideInRight {
  animation: slideInRight 0.8s ease forwards;
}

.animate-fadeIn {
  animation: fadeIn 1s ease forwards;
}

.animate-scaleUp {
  animation: scaleUp 0.8s ease forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-custom {
  animation: pulse 3s ease-in-out infinite;
}

.animate-rotateIn {
  animation: rotateIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-shine {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  background-size: 200% 100%;
  animation: shine 3s infinite;
}

.animate-gradient {
  background: linear-gradient(270deg, #4facfe, #00f2fe, #0078ff, #00c6ff);
  background-size: 300% 300%;
  animation: gradientMove 8s ease infinite;
}
`;

const Hero: React.FC = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startSlider = () => {
        // Setup interval for changing slides
        const duration = 7000; // 7 seconds per slide
        intervalRef.current = setInterval(() => {
            changeSlide((currentSlideIndex + 1) % slides.length);
        }, duration);
    };

    const changeSlide = (newIndex: number) => {
        setIsChanging(true);
        setTimeout(() => {
            setCurrentSlideIndex(newIndex);
            setIsChanging(false);
        }, 300); // Match with transition duration
    };

    useEffect(() => {
        startSlider();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentSlideIndex]);
    
    // Slide navigation removed


    // Add the keyframes style to the document
    useEffect(() => {
        // Add keyframes to head
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <section className="relative h-screen text-white flex items-center overflow-hidden">
            {/* Particle Background Effect */}
            <div className="particle-container absolute inset-0 z-10 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute rounded-full bg-white/30"
                        style={{
                            width: `${Math.random() * 5 + 1}px`,
                            height: `${Math.random() * 5 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5,
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>
            {/* Background Images with Advanced Animations */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-1500 ${
                        index === currentSlideIndex 
                            ? 'opacity-100 scale-100 rotate-0' 
                            : 'opacity-0 scale-110 rotate-1'
                    }`}
                    style={{ 
                        backgroundImage: `url('${slide.backgroundImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        transformOrigin: 'center',
                        transitionTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    }}
                >
                    {/* Customized overlay gradient with animation */}
                    <div 
                        className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor} transition-opacity duration-2000 ${
                            index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    ></div>
                    
                    {/* Dynamic pattern overlay */}
                    <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-10"></div>
                    
                    {/* Improved parallax effect layer */}
                    <div 
                        className={`absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-[3000ms] ease-out ${
                            index === currentSlideIndex ? 'translate-y-[-10px]' : 'translate-y-0'
                        }`} 
                        style={{ 
                            backgroundImage: `url('${slide.backgroundImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.1,
                            filter: 'blur(5px)',
                        }}
                    ></div>
                    
                    {/* Light rays effect */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-50 ${
                        index === currentSlideIndex ? 'animate-pulse-custom' : ''
                    }`}></div>
                </div>
            ))}
            
            {/* Progress bar removed */}
            
            {/* Enhanced floating decorative elements with advanced shapes */}
            {/* Circle */}
            <div className="absolute right-10 top-1/4 w-24 h-24 rounded-full border-2 border-white/20 animate-float opacity-70 backdrop-blur-sm">
                {/* Inner circle */}
                <div className="absolute inset-2 rounded-full border border-white/40 animate-pulse-custom"></div>
            </div>
            
            {/* Square */}
            <div className="absolute left-20 bottom-1/4 w-16 h-16 border border-white/20 animate-float opacity-70 backdrop-blur-sm rotate-45" 
                style={{animationDelay: '1s'}}>
                {/* Inner square */}
                <div className="absolute inset-2 border border-white/30"></div>
            </div>
            
            {/* Hexagon shape using clip-path */}
            <div className="absolute right-1/4 bottom-1/3 w-20 h-20 border border-white/20 animate-float opacity-70 backdrop-blur-sm"
                style={{
                    animationDelay: '2s',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            </div>
            
            {/* Triangle shape using clip-path */}
            <div className="absolute left-1/4 top-1/3 w-16 h-16 border border-white/20 animate-float opacity-70 backdrop-blur-sm"
                style={{
                    animationDelay: '1.5s',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                }}>
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent animate-pulse-custom"></div>
            </div>
            
            {/* Rotating element */}
            <div className="absolute right-1/3 top-1/5 w-12 h-12 border-2 border-white/30 opacity-60 rounded-md"
                style={{
                    animation: 'float 4s ease-in-out infinite, spin 8s linear infinite',
                }}>
            </div>
            
            {/* Text Content with Enhanced Animations */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-3xl text-left">
                    <div key={currentSlideIndex} className={`transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
                        {/* Enhanced Badge with glow effect */}
                        <div className="inline-block mb-6 animate-slideInLeft" style={{animationDelay: '200ms'}}>
                            <span className="px-5 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center space-x-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                <span className="relative">
                                    {slides[currentSlideIndex].badge}
                                    <span className="absolute inset-0 animate-shine"></span>
                                </span>
                            </span>
                        </div>
                        
                        {/* Enhanced Title with gradient text and 3D effect */}
                        <div className="overflow-hidden mb-6 relative">
                            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight animate-slideUp relative z-10" 
                                style={{
                                    animationDelay: '300ms',
                                    textShadow: '0 5px 15px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.5)'
                                }}>
                                {/* Text with gradient */}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                                    {slides[currentSlideIndex].title}
                                </span>
                                
                                {/* Subtle 3D layer */}
                                <span className="absolute -bottom-1.5 left-0.5 text-blue-900/10 z-[-1] blur-[1px] select-none">
                                    {slides[currentSlideIndex].title}
                                </span>
                                
                                {/* Shine effect overlay */}
                                <span className="absolute inset-0 animate-shine"></span>
                            </h1>
                            
                            {/* Accent line */}
                            <div className="h-1 w-24 mt-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-scaleUp" style={{animationDelay: '400ms'}}></div>
                        </div>
                        
                        {/* Enhanced Subtitle with animated background */}
                        <div className="overflow-hidden mb-10 relative">
                            <p className="text-lg md:text-xl text-white max-w-2xl animate-slideUp backdrop-blur-sm inline px-3 py-2 rounded-md bg-white/5" 
                               style={{
                                   animationDelay: '500ms',
                                   textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                               }}>
                                {slides[currentSlideIndex].subtitle}
                                
                                {/* Subtle typing cursor effect */}
                                <span className="inline-block w-0.5 h-5 bg-white/70 ml-1 align-middle animate-pulse-custom"></span>
                            </p>
                            
                            {/* Decorative dots */}
                            <div className="absolute -left-6 top-1/2 flex space-x-1 opacity-50">
                                <div className="w-1 h-1 rounded-full bg-white animate-pulse-custom"></div>
                                <div className="w-1 h-1 rounded-full bg-white animate-pulse-custom" style={{animationDelay: '300ms'}}></div>
                                <div className="w-1 h-1 rounded-full bg-white animate-pulse-custom" style={{animationDelay: '600ms'}}></div>
                            </div>
                        </div>

                    {/* Manual Slide Navigation - Side Buttons */}
                    {/* Perfectly styled manual slide navigation buttons */}
                    <button
                      onClick={() => changeSlide((currentSlideIndex - 1 + slides.length) % slides.length)}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg text-3xl text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-primary-600/80 hover:scale-110 focus:outline-none"
                      style={{transitionProperty: 'opacity'}}
                      disabled={isChanging}
                      aria-label="Previous Slide"
                    >
                      <span className="pointer-events-none select-none">&#8592;</span>
                    </button>
                    <button
                      onClick={() => changeSlide((currentSlideIndex + 1) % slides.length)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg text-3xl text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-primary-600/80 hover:scale-110 focus:outline-none"
                      style={{transitionProperty: 'opacity'}}
                      disabled={isChanging}
                      aria-label="Next Slide"
                    >
                      <span className="pointer-events-none select-none">&#8594;</span>
                    </button>
                        
                        {/* CTA Buttons with spectacular animations */}
                        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 animate-slideUp" style={{animationDelay: '700ms'}}>
                            {/* Primary CTA with gradient, glow and particles effect */}
                            <a 
                                href="#" 
                                className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-500 group shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                            >
                                {/* Animated gradient background */}
                                <span className="absolute inset-0 animate-gradient"></span>
                                
                                {/* Shine overlay */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                                
                                {/* Glow effect */}
                                <span className="absolute inset-0 rounded-full blur-md bg-blue-400/20 group-hover:bg-blue-400/30 transition-colors duration-500"></span>
                                
                                {/* Content */}
                                <span className="relative z-10 flex items-center font-extrabold text-white tracking-wide">
                                    {slides[currentSlideIndex].cta1_text}
                                    <span className="relative ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                                        <ArrowRightIcon className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </span>
                                
                                {/* Particle dots on hover */}
                                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></span>
                                <span className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></span>
                                <span className="absolute top-2/4 right-1/3 w-1 h-1 rounded-full bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"></span>
                            </a>
                            
                            {/* Secondary CTA with glass effect */}
                            <a 
                                href="#" 
                                className="relative inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold transition-all duration-500 text-lg transform hover:scale-105 border border-white/20 group overflow-hidden"
                            >
                                {/* Glass highlight effect */}
                                <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                
                                {/* Border glow on hover */}
                                <span className="absolute inset-0 -m-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                                      style={{
                                          background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0))',
                                      }}></span>
                                
                                {/* Content */}
                                <span className="relative z-10 flex items-center space-x-2">
                                    {/* Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                    <span>{slides[currentSlideIndex].cta2_text}</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation controls removed */}
        </section>
    );
};

export default Hero;