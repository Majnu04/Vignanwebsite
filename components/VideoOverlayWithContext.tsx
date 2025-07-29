import React, { useEffect, useState } from 'react';
import VideoOverlay from './VideoOverlay';
import { useVideo } from '../contexts/VideoContext';

interface VideoOverlayWithContextProps {
  initialLoad: boolean;
  setInitialLoad: (value: boolean) => void;
}

const VideoOverlayWithContext: React.FC<VideoOverlayWithContextProps> = ({ 
  initialLoad, 
  setInitialLoad 
}) => {
  const { isVideoPlaying, stopVideo } = useVideo();
  const [showOverlay, setShowOverlay] = useState(false);
  
  // SIMPLIFIED: Only show video on initial load or when explicitly triggered by logo click
  useEffect(() => {
    // First visit to the website (one-time only)
    if (initialLoad) {
      setShowOverlay(true);
      // After first visit, don't show on refresh
      sessionStorage.setItem('hasVisitedBefore', 'true');
    } 
    // Only other case: logo was clicked
    else if (isVideoPlaying) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [initialLoad, isVideoPlaying]);
  
  // Handle closing the video
  const handleClose = () => {
    setShowOverlay(false);
    setInitialLoad(false);
    stopVideo();
  };
  
  // Critical: Close video and reset state on page navigation
  useEffect(() => {
    // This ensures video closes when user navigates away
    return () => {
      stopVideo();
      setShowOverlay(false);
    };
  }, [stopVideo]);

  return (
    <VideoOverlay
      isOpen={showOverlay}
      onClose={handleClose}
      autoplay={true}
    />
  );
};

export default VideoOverlayWithContext;
