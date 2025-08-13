import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  rotateStrength?: number;
  glareEnabled?: boolean;
  glareMaxOpacity?: number;
  perspective?: number;
}

/**
 * An interactive 3D card component with tilt effect and optional glare
 */
export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  rotateStrength = 25,
  glareEnabled = true,
  glareMaxOpacity = 0.5,
  perspective = 1000,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * rotateStrength;
    const rotateX = -((y - centerY) / centerY) * rotateStrength;
    
    // Apply transform to the card
    card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Handle glare effect
    if (glareEnabled && glareRef.current) {
      const glare = glareRef.current;
      // Calculate glare position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareMaxOpacity}), transparent)`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.1s';
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s ease';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
      {glareEnabled && (
        <div 
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-10 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}
    </div>
  );
};

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'border' | 'none';
}

/**
 * A card component with various hover effects
 */
export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = '',
  hoverEffect = 'lift'
}) => {
  const effectClasses = {
    lift: 'transition-all duration-300 hover:-translate-y-2 hover:shadow-lg',
    scale: 'transition-transform duration-300 hover:scale-[1.03]',
    glow: 'transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    border: 'transition-all duration-300 hover:border-blue-500 border-2 border-transparent',
    none: ''
  };

  return (
    <div className={`${effectClasses[hoverEffect]} ${className}`}>
      {children}
    </div>
  );
};

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  borderWidth?: number;
  duration?: number;
}

/**
 * A component with an animated border effect
 */
export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  className = '',
  borderColor = 'rgba(59, 130, 246, 0.6)',
  borderWidth = 2,
  duration = 2
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">{children}</div>
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, ${borderColor} 50%, transparent 50%) repeat-x,
            linear-gradient(90deg, ${borderColor} 50%, transparent 50%) repeat-x,
            linear-gradient(0deg, ${borderColor} 50%, transparent 50%) repeat-y,
            linear-gradient(0deg, ${borderColor} 50%, transparent 50%) repeat-y
          `,
          backgroundSize: `
            20px ${borderWidth}px,
            20px ${borderWidth}px,
            ${borderWidth}px 20px,
            ${borderWidth}px 20px
          `,
          backgroundPosition: `
            0 0,
            0 100%,
            0 0,
            100% 0
          `,
          animation: `
            borderAnimation ${duration}s infinite linear,
            borderAnimation2 ${duration}s infinite linear,
            borderAnimation3 ${duration}s infinite linear,
            borderAnimation4 ${duration}s infinite linear
          `
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes borderAnimation {
          from { background-position-x: 0, 0, 0, 100%; }
          to { background-position-x: 100%, 100%, 0, 100%; }
        }
        @keyframes borderAnimation2 {
          from { background-position-x: 0, 0, 0, 100%; }
          to { background-position-x: 100%, 100%, 0, 100%; }
        }
        @keyframes borderAnimation3 {
          from { background-position-y: 0, 100%, 0, 0; }
          to { background-position-y: 100%, 0, 0, 0; }
        }
        @keyframes borderAnimation4 {
          from { background-position-y: 0, 100%, 100%, 0; }
          to { background-position-y: 100%, 0, 0, 100%; }
        }
      ` }} />
    </div>
  );
};

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
  duration?: number;
}

/**
 * A component for text with gradient effects
 */
export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  gradient = 'from-blue-500 via-purple-500 to-pink-500',
  animate = false,
  duration = 3
}) => {
  return (
    <span 
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      style={animate ? {
        backgroundSize: '200% auto',
        animation: `shimmerAnimation ${duration}s linear infinite`
      } : {}}
    >
      {children}
      {animate && (
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmerAnimation {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        ` }} />
      )}
    </span>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

/**
 * A component that creates a floating animation effect
 */
export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  amplitude = 10,
  duration = 3,
  delay = 0
}) => {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-${amplitude}px); }
          100% { transform: translateY(0px); }
        }
      ` }} />
    </div>
  );
};

export default {
  Card3D,
  HoverCard,
  AnimatedBorder,
  GradientText,
  FloatingElement
};
