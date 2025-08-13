import React from 'react';

interface GradientHeaderBgProps {
  className?: string;
  theme?: 'blue' | 'purple' | 'teal' | 'orange';
  children?: React.ReactNode;
}

const GradientHeaderBg: React.FC<GradientHeaderBgProps> = ({ 
  className = '', 
  theme = 'blue',
  children
}) => {
  // Define gradient stops based on theme
  const gradientConfig = {
    blue: {
      start: '#3b82f6',
      mid: '#1d4ed8',
      end: '#4f46e5'
    },
    purple: {
      start: '#8b5cf6',
      mid: '#7c3aed',
      end: '#6d28d9'
    },
    teal: {
      start: '#14b8a6',
      mid: '#0d9488',
      end: '#0f766e'
    },
    orange: {
      start: '#f97316',
      mid: '#ea580c',
      end: '#c2410c'
    }
  };

  const { start, mid, end } = gradientConfig[theme];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Background SVG */}
      <svg 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] -z-10"
        viewBox="0 0 200 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`headerGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={start} stopOpacity="0.08" />
            <stop offset="50%" stopColor={mid} stopOpacity="0.05" />
            <stop offset="100%" stopColor={end} stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <path 
          d="M10,30 Q50,10 100,30 T190,30 V80 Q150,100 100,80 T10,80 Z" 
          fill={`url(#headerGradient-${theme})`}
        />
        <path 
          d="M10,35 Q50,15 100,35 T190,35" 
          stroke={start} 
          strokeOpacity="0.2"
          strokeWidth="1" 
          fill="none"
        />
      </svg>
      
      {/* Content */}
      {children}
    </div>
  );
};

export default GradientHeaderBg;
