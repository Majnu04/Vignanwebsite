
import React, { useState, useEffect, useRef } from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

// Updated with reliable image sources and more detailed content
const slides = [
    {
        id: 1,
        title: "Admissions Open for 2025",
        subtitle: "Join a community of innovators and leaders. Your journey to excellence starts at Vignan.",
        backgroundImage: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1600",
        overlayColor: "from-blue-900/80 via-blue-800/60 to-transparent",
        badge: "Admissions",
        cta1_text: "Apply Now",
        cta2_text: "View Programs",
    },
    {
        id: 2,
        title: "Innovision 2025",
        subtitle: "Our annual National Tech Symposium is back! Get ready for a confluence of ideas, innovation, and technology.",
        backgroundImage: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1600",
        overlayColor: "from-indigo-900/80 via-indigo-800/60 to-transparent",
        badge: "Event",
        cta1_text: "Register Here",
        cta2_text: "Learn More",
    },
    {
        id: 3,
        title: "Celebrating Excellence",
        subtitle: "Ranked among the top engineering institutions by NIRF, with NAAC A+ accreditation. A testament to our commitment to quality education.",
        backgroundImage: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600",
        overlayColor: "from-emerald-900/80 via-emerald-800/60 to-transparent",
        badge: "Recognition",
        cta1_text: "View Rankings",
        cta2_text: "About Us",
    },
    {
        id: 4,
        title: "World-Class Infrastructure",
        subtitle: "Experience learning in state-of-the-art laboratories, modern classrooms, and a sprawling green campus designed for holistic development.",
        backgroundImage: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    const progressRef = useRef<HTMLDivElement>(null);
    const [slideProgress, setSlideProgress] = useState(0);

    const startSlider = () => {
        // Reset progress
        setSlideProgress(0);
        
        // Create slide progress animation
        const startTime = Date.now();
        const duration = 7000; // 7 seconds per slide
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration * 100, 100);
            setSlideProgress(progress);
            
            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            }
        };
        
        requestAnimationFrame(updateProgress);
        
        // Setup interval for changing slides
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
    
    const goToSlide = (slideIndex: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        changeSlide(slideIndex);
    };


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
        <section className="relative h-[90vh] text-white flex items-center overflow-hidden">
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
                    <div className="absolute inset-0 bg-[url('https://assets.codepen.io/721952/noise.png')] opacity-10"></div>
                    
                    {/* Parallax effect layer */}
                    <div 
                        className={`absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-[3000ms] ease-out ${
                            index === currentSlideIndex ? 'translate-y-[-20px]' : 'translate-y-0'
                        }`} 
                        style={{ 
                            backgroundImage: `url('${slide.backgroundImage}')`,
                            opacity: 0.15,
                            filter: 'blur(10px)',
                        }}
                    ></div>
                    
                    {/* Light rays effect */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-50 ${
                        index === currentSlideIndex ? 'animate-pulse-custom' : ''
                    }`}></div>
                </div>
            ))}
            
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                <div 
                    ref={progressRef}
                    className="h-full bg-white transition-all duration-200 ease-linear"
                    style={{ width: `${slideProgress}%` }}
                ></div>
            </div>
            
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

            {/* Spectacular Navigation Controls with advanced effects */}
            <div className="absolute bottom-12 left-0 right-0 z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Enhanced Slide number indicator with futuristic design */}
                        <div className="hidden md:flex items-center animate-slideInLeft" style={{animationDelay: '1000ms'}}>
                            <div className="relative">
                                {/* Background blur effect */}
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-lg -m-1 z-0"></div>
                                
                                {/* Digital counter style */}
                                <div className="relative z-10 flex items-center space-x-2 bg-gradient-to-b from-white/10 to-white/5 px-4 py-2 rounded-lg border border-white/10">
                                    {/* Current slide */}
                                    <div className="relative">
                                        <span className="text-4xl font-black text-white">{String(currentSlideIndex + 1).padStart(2, '0')}</span>
                                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400 animate-pulse-custom"></span>
                                    </div>
                                    
                                    {/* Divider with animation */}
                                    <div className="h-8 w-0.5 bg-white/20 mx-2 relative">
                                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-white/40 to-transparent animate-pulse-custom" style={{animationDelay: '500ms'}}></div>
                                    </div>
                                    
                                    {/* Total slides */}
                                    <span className="text-2xl text-white/50 font-medium">{String(slides.length).padStart(2, '0')}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Center Controls with futuristic glass panel */}
                        <div className="relative flex items-center space-x-3 sm:space-x-4 mx-auto md:mx-0">
                            {/* Background blur effect */}
                            <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-2xl -m-2 z-0"></div>
                            
                            {/* Controls with relative positioning */}
                            <div className="relative z-10 flex items-center space-x-3 sm:space-x-4 px-1">
                                {/* Previous Button with hover effects */}
                                <button 
                                    onClick={() => goToSlide((currentSlideIndex - 1 + slides.length) % slides.length)}
                                    className="relative p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all duration-300 group overflow-hidden shadow-lg shadow-black/10"
                                    aria-label="Previous slide"
                                >
                                    {/* Glow effect on hover */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    
                                    {/* Arrow icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:scale-110 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                
                                {/* Advanced Slide Indicators with interactive preview */}
                                <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-white/20 shadow-lg shadow-black/10">
                                    {slides.map((slide, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className="group relative mx-1.5 sm:mx-2.5"
                                            aria-label={`Go to slide ${index + 1}`}
                                        >
                                            {/* Slide indicator with enhanced animations */}
                                            <div className="relative">
                                                {/* Base indicator */}
                                                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                                                    index === currentSlideIndex 
                                                        ? 'bg-gradient-to-r from-blue-400 to-blue-300 scale-125 shadow-lg shadow-blue-400/30' 
                                                        : 'bg-white/40 hover:bg-white/70'
                                                }`}>
                                                </div>
                                                
                                                {/* Active indicator animations */}
                                                {index === currentSlideIndex && (
                                                    <>
                                                        {/* Pulse ring */}
                                                        <span className="absolute -inset-2 rounded-full border border-blue-300/50 animate-ping opacity-75"></span>
                                                        
                                                        {/* Glow effect */}
                                                        <span className="absolute -inset-3 rounded-full bg-blue-400/20 blur-sm animate-pulse-custom"></span>
                                                    </>
                                                )}
                                            </div>
                                            
                                            {/* Enhanced tooltip with preview */}
                                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none z-50 transform-gpu">
                                                <div className="bg-black/80 backdrop-blur-md text-white text-xs rounded-lg shadow-xl overflow-hidden w-40">
                                                    {/* Preview image */}
                                                    <div className="h-16 bg-cover bg-center border-b border-white/10" style={{backgroundImage: `url('${slide.backgroundImage}')`}}>
                                                        <div className={`h-full bg-gradient-to-r ${slide.overlayColor} bg-opacity-50`}></div>
                                                    </div>
                                                    
                                                    {/* Title */}
                                                    <div className="px-3 py-2">
                                                        <p className="font-medium">{slide.title}</p>
                                                    </div>
                                                    
                                                    {/* Triangle pointer */}
                                                    <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Next Button with hover effects */}
                                <button 
                                    onClick={() => goToSlide((currentSlideIndex + 1) % slides.length)}
                                    className="relative p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all duration-300 group overflow-hidden shadow-lg shadow-black/10"
                                    aria-label="Next slide"
                                >
                                    {/* Glow effect on hover */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    
                                    {/* Arrow icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:scale-110 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        {/* Enhanced Social Links with hover animations */}
                        <div className="hidden md:flex items-center space-x-4 animate-slideInRight" style={{animationDelay: '1000ms'}}>
                            {[
                                { name: 'facebook', icon: 'M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z' },
                                { name: 'twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                                { name: 'instagram', icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
                                { name: 'linkedin', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
                            ].map(platform => (
                                <a 
                                    key={platform.name} 
                                    href="#" 
                                    className="group text-white/60 hover:text-white transition-all duration-500 relative"
                                    aria-label={`Follow us on ${platform.name}`}
                                >
                                    {/* Futuristic social icon with animated background */}
                                    <span className="relative w-10 h-10 flex items-center justify-center rounded-full border border-white/20 group-hover:border-white/50 transition-all duration-300 overflow-hidden">
                                        {/* Animated background on hover */}
                                        <span className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                        
                                        {/* Glowing dot */}
                                        <span className="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        
                                        {/* Icon */}
                                        <svg className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                                            <path d={platform.icon} />
                                        </svg>
                                    </span>
                                    
                                    {/* Animated dot under icon */}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;