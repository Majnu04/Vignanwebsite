import { useEffect } from 'react';

/**
 * A hook that adds custom 3D effects to elements
 * @param selector CSS selector for the elements to apply the effect to
 * @param strength Strength of the effect (default: 25)
 */
export function use3DEffect(selector: string, strength: number = 25) {
  useEffect(() => {
    // Get all elements that match the selector
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    const handleMouseMove = (e: MouseEvent, element: Element) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / strength * -1;
      const rotateY = (x - centerX) / strength;

      (element as HTMLElement).style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      (element as HTMLElement).style.transition = 'transform 0.1s';
    };

    const handleMouseLeave = (element: Element) => {
      (element as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      (element as HTMLElement).style.transition = 'transform 0.5s';
    };

    // Add event listeners to each element
    elements.forEach((element) => {
      const mouseMoveHandler = (e: Event) => handleMouseMove(e as MouseEvent, element);
      const mouseLeaveHandler = () => handleMouseLeave(element);
      
      element.addEventListener('mousemove', mouseMoveHandler);
      element.addEventListener('mouseleave', mouseLeaveHandler);
      
      // Store the handlers on the element for cleanup
      (element as any)._3dEffectHandlers = {
        move: mouseMoveHandler,
        leave: mouseLeaveHandler
      };
    });

    // Clean up event listeners
    return () => {
      elements.forEach((element) => {
        if ((element as any)._3dEffectHandlers) {
          element.removeEventListener('mousemove', (element as any)._3dEffectHandlers.move);
          element.removeEventListener('mouseleave', (element as any)._3dEffectHandlers.leave);
        }
      });
    };
  }, [selector, strength]);
}

/**
 * A hook that adds parallax effect to background elements
 * @param selector CSS selector for the elements to apply the effect to
 * @param strength Strength of the effect (default: 40)
 */
export function useParallaxEffect(selector: string, strength: number = 40) {
  useEffect(() => {
    // Get all elements that match the selector
    const elements = document.querySelectorAll<HTMLElement>(selector);
    
    if (elements.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      elements.forEach((element) => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Check if element is in viewport
        if (
          scrollPosition + viewportHeight > elementTop && 
          scrollPosition < elementTop + elementHeight
        ) {
          const distance = scrollPosition - elementTop;
          const parallaxValue = distance / strength;
          
          element.style.transform = `translateY(${parallaxValue}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Call once to set initial positions
    handleScroll();

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selector, strength]);
}

/**
 * A hook that adds magnetic effect to elements
 * @param selector CSS selector for the elements to apply the effect to
 * @param distance Distance at which the effect activates (default: 100)
 * @param strength Strength of the magnetic pull (default: 0.4)
 */
export function useMagneticEffect(selector: string, distance: number = 100, strength: number = 0.4) {
  useEffect(() => {
    // Get all elements that match the selector
    const elements = document.querySelectorAll<HTMLElement>(selector);
    
    if (elements.length === 0) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        // Calculate distance between mouse and element center
        const deltaX = clientX - elementX;
        const deltaY = clientY - elementY;
        const elementDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        
        // Apply effect only if mouse is within the specified distance
        if (elementDistance < distance) {
          // Calculate the pull force (stronger when closer)
          const pull = 1 - elementDistance / distance;
          const moveX = deltaX * strength * pull;
          const moveY = deltaY * strength * pull;
          
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          element.style.transform = 'translate(0, 0)';
        }
      });
    };
    
    const handleMouseLeave = () => {
      elements.forEach((element) => {
        element.style.transform = 'translate(0, 0)';
        element.style.transition = 'transform 0.5s';
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [selector, distance, strength]);
}

/**
 * A hook that adds particle effects to elements
 * @param containerSelector CSS selector for the container element
 * @param particleCount Number of particles to create
 * @param colors Array of colors for the particles
 */
export function useParticleEffect(containerSelector: string, particleCount: number = 50, colors: string[] = ['#ffffff', '#f0f0f0', '#e0e0e0']) {
  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement;
    if (!container) return;
    
    // Create particle elements
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle-element');
      
      // Random styling
      const size = Math.random() * 6 + 1; // 1-7px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100; // 0-100%
      const top = Math.random() * 100; // 0-100%
      const animationDuration = Math.random() * 20 + 10; // 10-30s
      
      // Set styles
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.opacity = `${Math.random() * 0.6 + 0.1}`; // 0.1-0.7
      particle.style.pointerEvents = 'none';
      particle.style.animation = `float ${animationDuration}s infinite alternate ease-in-out`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);
    }
    
    // Clean up
    return () => {
      const particles = container.querySelectorAll('.particle-element');
      particles.forEach(particle => {
        container.removeChild(particle);
      });
    };
  }, [containerSelector, particleCount, colors.join()]);
}

/**
 * A hook that adds a text scramble animation effect
 * @param selector CSS selector for text elements
 * @param speed Speed of the scramble effect (ms)
 */
export function useTextScramble(selector: string, speed: number = 50) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    
    const chars = '!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    elements.forEach((element) => {
      const originalText = element.textContent || '';
      let iterations = 0;
      
      // Add a class to detect when element comes into view
      element.classList.add('scramble-text');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Start scrambling when element comes into view
            runScramble();
          }
        });
      });
      
      observer.observe(element);
      
      function runScramble() {
        const scramble = setInterval(() => {
          element.textContent = originalText
            .split('')
            .map((_, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
          
          if (iterations >= originalText.length) {
            clearInterval(scramble);
            element.textContent = originalText;
          }
          
          iterations += 1/3;
        }, speed);
      }
      
      // Clean up
      return () => {
        observer.disconnect();
      };
    });
  }, [selector, speed]);
}

export default {
  use3DEffect,
  useParallaxEffect,
  useMagneticEffect,
  useParticleEffect,
  useTextScramble
};
