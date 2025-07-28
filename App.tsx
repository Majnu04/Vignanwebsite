import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Chairman from './components/Chairman';

import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import VideoOverlay from './components/VideoOverlay';
import { VideoProvider } from './contexts/VideoContext';
import Header from './components/Header';
import AboutT from './Placements/AboutT';
import PlacementD from './Placements/PlacementD';
import Training from './Placements/Training';
import ContactT from './Placements/ContactT';

const App: React.FC = () => {
  const [showVideoOverlay, setShowVideoOverlay] = useState(true); // Start with video visible

  return (
    <Router>
      <VideoProvider>
      <div className="App bg-white">
        {/* Video Overlay - shown by default when site loads */}
        <VideoOverlay 
          isOpen={showVideoOverlay}
          onClose={() => setShowVideoOverlay(false)} 
          autoplay={true}
        />
        

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Routes for specific pages */}
          <Route path="/messages/chairman" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <Chairman />
              </div>
              <Footer />
            </div>
          } />
          {/* <Route path="/departments/cse" element={<CsePage />} /> */}
          <Route path="/placements/about-t" element={<AboutT />} />
          <Route path="/placements/PlacementDetails" element={<PlacementD />} />
          <Route path="/placements/TrainingProcess" element={<Training />} />
          <Route path="/placements/Contact" element={<ContactT />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ScrollToTopButton />
      </div>
      </VideoProvider>
    </Router>
  );
};

export default App;
