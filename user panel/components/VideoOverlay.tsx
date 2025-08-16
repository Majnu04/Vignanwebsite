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
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Enhanced mobile and connection detection
  useEffect(() => {
    const checkDeviceAndConnection = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
                             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      
      // Enhanced connection detection
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      let slowConnection = false;
      
      if (connection) {
        // Check for slow connections
        slowConnection = connection.effectiveType === 'slow-2g' || 
                        connection.effectiveType === '2g' ||
                        connection.downlink < 1.5; // Less than 1.5 Mbps
      } else {
        // Fallback: assume slow if mobile and no connection info
        slowConnection = isMobileDevice;
      }
      
      setIsSlowConnection(slowConnection);
      
      // Show fallback immediately for very slow connections
      if (isMobileDevice && slowConnection) {
        setShowFallback(true);
      }
    };
    
    checkDeviceAndConnection();
    
    const handleResize = () => {
      checkDeviceAndConnection();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Smart video loading strategy
  useEffect(() => {
    if (isOpen && videoRef.current && !showFallback) {
      const video = videoRef.current;
      
      // Set loading strategy based on connection
      if (isMobile && isSlowConnection) {
        video.preload = 'none'; // Don't preload anything for slow connections
        video.playbackRate = 3.0; // Speed up video to reduce loading time
      } else if (isMobile) {
        video.preload = 'metadata'; // Only load metadata for regular mobile
        video.playbackRate = 2.0; // Slightly faster for mobile
      } else {
        video.preload = 'auto'; // Full preload for desktop
        video.playbackRate = 1.0; // Normal speed for desktop
      }
      
      // Use appropriate video source
      const videoSource = isMobile ? "/mobil2.mp4" : "/images/lv_0_20250728171716.mp4";
      if (video.src !== videoSource) {
        video.src = videoSource;
      }
      
      // Handle video loading events
      const handleCanPlay = () => {
        setVideoLoaded(true);
        setShowFallback(false);
      };
      
      const handleLoadStart = () => {
        // Start a timeout for slow loading
        setTimeout(() => {
          if (!videoLoaded && isMobile && isSlowConnection) {
            setShowFallback(true);
          }
        }, 3000); // Show fallback after 3 seconds on slow connections
      };
      
      const handleError = () => {
        console.error('Video failed to load, showing fallback');
        setShowFallback(true);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('error', handleError);
      
      // Setup overlay styles
      if (overlayRef.current) {
        overlayRef.current.style.width = '100vw';
        overlayRef.current.style.height = '100vh';
        overlayRef.current.style.position = 'fixed';
        overlayRef.current.style.zIndex = '9999';
        overlayRef.current.style.top = '0';
        overlayRef.current.style.left = '0';
      }
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Mobile optimizations
      if (isMobile) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
      }
      
      // Smart video play with retry
      const playVideo = async () => {
        try {
          video.currentTime = 0;
          await video.play();
        } catch (error) {
          console.error('Video play failed:', error);
          if (isMobile && isSlowConnection) {
            setShowFallback(true);
          } else {
            // Retry after delay
            setTimeout(playVideo, 1000);
          }
        }
      };
      
      // Only attempt to play if not showing fallback
      if (!showFallback) {
        playVideo();
      }
      
      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('error', handleError);
      };
    }
  }, [isOpen, isMobile, isSlowConnection, showFallback, videoLoaded]);

  // Handle graceful close with animation
  const handleClose = () => {
    setIsClosing(true);
    
    setTimeout(() => {
      setIsClosing(false);
      setShowFallback(false);
      setVideoLoaded(false);
      
      // Restore scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Restore viewport
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
      
      // Stop video to save resources
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      
      onClose();
    }, 800);
  };

  // Handle video end with smart animation
  const handleVideoEnd = () => {
    if (!isMobile && videoRef.current && !showFallback) {
      const videoElement = videoRef.current;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Enhanced animation for desktop
      const scaleRatio = Math.min(0.2, 150 / Math.min(screenWidth, screenHeight));
      const translateX = 0;
      const translateY = -screenHeight * 0.45;
      
      videoElement.style.transition = 'transform 2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.8s ease-in-out';
      videoElement.style.transformOrigin = 'center top';
      videoElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleRatio})`;
      videoElement.style.opacity = '0.2';
      
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'background-color 1.5s ease';
        overlayRef.current.style.backgroundColor = 'rgba(0,0,0,0.7)';
        overlayRef.current.style.pointerEvents = 'none';
      }
      
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = '';
        }
        handleClose();
      }, 2000);
    } else {
      handleClose();
    }
  };
  
  // Auto-close fallback after delay
  useEffect(() => {
    if (showFallback) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000); // Close fallback after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [showFallback]);
  
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
        minHeight: '-webkit-fill-available',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        perspective: '1000px'
      }}
      onClick={handleClose}
    >
      {/* Show fallback image for slow connections */}
      {showFallback ? (
        <div className="fallback-container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            animation: 'pulse 2s infinite'
          }}>
            <img 
              src="/images/vignan-logo.png" 
              alt="Vignan University" 
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                // Fallback if logo doesn't load
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 'bold',
            marginBottom: '15px',
            fontFamily: 'Georgia, serif'
          }}>
            Welcome to Vignan University
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            opacity: 0.9,
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Excellence in Education • Innovation in Research • Leaders of Tomorrow
          </p>
          <div style={{
            marginTop: '30px',
            fontSize: '14px',
            opacity: 0.7
          }}>
            Tap anywhere to continue
          </div>
        </div>
      ) : (
        /* Video content */
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
            autoPlay={autoplay && !showFallback}
            muted
            playsInline
            preload={isMobile && isSlowConnection ? "none" : (isMobile ? "metadata" : "auto")}
            onEnded={handleVideoEnd}
            onError={() => setShowFallback(true)}
            onLoadStart={() => {
              if (isMobile && isSlowConnection) {
                setTimeout(() => {
                  if (!videoLoaded) setShowFallback(true);
                }, 3000);
              }
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: 0,
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.5s ease-out'
            }}
          />
          
          {/* Loading indicator for mobile */}
          {isMobile && !videoLoaded && !showFallback && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center'
            }}>
              <div className="loading-spinner"></div>
              <div>Loading experience...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoOverlay;
