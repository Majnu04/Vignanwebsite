
import React, { useEffect } from 'react';

// Custom animation keyframes for hero page shine effect
const logoKeyframes = `
@keyframes hero-shine {
  0% {
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.6)) brightness(1);
  }
  25% {
    filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)) brightness(1.15);
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.9)) brightness(1.2);
  }
  75% {
    filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)) brightness(1.15);
  }
  100% {
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.6)) brightness(1);
  }
}

.logo-hero-shine {
  animation: hero-shine 5s ease-in-out infinite;
}

.logo-standard {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
  transition: transform 0.5s ease-out;
}

.logo-standard:hover {
  transform: scale(1.03);
}
`;

interface AnimatedLogoProps {
  isScrolled: boolean;
  logoSize?: number;
  isHero?: boolean;
  onClick?: () => void;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ isScrolled, logoSize, isHero = false, onClick }) => {
  useEffect(() => {
    // Add the keyframes to the document head
    const style = document.createElement('style');
    style.innerHTML = logoKeyframes;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Determine logo size based on context
  const finalLogoSize = logoSize ? logoSize : (isHero ? 180 : (isScrolled ? 80 : 120));
  
  return (
    <div 
      className={`transition-all duration-300 ${isHero ? 'transform-gpu' : ''} ${onClick ? 'cursor-pointer' : ''}`} 
      onClick={onClick}
    >
      <img 
        src="/images/LOGO_AAA copy.png" 
        alt="Vignan College Logo"
        width={finalLogoSize} 
        height={finalLogoSize}
        className={`
          transition-all duration-500
          ${isHero ? 'logo-hero-shine' : 'logo-standard'}
        `}
        style={{
          objectFit: "contain",
          maxWidth: "100%"
        }}
      />
    </div>
  );
};

export default AnimatedLogo;
