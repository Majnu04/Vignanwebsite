
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
import TeachingMethodologiesPage from './components/TeachingMethodologiesPage';
import StudentDiversityPage from './components/StudentDiversityPage';
import MentorMenteeSystemPage from './components/MentorMenteeSystemPage';
import CoursesOfferedPage from './components/CoursesOfferedPage';
import AdmissionsProcedurePage from './components/AdmissionsProcedurePage';
import AdmissionListsPage from './components/AdmissionListsPage';
import CourseOutcomesPage from './components/CourseOutcomesPage';
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
  const [initialLoad, setInitialLoad] = useState(false); // Changed default to false

  // Only show video on the very first load of the homepage
  useEffect(() => {
    // Check if we're on the homepage and if this is truly the first visit
    const currentPath = window.location.pathname;
    const hasEverVisited = localStorage.getItem('hasEverVisitedSite');
    
    // Only set initialLoad to true if:
    // 1. We're on the homepage (/ or empty path)
    // 2. User has never visited the site before (using localStorage for persistence)
    if ((currentPath === '/' || currentPath === '') && !hasEverVisited) {
      setInitialLoad(true);
      // Mark that user has visited the site (persists across browser sessions)
      localStorage.setItem('hasEverVisitedSite', 'true');
    }
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <Router>
      <VideoProvider>
      <div className="App bg-white">
        {/* Video Overlay - shows on first visit to homepage and when logo is clicked */}
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
          <Route path="/teaching-methodologies" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <TeachingMethodologiesPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/student-diversity" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <StudentDiversityPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/mentor-mentee" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <MentorMenteeSystemPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/courses-offered" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <CoursesOfferedPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/admissionsprocedure" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <AdmissionsProcedurePage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/admissionslists" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <AdmissionListsPage />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/admissionsoutcomes" element={
            <div className="pb-16">
              <Header />
              <div className="pt-16">
                <CourseOutcomesPage />
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
