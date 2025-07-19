
import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Accreditations from './components/Accreditations';
import StatsSection from './components/StatsSection';
import ProgramsSection from './components/ProgramsSection';
import PlacementsSection from './components/PlacementsSection';
import NewsAndEvents from './components/NewsAndEvents';
import ExploreCampus from './components/ExploreCampus';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize animations for scroll elements
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(element => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(element);
    });
    
    // Initialize staggered animations
    const staggeredElements = document.querySelectorAll('.staggered-item');
    staggeredElements.forEach((element, index) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(element);
    });
    
    // Clean up observers on unmount
    return () => {
      // Observers will be automatically garbage collected
    };
  }, []);
  
  return (
    <div className="bg-white text-gray-800">
      <Header />
      <main>
        <Hero />
        <Accreditations />
        <StatsSection />
        <ProgramsSection />
        <PlacementsSection />
        <ExploreCampus />
        <NewsAndEvents />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;