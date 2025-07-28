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
  
  // Handle video playback when overlay opens
  useEffect(() => {
    // Ensure video plays as soon as it's rendered
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = 1.8; // Normal speed for intro video
      
      // Attempt to play with retry mechanism
      const playVideo = () => {
        videoRef.current?.play().catch(error => {
          console.error('Video play failed:', error);
          // Retry play after a short delay (handles autoplay restrictions)
          setTimeout(playVideo, 1000);
        });
      };
      
      playVideo();
    }
  }, [isOpen]);

  // Handle graceful close with animation
  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
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
        alignItems: 'center'
      }}
    >
      <video 
        ref={videoRef}
        className={`video-animation ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}
        src="/video.mp4"
        autoPlay={autoplay}
        muted
        playsInline
        onEnded={handleVideoEnd}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      {/* Close button removed as requested */}
    </div>
  );
};

export default VideoOverlay;
