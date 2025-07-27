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
    if (isOpen && videoRef.current) {
      // Reset video to beginning
      videoRef.current.currentTime = 0;
      
      // Set playback speed to 1.5x (adjust as needed)
      videoRef.current.playbackRate = 1.8;
      
      // Play video
      videoRef.current.play().catch(error => {
        console.error('Video play failed:', error);
      });
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
      onClick={handleClose}
    >
      <video 
        ref={videoRef}
        className={`video-animation ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}
        src="/video.mp4"
        autoPlay={autoplay}
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
      
      {/* Optional skip button */}
      <button 
        className="absolute bottom-6 right-6 z-10 bg-white/10 hover:bg-white/20 text-white rounded-md px-4 py-2 text-sm transition-colors"
        onClick={e => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label="Skip animation"
      >
        Skip
      </button>
    </div>
  );
};

export default VideoOverlay;
