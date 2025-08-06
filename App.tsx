
import Principal from './components/Principal';
import Ceo from './components/Ceo';
import Rector from './components/Rector';
import PoliciesPage from './components/PoliciesPage';
import BestPracticesPage from './components/BestPracticesPage';
import AdministrationPage from './components/AdministrationPage';
import VisionMissionPage from './components/VisionMissionPage';
import EmpoweringStrategiesPage from './components/EmpoweringStrategiesPage';
import AccreditationsPage from './components/AccreditationsPage';
import StatutoryApprovalsPage from './components/StatutoryApprovalsPage';
import CenterOfExcellencePage from './components/CenterOfExcellencePage';
import RankingsPage from './components/RankingsPage';
import AwardsAndAccoladesPage from './components/AwardsAndAccoladesPage';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Chairman from './components/Chairman';

import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import VideoOverlayWithContext from './components/VideoOverlayWithContext';
import { VideoProvider } from './contexts/VideoContext';
import Header from './components/Header';
import AboutT from './Placements/AboutT';
import PlacementD from './Placements/PlacementD';
import Training from './Placements/Training';
import ContactT from './Placements/ContactT';
import CsePage from './components/CsePage';
import { Assets } from './assets/Assets';

const App: React.FC = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  // Track if this is the first time loading the site in this session
  // Track if this is the first time loading the site in this session
  useEffect(() => {
    // Check sessionStorage to see if we've loaded before
    const hasVisited = sessionStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setInitialLoad(false);
    } else {
      // Set flag that user has visited
      sessionStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  return (
    <Router>
      <VideoProvider>
      <div className="App bg-white">
        {/* Video Overlay with useVideo hook - only shows on logo click or first visit */}
        <VideoOverlayWithContext initialLoad={initialLoad} setInitialLoad={setInitialLoad} />
        

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Routes for specific pages */}
          <Route path="/chairman" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <Chairman />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/departments/cse" element={
            <div>
              <Header />
              <div className="mt-16 min-h-screen bg-white">
                <CsePage data={Assets.DepartmentData.cse} onBack={() => window.history.back()} />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/departments/aids" element={
            <div>
              <Header />
              <div className="mt-16 min-h-screen bg-white">
                <CsePage data={Assets.DepartmentData.aids} onBack={() => window.history.back()} />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/departments/it" element={
            <div>
              <Header />
              <div className="mt-16 min-h-screen bg-white">
                <CsePage data={Assets.DepartmentData.it} onBack={() => window.history.back()} />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/placements/about-t" element={<AboutT />} />
          <Route path="/visionmission" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <VisionMissionPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/principal" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <Principal />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/ceo" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <Ceo />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/rector" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <Rector />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/policies" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <PoliciesPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/best-practices" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <BestPracticesPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/administration" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <AdministrationPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/empowering-strategies" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <EmpoweringStrategiesPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/accreditations" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <AccreditationsPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/statutory-approvals" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <StatutoryApprovalsPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/center-of-excellence" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <CenterOfExcellencePage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/rankings" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <RankingsPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/awards" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <AwardsAndAccoladesPage />
              </div>
              <Footer />
            </div>
          } />
          
          
          
          {/* Placement related routes */}
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
