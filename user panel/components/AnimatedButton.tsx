import React, { useRef, useState, useEffect } from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  withArrow?: boolean;
  withMagneticEffect?: boolean;
  withParticles?: boolean;
  disabled?: boolean;
}

/**
 * Advanced animated button component with multiple effects
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  withArrow = false,
  withMagneticEffect = false,
  withParticles = false,
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, color: string, life: number, opacity: number }>>([]);
  
  // Magnetic effect handling
  const magneticStrength = 0.4; // Adjust magnetic pull strength
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !withMagneticEffect || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance between mouse and button center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    
    // Apply magnetic effect within 100px radius
    if (distance < 100) {
      const magneticX = deltaX * magneticStrength;
      const magneticY = deltaY * magneticStrength;
      setButtonPosition({ x: magneticX, y: magneticY });
    } else {
      setButtonPosition({ x: 0, y: 0 });
    }
  };
  
  const resetPosition = () => {
    setButtonPosition({ x: 0, y: 0 });
  };
  
  // Particles effect
  useEffect(() => {
    if (!withParticles || !isHovered) return;
    
    const createParticle = () => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];
      
      // Create random particles around the button
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * rect.width,
        y: rect.height,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1, // Life from 0 to 1
        opacity: Math.random() * 0.5 + 0.5,
      };
      
      setParticles(prev => [...prev, newParticle]);
    };
    
    // Create particles at intervals
    const interval = setInterval(createParticle, 100);
    
    // Animate particles
    const animation = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            y: particle.y - 2,
            x: particle.x + (Math.random() - 0.5) * 2,
            life: particle.life - 0.02,
            opacity: particle.opacity - 0.02,
          }))
          .filter(particle => particle.life > 0)
      );
    }, 50);
    
    return () => {
      clearInterval(interval);
      clearInterval(animation);
      setParticles([]);
    };
  }, [isHovered, withParticles]);
  
  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/30';
      case 'secondary':
        return 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow';
      case 'tertiary':
        return 'bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700';
      case 'outline':
        return 'bg-transparent border-2 border-blue-500 text-blue-600 hover:bg-blue-50';
      default:
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg';
    }
  };
  
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-sm';
      case 'md':
        return 'py-2.5 px-5 text-base';
      case 'lg':
        return 'py-3 px-7 text-lg';
      default:
        return 'py-2.5 px-5 text-base';
    }
  };
  
  const ButtonTag = href ? 'a' : 'button';
  
  return (
    <div 
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
    >
      <ButtonTag
        ref={buttonRef as any}
        className={`
          relative
          flex items-center justify-center
          rounded-lg
          transition-all duration-300
          overflow-hidden
          ${getSizeClasses()}
          ${getVariantClasses()}
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        style={{
          transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
        }}
        onClick={disabled ? undefined : onClick}
        href={disabled ? undefined : href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
      >
        {/* Shine effect overlay */}
        <span className="absolute inset-0 w-full h-full">
          <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-out opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full" />
        </span>
        
        {/* Button content */}
        <span className="relative flex items-center gap-2">
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          {children}
          {(withArrow || (icon && iconPosition === 'right')) && (
            <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`}>
              {withArrow ? <ArrowRightIcon className="w-4 h-4" /> : icon}
            </span>
          )}
        </span>
        
        {/* Particles */}
        {withParticles && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  left: `${particle.x}px`,
                  bottom: `${particle.y}px`,
                  opacity: particle.opacity,
                }}
              />
            ))}
          </div>
        )}
      </ButtonTag>
    </div>
  );
};

export default AnimatedButton;
