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
  
  // Handle both initial load case and logo click case
  useEffect(() => {
    if (initialLoad || isVideoPlaying) {
      setShowOverlay(true);
    }
  }, [initialLoad, isVideoPlaying]);
  
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
