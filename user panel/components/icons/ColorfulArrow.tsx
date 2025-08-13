import React from 'react';

interface ColorfulArrowProps {
  className?: string;
  size?: number;
}

const ColorfulArrow: React.FC<ColorfulArrowProps> = ({ className = '', size = 20 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id="colorfulArrow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <path 
        d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699" 
        stroke="url(#colorfulArrow)" 
        strokeWidth="2" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M3.5 12H20.33" 
        stroke="url(#colorfulArrow)" 
        strokeWidth="2" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ColorfulArrow;
