import React, { useEffect, useRef } from 'react';

interface GradientBackgroundProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

/**
 * A component that creates an animated gradient background
 */
export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className = '',
  colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7'],
  speed = 15,
}) => {
  return (
    <div 
      className={`absolute inset-0 bg-animate overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(45deg, ${colors.join(', ')})`,
        backgroundSize: '400% 400%',
        animation: `gradientAnimation ${speed}s ease infinite`,
        zIndex: -1,
      }}
    />
  );
};

interface WavePatternProps {
  className?: string;
  color?: string;
  opacity?: number;
  speed?: number;
  amplitude?: number;
  frequency?: number;
}

/**
 * A component that creates a wave pattern background
 */
export const WavePattern: React.FC<WavePatternProps> = ({
  className = '',
  color = 'rgba(59, 130, 246, 0.2)',
  opacity = 0.7,
  speed = 20,
  amplitude = 30,
  frequency = 0.1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match parent
    const setCanvasSize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    let animationFrame: number;
    let startTime = Date.now();
    
    const drawWaves = () => {
      if (!ctx || !canvas) return;
      
      const currentTime = (Date.now() - startTime) * 0.001;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw multiple waves with different offsets
      drawWave(ctx, canvas, currentTime, amplitude, frequency, color, opacity, 0);
      drawWave(ctx, canvas, currentTime, amplitude * 0.7, frequency * 1.3, color, opacity * 0.7, 0.2);
      drawWave(ctx, canvas, currentTime, amplitude * 0.5, frequency * 0.8, color, opacity * 0.5, 0.4);
      
      animationFrame = requestAnimationFrame(drawWaves);
    };
    
    drawWaves();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [color, opacity, speed, amplitude, frequency]);
  
  const drawWave = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number,
    amp: number,
    freq: number,
    color: string,
    alpha: number,
    offset: number,
  ) => {
    ctx.beginPath();
    
    // Start at the left edge
    ctx.moveTo(0, canvas.height / 2);
    
    // Draw wave from left to right
    for (let x = 0; x < canvas.width; x++) {
      // Calculate y position for each x coordinate
      const y = 
        Math.sin((x * freq) + time + offset) * amp + // Main sine wave
        Math.sin((x * freq * 0.6) + time * 1.3 + offset) * amp * 0.3; // Overlay smaller sine wave for complexity
      
      // Position the wave in the middle of the canvas
      const centerY = canvas.height / 2 + y;
      
      ctx.lineTo(x, centerY);
    }
    
    // Complete the path by going down to the bottom and back to the start
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    
    // Fill the wave
    ctx.fillStyle = color.replace(')', `, ${alpha})`);
    ctx.fill();
  };
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};

interface ParticleBackgroundProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
  maxOpacity?: number;
}

/**
 * A component that creates a particle background
 */
export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  count = 50,
  color = '#3b82f6',
  speed = 2,
  size = 3,
  maxOpacity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match parent
    const setCanvasSize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      
      // Regenerate particles on resize
      generateParticles();
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle array
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    
    const generateParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * size + 1,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * maxOpacity,
        });
      }
    };
    
    generateParticles();
    
    const connectParticles = () => {
      const connectionDistance = 100;
      const connectionCount = 3; // Max connections per particle
      
      // For each particle, find closest particles to connect
      for (let i = 0; i < particles.length; i++) {
        // Array to store distances to other particles
        let distances: Array<{ index: number; distance: number }> = [];
        
        // Calculate distance to all other particles
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;
          
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only store distances within connection range
          if (distance < connectionDistance) {
            distances.push({ index: j, distance });
          }
        }
        
        // Sort by distance (closest first)
        distances.sort((a, b) => a.distance - b.distance);
        
        // Connect to the closest particles (limited by connectionCount)
        for (let k = 0; k < Math.min(distances.length, connectionCount); k++) {
          const j = distances[k].index;
          const distance = distances[k].distance;
          const opacity = maxOpacity * (1 - distance / connectionDistance);
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = color.includes('rgba') 
            ? color.replace(/[\d.]+\)$/, `${opacity})`) 
            : `rgba(59, 130, 246, ${opacity})`;
          ctx.stroke();
        }
      }
    };
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each particle
      particles.forEach(particle => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color.includes('rgba') 
          ? color.replace(/[\d.]+\)$/, `${particle.opacity})`) 
          : `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Connect particles with lines
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [className, count, color, speed, size, maxOpacity]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};

export default {
  GradientBackground,
  WavePattern,
  ParticleBackground
};
