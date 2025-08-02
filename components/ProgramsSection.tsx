import React, { useState, useEffect, useRef } from 'react';
import CsePage from './CsePage';

// Import the Assets with proper path
import { Assets } from '../assets/Assets';

// --- DATA ---
const programsData = {
  UG: [
    { name: 'Artificial Intelligence & Data Science', desc: 'Master machine learning, big data, and neural networks.', career: 'AI Engineer, Data Scientist', pageId: 'aids' },
    { name: 'Computer Science & Engineering', desc: 'Core principles of computing, algorithms, and software development.', career: 'Software Engineer, DevOps', pageId: 'cse' },
    { name: 'Advanced CSE (AI, Cyber Security, Data Science)', desc: 'Specialized tracks in AI, ethical hacking, and data modeling.', career: 'AI Specialist, Security Analyst, Data Engineer', pageId: 'cses' },
    { name: 'Civil Engineering', desc: 'Design and build infrastructure like bridges, buildings, and transport systems.', career: 'Structural Engineer, Project Manager', pageId: 'civil' },
    { name: 'Electrical & Electronics Engineering', desc: 'Explore circuits, power systems, and control systems.', career: 'Power Engineer, Controls Engineer', pageId: 'eee' },
    { name: 'Electronics & Computer Engineering', desc: 'A blend of hardware and software, from microprocessors to OS.', career: 'Hardware Engineer, IoT Specialist', pageId: 'ece' },
    { name: 'Electronics & Communication Engineering', desc: 'Focus on signal processing, telecommunications, and embedded systems.', career: 'Telecom Engineer, VLSI Designer', pageId: 'ecm' },
    { name: 'Information Technology', desc: 'Manage and implement enterprise-level IT infrastructure and solutions.', career: 'IT Manager, Systems Administrator', pageId: 'it' },
    { name: 'Mechanical Engineering', desc: 'Principles of mechanics, thermodynamics, and material science.', career: 'Design Engineer, Manufacturing Head', pageId: 'me' },
    { name: 'Basic Science & Humanities', desc: 'Foundational studies in physics, chemistry, mathematics, and communication skills.', career: 'Research, Academia, Technical Writing', pageId: 'basic' },
  ],
  PG: [
    { name: 'AI & Machine Learning', desc: 'Advanced studies in machine learning algorithms and applications.', career: 'ML Architect, Research Scientist', pageId: 'aiml' },
    { name: 'Computer Science & Engineering', desc: 'Postgraduate research and development in advanced computing.', career: 'Senior Software Architect', pageId: 'cse' },
    { name: 'Digital Electronics & Comm. Systems', desc: 'Focus on advanced digital systems and communication protocols.', career: 'Communications Engineer', pageId: 'digi' },
    { name: 'Master of Business Administration', desc: 'Develop leadership and strategic management skills for the corporate world.', career: 'Business Leader, Manager', pageId: 'mba' },
    { name: 'Master of Computer Applications', desc: 'Advanced application development and software engineering skills.', career: 'Lead Application Developer', pageId: 'mca' },
  ],
};

// --- SUB-COMPONENTS ---

