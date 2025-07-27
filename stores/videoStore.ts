import { create } from 'zustand';

interface VideoStoreState {
  isVideoPlaying: boolean;
  playVideo: () => void;
  stopVideo: () => void;
}

const useVideoStore = create<VideoStoreState>((set) => ({
  isVideoPlaying: false,
  playVideo: () => set({ isVideoPlaying: true }),
  stopVideo: () => set({ isVideoPlaying: false }),
}));

export default useVideoStore;
