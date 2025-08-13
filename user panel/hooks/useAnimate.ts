import { useEffect } from 'react';

/**
 * Hook to add custom animations to Tailwind CSS
 * This ensures the animations are available in the global CSS
 */
export const useAnimate = () => {
  useEffect(() => {
    // Inject custom animations into the document head
    const style = document.createElement('style');
    style.textContent = `
      @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
      }
      
      @keyframes pulse-light {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.2; }
      }
      
      @keyframes shimmer {
        100% { transform: translateX(100%); }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translate3d(0, 10px, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
      
      .animate-wiggle {
        animation: wiggle 0.5s ease-in-out;
      }
      
      .animate-pulse-light {
        animation: pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
      
      .animate-fadeInUp {
        animation: fadeInUp 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
};

export default useAnimate;
