/**
 * Global CSS for advanced animations
 * 
 * Make sure to include the animations.css file in your project
 */

/**
 * Animation config for the website
 */
export const animationConfig = {
  // Timing settings for animations
  timing: {
    fast: 0.3, // seconds
    medium: 0.6,
    slow: 0.9,
    extraSlow: 1.5
  },
  
  // Easing functions for smoother animations
  easing: {
    default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  
  // Animation durations for specific components
  durations: {
    heroReveal: 0.8,
    cardHover: 0.3,
    buttonHover: 0.2,
    pageTransition: 0.5,
    scrollAnimation: 0.6,
    featureReveal: 0.7
  },
  
  // Delay times for staggered animations
  delays: {
    staggered: 0.1,
    pageLoad: 0.2,
    headerElements: 0.05,
    listItems: 0.08
  }
};

/**
 * Configure global CSS variables for animations
 */
export const setAnimationVariables = () => {
  if (typeof document === 'undefined') return;
  
  // Create a style element
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  
  // Define CSS variables
  const cssVariables = `
    :root {
      --animation-timing-fast: ${animationConfig.timing.fast}s;
      --animation-timing-medium: ${animationConfig.timing.medium}s;
      --animation-timing-slow: ${animationConfig.timing.slow}s;
      --animation-timing-extra-slow: ${animationConfig.timing.extraSlow}s;
      
      --animation-easing-default: ${animationConfig.easing.default};
      --animation-easing-ease-out: ${animationConfig.easing.easeOut};
      --animation-easing-ease-in: ${animationConfig.easing.easeIn};
      --animation-easing-ease-in-out: ${animationConfig.easing.easeInOut};
      --animation-easing-bounce: ${animationConfig.easing.bounce};
      
      --animation-delay-staggered: ${animationConfig.delays.staggered}s;
      --animation-delay-page-load: ${animationConfig.delays.pageLoad}s;
    }
  `;
  
  // Add the CSS variables to the style element
  styleEl.innerHTML = cssVariables;
  
  // Append the style element to the head
  document.head.appendChild(styleEl);
};

export default {
  animationConfig,
  setAnimationVariables
};
