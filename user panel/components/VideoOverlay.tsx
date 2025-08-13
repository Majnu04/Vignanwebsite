import React, { useEffect, useRef, useState } from 'react';
import '../styles/videoAnimation.css';

interface VideoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  autoplay?: boolean;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ isOpen, onClose, autoplay = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [logoPosition, setLogoPosition] = useState({ 
    x: 10, 
    y: 10, 
    width: 100, 
    height: 100 
  }); // Default position and size for logo animation target
  
  // Detect mobile device only - no logo detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
                             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    // FIXED APPROACH: Use a fixed position at the top center
    const setFixedLogoPosition = () => {
      const screenWidth = window.innerWidth;
      
      // Based on the screenshot, position in top center
      setLogoPosition({
        x: screenWidth / 2, // Center horizontally
        y: 150, // Fixed position from top
        width: screenWidth * 0.4, // 40% of screen width
        height: 180 // Fixed height for logo area
      });
      // Don't try to find the logo anymore - just use fixed position
      console.log('Using fixed position for logo animation target');
    };
    
    checkMobile();
    setFixedLogoPosition(); // Set the fixed position immediately
    
    const handleResize = () => {
      checkMobile();
      setFixedLogoPosition(); // Update fixed position on resize
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Make the video fill the entire screen and provide a smooth animation to logo at the end
  // No need for actual fullscreen API which is causing issues

  // Handle video playback when overlay opens
  useEffect(() => {
    // Ensure video plays as soon as it's rendered
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = isMobile ? 5.0 : 1.0; // Slightly slower on mobile for better experience
      
      // No fullscreen, but make sure the overlay covers the entire viewport
      if (overlayRef.current) {
        overlayRef.current.style.width = '100vw';
        overlayRef.current.style.height = '100vh';
        overlayRef.current.style.position = 'fixed';
        overlayRef.current.style.zIndex = '9999';
        overlayRef.current.style.top = '0';
        overlayRef.current.style.left = '0';
      }
      
      // Prevent body scrolling when overlay is open
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; // Prevent html scrolling too
      
      // Set up mobile for true fullscreen experience
      if (isMobile) {
        // Prevent zooming/scaling on mobile
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
        
        // No fullscreen API usage for mobile - just make it visually fullscreen
        
        // Ensure the mobile video is loaded with the new mobile2.mp4
        if (videoRef.current.src !== `/mobil2.mp4`) {
          videoRef.current.src = '/mobil2.mp4';
          videoRef.current.load();
        }
      } else {
        // Ensure the desktop video is loaded with the new animation that ends at the logo
        if (videoRef.current.src !== `/images/lv_0_20250728171716.mp4`) {
          videoRef.current.src = '/images/lv_0_20250728171716.mp4';
          videoRef.current.load();
        }
        
        // No fullscreen API for desktop either - just make it visually fullscreen
      }
      
      // Attempt to play with retry mechanism
      const playVideo = () => {
        videoRef.current?.play().catch(error => {
          console.error('Video play failed:', error);
          // Retry play after a short delay (handles autoplay restrictions)
          setTimeout(playVideo, 1000);
        });
      };
      
      playVideo();
      
      // Restore scrolling and viewport settings when component unmounts
      return () => {
        document.body.style.overflow = '';
        if (isMobile) {
          const metaViewport = document.querySelector('meta[name="viewport"]');
          if (metaViewport) {
            metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
          }
        }
      };
    }
  }, [isOpen, isMobile]);

  // No fullscreen handling needed
  
  // Handle graceful close with animation
  const handleClose = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
      
      // Restore body and document scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Restore viewport settings
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
      
      // If on mobile, stop the video to save resources
      if (isMobile && videoRef.current) {
        videoRef.current.pause();
      }
      
      onClose();
    }, 800); // Match to animation duration
  };

  // Handle auto-close when video ends with special animation for desktop
  const handleVideoEnd = () => {
    // For desktop video, animate to the logo position
    if (!isMobile && videoRef.current) {
        const videoElement = videoRef.current;
        if (!videoElement) return;
        const videoWrapper = videoElement.parentElement;
      
      // Use fixed position at top center - much more reliable
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Enhanced animation values for smoother logo transition
      const finalLogoX = screenWidth / 2; // Center
      const finalLogoY = 60; // Top area where logo is
      
      // Use a responsive scale ratio
      const scaleRatio = Math.min(0.2, 150 / Math.min(screenWidth, screenHeight)); // Dynamic scaling
      
      // Enhanced translation to top center logo
      const translateX = 0; // No horizontal translation needed if already centered
      const translateY = -screenHeight * 0.45; // Move up more for better logo position
      
      console.log('Using simplified animation to top center');
      
      // Enhanced smooth animation
      videoElement.style.transition = 'transform 2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.8s ease-in-out';
      videoElement.style.transformOrigin = 'center top'; // Better for logo animation
      videoElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleRatio})`;
      videoElement.style.opacity = '0.2'; // Fade to slightly visible before disappearing completely
      
      // Fade overlay background
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'background-color 1.5s ease';
        overlayRef.current.style.backgroundColor = 'rgba(0,0,0,0.7)';
      }
      
      // Prevent clicking during animation
      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = 'none';
      }
      
      // Wait for logo animation to complete before closing
      setTimeout(() => {
        // Reset pointer events before closing
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = '';
        }
        handleClose();
      }, 2000); // Increased animation duration for smoother transition
    } else {
      // For mobile, just use the standard close animation
      handleClose();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className={`video-animation-container ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
      style={{ 
        backgroundColor: 'black',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '-webkit-fill-available', // Fix for iOS viewport height
        zIndex: 9999, // Ensure it's above everything else
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Prevent scrolling
        margin: 0,
        padding: 0,
        perspective: '1000px' // Adds depth perspective for 3D animations
      }}
      onClick={handleClose} // Allow tapping to close
    >
      <div className="video-wrapper" style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        <video 
          ref={videoRef}
          className={`video-animation ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}
          src={isMobile ? "/mobil2.mp4" : "/images/lv_0_20250728171716.mp4"}
          autoPlay={autoplay}
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', // Always cover for fullscreen effect on both mobile and desktop
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 0,
            padding: 0,
            transformOrigin: 'center center',
            willChange: 'transform, opacity', // Hardware acceleration hint
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.5s ease-out' // Built-in transition
          }}
        />
      </div>
      {/* Close button removed as requested */}
    </div>
  );
};

export default VideoOverlay;
