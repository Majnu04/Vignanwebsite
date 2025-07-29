// LocationChangeListener.js
// This small component listens for location changes and stores the current path
// in sessionStorage to help track navigation between pages

import { useEffect } from 'react';

const LocationChangeListener = () => {
  useEffect(() => {
    // Store the initial path
    sessionStorage.setItem('currentPath', window.location.pathname);
    
    // Function to update path on change
    const handleLocationChange = () => {
      // Store the new path
      const lastPath = sessionStorage.getItem('currentPath');
      const newPath = window.location.pathname;
      
      // If path changed, update storage
      if (lastPath !== newPath) {
        sessionStorage.setItem('previousPath', lastPath || '');
        sessionStorage.setItem('currentPath', newPath);
        sessionStorage.setItem('pathChanged', 'true');
      }
    };
    
    // Listen for path changes
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default LocationChangeListener;
