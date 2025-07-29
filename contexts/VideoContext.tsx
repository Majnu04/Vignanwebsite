import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoContextType {
  isVideoPlaying: boolean;
  playVideo: () => void;
  stopVideo: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // This controls whether the video should be shown
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Simple functions to control video state
  const playVideo = () => {
    setIsVideoPlaying(true);
  };
  
  const stopVideo = () => {
    setIsVideoPlaying(false);
  };

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
