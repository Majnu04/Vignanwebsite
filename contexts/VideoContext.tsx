import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface VideoContextType {
  isVideoPlaying: boolean;
  playVideo: () => void;
  stopVideo: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // This controls whether the video should be shown
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Only play video when logo is clicked - never on page load or navigation
  const playVideo = useCallback(() => {
    // Set a flag that this was explicitly triggered by logo
    sessionStorage.setItem('videoTriggeredByLogo', 'true');
    setIsVideoPlaying(true);
  }, []);
  
  const stopVideo = useCallback(() => {
    // Clear the flag
    sessionStorage.removeItem('videoTriggeredByLogo');
    setIsVideoPlaying(false);
  }, []);

  return (
    <VideoContext.Provider value={{ isVideoPlaying, playVideo, stopVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
