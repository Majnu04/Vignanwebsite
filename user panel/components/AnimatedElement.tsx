import React, { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

// Animation types
export type AnimationType = 
  | 'fade-in' 
  | 'slide-up' 
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'flip'
  | 'bounce';

interface AnimatedElementProps {
  children: ReactNode;
  animation: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation,
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const [ref, isInView] = useInView({
    triggerOnce,
    threshold,
  });

  // Base animation styles
  const baseStyles = {
    opacity: 0,
    transition: `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  };

  // Animation specific styles
  const getAnimationStyles = (type: AnimationType, visible: boolean) => {
    if (!visible) {
      switch (type) {
        case 'fade-in':
          return { opacity: 0 };
        case 'slide-up':
          return { opacity: 0, transform: 'translateY(50px)' };
        case 'slide-down':
          return { opacity: 0, transform: 'translateY(-50px)' };
        case 'slide-left':
          return { opacity: 0, transform: 'translateX(50px)' };
        case 'slide-right':
          return { opacity: 0, transform: 'translateX(-50px)' };
        case 'zoom-in':
          return { opacity: 0, transform: 'scale(0.9)' };
        case 'flip':
          return { opacity: 0, transform: 'perspective(400px) rotateX(90deg)' };
        case 'bounce':
          return { opacity: 0, transform: 'translateY(20px)' };
        default:
          return { opacity: 0 };
      }
    }
    
    return {
      opacity: 1,
      transform: 'none',
    };
  };

  const animationStyles = {
    ...baseStyles,
    ...getAnimationStyles(animation, isInView),
  };

  return (
    <div ref={ref} className={className} style={animationStyles}>
      {children}
    </div>
  );
};
