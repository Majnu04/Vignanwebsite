import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Accreditations from './Accreditations';
import StatsSection from './StatsSection';
import StatsCells from './StatsCells';
import ProgramsSection from './ProgramsSection';
import PlacementsSection from './PlacementsSection';
import ExploreCampus from './ExploreCampus';
import NewsAndEvents from './NewsAndEvents';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className="overflow-hidden mt-0">
        <section id="Hero" className="mt-0"><Hero /></section>
        <section id='About'><About/></section>
        <section id="Accreditations"><Accreditations /></section>
        <section id="StatsSection"><StatsSection /></section>
        <section id="ProgramsSection"><ProgramsSection /></section>
        <section id="StatsCells"><StatsCells /></section>
        <section id="PlacementsSection"><PlacementsSection /></section>
        <section id="ExploreCampus"><ExploreCampus /></section>
        <section id="NewsAndEvents"><NewsAndEvents /></section>
        <section id="Footer"><Footer /></section>
      </main>
    </>
  );
};

export default Home;
