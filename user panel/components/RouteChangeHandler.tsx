import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useVideo } from '../contexts/VideoContext';

// A component that hides the video overlay when route changes
const RouteChangeHandler = () => {
  const location = useLocation();
  const { stopVideo } = useVideo();

  // When location changes, stop the video
  useEffect(() => {
    stopVideo();
    // We exclude stopVideo from dependencies because we don't want
    // this effect to rerun when stopVideo changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // This is a utility component, it doesn't render anything
  return null;
};

export default RouteChangeHandler;
