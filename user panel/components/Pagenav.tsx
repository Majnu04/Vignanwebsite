import React, { useState, useEffect } from 'react';
import AnimatedLogo from './AnimatedLogo'; // Make sure this path is correct

interface PagenavProps {
  onLogoClick?: () => void;
}

const Pagenav: React.FC<PagenavProps> = ({ onLogoClick }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  const handleScroll = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    const navHeight = document.getElementById("pagenav-bar")?.offsetHeight || 0;
    const offset = sectionId === 'About' ? 0 : navHeight;

    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };



  useEffect(() => {
    const sections = [
      'About',
      'Accreditations',
      'StatsSection',
      'ProgramsSection',
      'StatsCells',
      'PlacementsSection',
      'ExploreCampus',
      'NewsAndEvents',
      'Footer',
    ];

    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const id of sections) {
        const section = document.getElementById(id);
        if (
          section &&
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActiveSection(id);
          break;
        }
      }
    };



    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <nav
      id="pagenav-bar"
      className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 hidden md:block"

    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-10 py-2">
        {/* Left Logo */}
        <div className="flex-shrink-0">
          <AnimatedLogo 
            isScrolled={true} 
            logoSize={130}
            onClick={onLogoClick} 
          />
        </div>

        {/* Centered Links */}
        <div className="flex-grow">
          <ul className="flex justify-center items-center gap-8 text-base font-medium text-gray-700">
            <li>
              <a
                href="#About"
                onClick={(e) => handleScroll(e, 'About')}
                className={`transition-colors ${activeSection === 'About' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#Accreditations"
                onClick={(e) => handleScroll(e, 'Accreditations')}
                className={`transition-colors ${activeSection === 'Accreditations' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                Accreditations
              </a>
            </li>
            <li>
              <a
                href="#StatsSection"
                onClick={(e) => handleScroll(e, 'StatsSection')}
                className={`transition-colors ${activeSection === 'StatsSection' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                Stats
              </a>
            </li>
            <li>
              <a
                href="#ProgramsSection"
                onClick={(e) => handleScroll(e, 'ProgramsSection')}
                className={`transition-colors ${activeSection === 'ProgramsSection' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                Programs
              </a>
            </li>
            <li>
              <a
                href="#StatsCells"
                onClick={(e) => handleScroll(e, 'StatsCells')}
                className={`transition-colors ${activeSection === 'StatsCells' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                Active Cells
              </a>
            </li>
            <li>
              <a
                href="#PlacementsSection"
                onClick={(e) => handleScroll(e, 'PlacementsSection')}
                className={`transition-colors ${activeSection === 'PlacementsSection' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                Placements
              </a>
            </li>
            <li>
              <a
                href="#ExploreCampus"
                onClick={(e) => handleScroll(e, 'ExploreCampus')}
                className={`transition-colors ${activeSection === 'ExploreCampus' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                Campus
              </a>
            </li>
            <li>
              <a
                href="#NewsAndEvents"
                onClick={(e) => handleScroll(e, 'NewsAndEvents')}
                className={`transition-colors ${activeSection === 'NewsAndEvents' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                News
              </a>
            </li>
            <li>
              <a
                href="#Footer"
                onClick={(e) => handleScroll(e, 'Footer')}
                className={`transition-colors ${activeSection === 'Footer' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'}`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Pagenav;