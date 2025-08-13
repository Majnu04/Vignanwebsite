// In src/pages/PlacementsPage.tsx

import React from 'react';
import AboutVision from '../components/placements/AboutVision';
import TrainingProcess from '../components/placements/TrainingProcess';
import PlacementDetails from '../components/placements/PlacementDetails';
import ContactSection from '../components/placements/ContactSection'; // NEW: Import the contact section

const PlacementsPage: React.FC = () => {
  return (
    <div>
      {/* Each section is now wrapped in a div with a unique ID */}
      <div id="about-tnp">
        <AboutVision />
      </div>
      <div id="training-process">
        <TrainingProcess />
      </div>
      <div id="placement-details">
        <PlacementDetails />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default PlacementsPage;