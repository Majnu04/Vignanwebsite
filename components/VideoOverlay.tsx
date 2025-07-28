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
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
                             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Handle video playback when overlay opens
  useEffect(() => {
    // Ensure video plays as soon as it's rendered
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = 4.0; // Maximum speed for both mobile and desktop
      
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
        
        // Try to request fullscreen for best mobile experience
        try {
          setTimeout(() => {
            if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen request failed:', err);
              });
            }
          }, 1000); // Slight delay to ensure it happens after user interaction
        } catch (e) {
          console.log('Fullscreen API not supported or not allowed');
        }
        
        // Ensure the mobile video is loaded
        if (videoRef.current.src !== `/Sequence 01.mp4`) {
          videoRef.current.src = '/Sequence 01.mp4';
          videoRef.current.load();
        }
      } else {
        // Ensure the desktop video is loaded
        if (videoRef.current.src !== `/video.mp4`) {
          videoRef.current.src = '/video.mp4';
          videoRef.current.load();
        }
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

  // Handle graceful close with animation
  const handleClose = () => {
    setIsClosing(true);
    
    // Exit fullscreen if active
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
          console.log('Error exiting fullscreen:', err);
        });
      }
    } catch (e) {
      console.log('Fullscreen API not supported');
    }
    
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

  // Handle auto-close when video ends
  const handleVideoEnd = () => {
    handleClose();
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
        zIndex: 9999, // Ensure it's above everything else
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Prevent scrolling
        margin: 0,
        padding: 0
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
          src={isMobile ? "/Sequence 01.mp4" : "/video.mp4"}
          autoPlay={autoplay}
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: isMobile ? 'cover' : 'cover', // Changed to cover for mobile fullscreen
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 0,
            padding: 0
          }}
        />
      </div>
      {/* Close button removed as requested */}
    </div>
  );
};

export default VideoOverlay;
