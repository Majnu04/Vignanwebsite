import React from 'react';

interface PulsingDotProps {
  className?: string;
  color?: string;
  size?: number;
  active?: boolean;
}

const PulsingDot: React.FC<PulsingDotProps> = ({ 
  className = '', 
  color = '#3b82f6', 
  size = 16,
  active = false
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${active ? 'scale-125' : ''} transition-transform duration-300`}
    >
      <circle cx="12" cy="12" r="4" fill={color} />
      
      {/* Inner pulsing circle */}
      <circle 
        cx="12" 
        cy="12" 
        r="6" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeOpacity="0.7"
        className="animate-ping opacity-75"
        style={{ animationDuration: '2s' }}
      />
      
      {/* Middle pulsing circle */}
      <circle 
        cx="12" 
        cy="12" 
        r="8" 
        stroke={color} 
        strokeWidth="1" 
        strokeOpacity="0.5"
        className="animate-ping opacity-50"
        style={{ animationDuration: '3s', animationDelay: '0.5s' }}
      />
      
      {/* Outer pulsing circle (only visible when active) */}
      {active && (
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke={color} 
          strokeWidth="0.5" 
          strokeOpacity="0.3"
          className="animate-ping opacity-30"
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        />
      )}
    </svg>
  );
};

export default PulsingDot;
