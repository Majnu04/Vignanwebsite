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
  const { stopVideo } = useVideo();
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Only handle initial load case - remove logo click functionality completely
  useEffect(() => {
    // Only show video overlay on initial load, never on logo clicks or other interactions
    if (initialLoad) {
      setShowOverlay(true);
    }
    // Remove isVideoPlaying from dependencies to prevent video from playing on other interactions
  }, [initialLoad]);
  
  // Handle closing the video
  const handleClose = () => {
    setShowOverlay(false);
    setInitialLoad(false);
    stopVideo();
  };

  return (
    <VideoOverlay
      isOpen={showOverlay}
      onClose={handleClose}
      autoplay={true}
    />
  );
};

export default VideoOverlayWithContext;
