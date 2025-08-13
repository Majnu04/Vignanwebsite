/**
 * Animation utility functions for consistent animations across the website
 */

/**
 * Easing functions for smooth animations
 */
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInElastic: (t: number) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI),
  easeOutElastic: (t: number) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1,
};

/**
 * Animation presets for common element animations
 */
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  scaleInBounce: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, type: 'spring', stiffness: 200, damping: 15 }
  },
  pop: {
    initial: { scale: 0.9 },
    animate: { scale: [0.9, 1.05, 1] },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

/**
 * Animation variants for staggered animations
 * @param staggerTime Time between each child animation
 */
export const staggeredVariants = (staggerTime = 0.1) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime
    }
  }
});

/**
 * Pulse animation for drawing attention to elements
 * @param scale Maximum scale factor
 * @param duration Duration of one pulse cycle in seconds
 */
export const pulseAnimation = (scale = 1.05, duration = 2) => ({
  animation: `pulse ${duration}s infinite ease-in-out`,
  style: {
    animationKeyframes: `
      0% { transform: scale(1); }
      50% { transform: scale(${scale}); }
      100% { transform: scale(1); }
    `
  }
});

/**
 * Shimmer animation for loading states or drawing attention
 * @param duration Duration of one shimmer cycle in seconds
 */
export const shimmerAnimation = (duration = 2) => ({
  animation: `shimmer ${duration}s infinite linear`,
  style: {
    backgroundSize: '200% 100%',
    backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)`,
  }
});

/**
 * Apply scroll-triggered animations to elements
 * @param element DOM element to observe
 * @param animationClass CSS class to add when element is visible
 * @param threshold Visibility threshold (0-1)
 */
export const createScrollAnimation = (
  element: HTMLElement | null,
  animationClass: string = 'visible',
  threshold: number = 0.2
) => {
  if (!element || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          // Stop observing after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
};

/**
 * Apply staggered scroll animations to multiple elements
 * @param elements Array of DOM elements or NodeList
 * @param animationClass CSS class to add when element is visible
 * @param threshold Visibility threshold (0-1)
 * @param delay Delay between each staggered animation in milliseconds
 */
export const createStaggeredScrollAnimation = (
  elements: HTMLElement[] | NodeListOf<HTMLElement> | null,
  animationClass: string = 'visible',
  threshold: number = 0.2,
  delay: number = 100
) => {
  if (!elements || elements.length === 0 || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(animationClass);
          }, index * delay);
          
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );
  
  Array.from(elements).forEach((element) => {
    observer.observe(element);
  });
  
  return () => {
    observer.disconnect();
  };
};

/**
 * Helper function to create a typed animation sequence
 * @param element DOM element to animate (usually a text element)
 * @param text Text to type
 * @param speed Typing speed in ms per character
 * @param startDelay Delay before typing starts in ms
 * @param onComplete Callback when animation completes
 */
export const createTypedTextAnimation = (
  element: HTMLElement | null,
  text: string,
  speed: number = 50,
  startDelay: number = 0,
  onComplete?: () => void
) => {
  if (!element) return;
  
  let index = 0;
  element.textContent = '';
  
  return setTimeout(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
    
    return () => {
      clearInterval(interval);
    };
  }, startDelay);
};

export default {
  easings,
  animationPresets,
  staggeredVariants,
  pulseAnimation,
  shimmerAnimation,
  createScrollAnimation,
  createStaggeredScrollAnimation,
  createTypedTextAnimation
};
