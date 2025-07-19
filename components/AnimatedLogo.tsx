
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

interface AnimatedLogoProps {
  isScrolled: boolean;
  logoSize?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ isScrolled, logoSize }) => {
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
      <img 
        src="/images/LOGO_AAA copy.png" 
        alt="Vignan College Logo"
        width={logoSize ? logoSize : (isScrolled ? 40 : 56)} 
        height={logoSize ? logoSize : (isScrolled ? 40 : 56)}
        className="logo-rotate-in transition-all duration-500"
        style={{
          filter: !isScrolled ? "drop-shadow(0 0 4px rgba(255, 255, 255, 0.7))" : "none"
        }}
      />
    </div>
  );
};

export default AnimatedLogo;
