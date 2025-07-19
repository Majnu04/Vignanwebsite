
import React, { useEffect } from 'react';

// Custom animation keyframes
const logoKeyframes = `
@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7)); }
  50% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.9)); }
}

@keyframes draw-path {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}

@keyframes rotate-in {
  0% { transform: rotate(-90deg) scale(0.5); opacity: 0; }
  100% { transform: rotate(0) scale(1); opacity: 1; }
}

@keyframes float-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.logo-float {
  animation: float-subtle 3s ease-in-out infinite;
}

.logo-pulse {
  animation: pulse-glow 3s ease-in-out infinite;
}

.logo-path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw-path 1.5s ease-out forwards;
}

.logo-rotate-in {
  animation: rotate-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  transform-origin: center;
}
`;

const AnimatedLogo: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  useEffect(() => {
    // Add the keyframes to the document head
    const style = document.createElement('style');
    style.innerHTML = logoKeyframes;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`logo-float transition-all duration-300 ${!isScrolled && 'logo-pulse'}`}>
      <svg
        width={isScrolled ? "38" : "48"}
        height={isScrolled ? "38" : "48"}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-rotate-in transition-all duration-500"
      >
        {/* Background Circle */}
        <circle 
          cx="26" 
          cy="26" 
          r="26" 
          className={`transition-all duration-500 ${
            isScrolled ? 'fill-blue-800' : 'fill-white'
          }`}
        />
        
        {/* Inner Circle (Glowing Effect) */}
        <circle 
          cx="26" 
          cy="26" 
          r="22" 
          strokeWidth="1"
          className={`transition-all duration-500 ${
            isScrolled 
              ? 'stroke-blue-400/30 fill-blue-800' 
              : 'stroke-white/60 fill-white'
          }`}
        />
        
        {/* V Letter */}
        <path
          d="M15 19L26 35L37 19"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`logo-path transition-colors duration-500 ${
            isScrolled ? 'stroke-white' : 'stroke-blue-800'
          }`}
        />
        
        {/* Decorative Dot */}
        <circle 
          cx="26" 
          cy="16" 
          r="2.5" 
          className={`transition-all duration-500 ${
            isScrolled ? 'fill-white' : 'fill-blue-800'
          }`}
        />
      </svg>
    </div>
  );
};

export default AnimatedLogo;