const ProgramTileDesktop: React.FC<{ program: any; onMouseEnter: () => void; isHovered: boolean; onClick: () => void; }> = ({ program, onMouseEnter, isHovered, onClick }) => {
  const isClickable = !!program.pageId;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={isClickable ? onClick : undefined}
      className={`relative p-6 rounded-xl h-48 flex flex-col justify-center transition-all duration-500 ease-out ${isClickable ? 'cursor-pointer' : 'cursor-default'} bg-white border border-gray-200`}
      style={{
        boxShadow: isHovered ? '0 4px 24px 0 rgba(0,0,0,0.08)' : 'none',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        borderColor: isClickable && isHovered ? '#06b6d4' : '#e5e7eb',
      }}
    >
      <div className={`transition-all duration-500 ${isHovered ? 'opacity-0 -translate-y-2' : 'opacity-100'}`}>
        <h3 className="text-xl font-bold text-center text-gray-900">{program.name}</h3>
        {isClickable && (
          <div className="flex items-center justify-center mt-2">
            <span className="text-xs text-blue-600 font-semibold">VIEW DEPARTMENT</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        )}
      </div>
      <div className={`absolute inset-0 p-6 flex flex-col justify-center text-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
        <p className="text-sm text-gray-700">{program.desc}</p>
        <p className="text-xs text-cyan-400 font-semibold mt-2 uppercase tracking-wider">{program.career}</p>
        {isClickable && (
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg mx-auto flex items-center justify-center hover:bg-blue-700 transition-colors">
            View Department
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const ProgramTileMobile: React.FC<{ program: any; isActive: boolean; onClick: () => void; }> = ({ program, isActive, onClick }) => {
  const isClickable = !!program.pageId;
  return (
    <div className="border-b border-gray-200 bg-white">
      <button
        onClick={onClick}
        className={`w-full flex justify-between items-center text-left p-4 ${isClickable ? 'bg-blue-50' : ''}`}
      >
        <span className="text-lg font-semibold text-gray-900">{program.name}</span>
        {isClickable ? (
          <span className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center">
            VIEW DEPARTMENT
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-cyan-400 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {!isClickable && (
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-48' : 'max-h-0'}`}>
          <div className="p-4 pt-0">
            <p className="text-sm text-gray-700 mb-2">{program.desc}</p>
            <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">{program.career}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---

const ProgramsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'UG' | 'PG'>('UG');
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const [activeMobileTile, setActiveMobileTile] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const programsToShow = activeFilter === 'UG' ? programsData.UG : programsData.PG;

  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const handleProgramClick = (pageId: string) => {
    // Check which department data is available
    if (['cse', 'aids', 'it'].includes(pageId)) {
      // Set the selected page ID to display the department
      setSelectedPageId(pageId);
      // Scroll to top for better user experience
      window.scrollTo(0, 0);
      console.log("Department selected:", pageId);
    } else {
      // For departments that don't have data yet
      setSelectedPageId(pageId);
      console.log("Department selected (placeholder):", pageId);
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      grid.style.setProperty('--mouse-x', `${x}px`);
      grid.style.setProperty('--mouse-y', `${y}px`);
    };
    grid.addEventListener('mousemove', handleMouseMove);
    return () => grid.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMobileTileClick = (name: string) => {
    setActiveMobileTile(activeMobileTile === name ? null : name);
  };

  return (
    <section className="relative pt-20 sm:pt-28 pb-0 sm:pb-0 mb-0 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-black tracking-tight drop-shadow-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Programmes Offered
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-2">Explore our diverse range of undergraduate and postgraduate programs designed for future leaders and innovators.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onMouseEnter={() => setActiveFilter('UG')}
            className={`px-7 py-2.5 rounded-full font-semibold transition-all duration-300 border-2 ${activeFilter === 'UG' ? 'bg-black text-white border-black shadow-lg scale-105' : 'bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-black'}`}
          >
            Undergraduate
          </button>
          <button
            onMouseEnter={() => setActiveFilter('PG')}
            className={`px-7 py-2.5 rounded-full font-semibold transition-all duration-300 border-2 ${activeFilter === 'PG' ? 'bg-black text-white border-black shadow-lg scale-105' : 'bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-black'}`}
          >
            Postgraduate
          </button>
        </div>

        {/* --- DESKTOP VIEW: Interactive Grid --- */}
        <div
          ref={gridRef}
          onMouseLeave={() => setHoveredTile(null)}
          className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative"
        >
          {programsToShow.map((program, idx) => (
            <div className={idx % 2 === 0 ? 'bg-white' : 'bg-black'} style={{ borderRadius: '1rem', overflow: 'hidden' }} key={program.name}>
              <ProgramTileDesktop
                program={program}
                isHovered={hoveredTile === program.name}
                onMouseEnter={() => setHoveredTile(program.name)}
                onClick={() => program.pageId && handleProgramClick(program.pageId)}
              />
            </div>
          ))}
        </div>

        {/* --- MOBILE VIEW: Accordion List --- */}
        <div className="block md:hidden">
          {programsToShow.map((program) => (
            <ProgramTileMobile
              key={program.name}
              program={program}
              isActive={activeMobileTile === program.name}
              onClick={() => program.pageId ? handleProgramClick(program.pageId) : handleMobileTileClick(program.name)}
            />
          ))}
        </div>

        {selectedPageId && (
          <>
            {/* Use a portal with a transparent backdrop */}
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSelectedPageId(null)}></div>
            
            {/* Department Content */}
            <div className="fixed inset-0 z-50 bg-white overflow-auto" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              {selectedPageId === 'cse' && (
                <CsePage data={Assets.DepartmentData.cse} onBack={() => setSelectedPageId(null)} />
              )}
              {selectedPageId === 'aids' && (
                <CsePage data={Assets.DepartmentData.aids} onBack={() => setSelectedPageId(null)} />
              )}
              {selectedPageId === 'it' && (
                <CsePage data={Assets.DepartmentData.it} onBack={() => setSelectedPageId(null)} />
              )}
              {/* For departments that don't have data yet, show CSE data as placeholder */}
              {['cses', 'civil', 'eee', 'ece', 'ecm', 'me', 'basic', 'aiml', 'digi', 'mba', 'mca'].includes(selectedPageId) && (
                <CsePage
                  data={{
                    ...Assets.DepartmentData.cse,
                    name: `${programsToShow.find(p => p.pageId === selectedPageId)?.name || 'Department'} (Preview)`,
                  }}
                  onBack={() => setSelectedPageId(null)}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;