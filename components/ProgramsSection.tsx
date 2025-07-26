// src/components/ProgramsSection.tsx

import React, { useState, useEffect, useRef } from 'react';

// --- DATA ---
const programsData = {
  UG: [
    { name: 'Artificial Intelligence & Data Science', desc: 'Master machine learning, big data, and neural networks.', career: 'AI Engineer, Data Scientist' },
    { name: 'Computer Science & Engineering', desc: 'Core principles of computing, algorithms, and software development.', career: 'Software Engineer, DevOps' },
    { name: 'CSE (Cyber Security)', desc: 'Focus on network security, ethical hacking, and cryptography.', career: 'Security Analyst, Penetration Tester' },
    { name: 'CSE (AI)', desc: 'Specialized track in artificial intelligence and cognitive computing.', career: 'AI Specialist, Research Scientist' },
    { name: 'CSE (Data Science)', desc: 'In-depth study of data analysis, visualization, and modeling.', career: 'Data Analyst, BI Developer' },
    { name: 'Civil Engineering', desc: 'Design and build infrastructure like bridges, buildings, and transport systems.', career: 'Structural Engineer, Project Manager' },
    { name: 'Electrical & Electronics Engineering', desc: 'Explore circuits, power systems, and control systems.', career: 'Power Engineer, Controls Engineer' },
    { name: 'Electronics & Computer Engineering', desc: 'A blend of hardware and software, from microprocessors to OS.', career: 'Hardware Engineer, IoT Specialist' },
    { name: 'Electronics & Communication Engineering', desc: 'Focus on signal processing, telecommunications, and embedded systems.', career: 'Telecom Engineer, VLSI Designer' },
    { name: 'Information Technology', desc: 'Manage and implement enterprise-level IT infrastructure and solutions.', career: 'IT Manager, Systems Administrator' },
    { name: 'Mechanical Engineering', desc: 'Principles of mechanics, thermodynamics, and material science.', career: 'Design Engineer, Manufacturing Head' },
  ],
  PG: [
    { name: 'AI & Machine Learning', desc: 'Advanced studies in machine learning algorithms and applications.', career: 'ML Architect, Research Scientist' },
    { name: 'Computer Science & Engineering', desc: 'Postgraduate research and development in advanced computing.', career: 'Senior Software Architect' },
    { name: 'Digital Electronics & Comm. Systems', desc: 'Focus on advanced digital systems and communication protocols.', career: 'Communications Engineer' },
    { name: 'Master of Business Administration', desc: 'Develop leadership and strategic management skills for the corporate world.', career: 'Business Leader, Manager' },
    { name: 'Master of Computer Applications', desc: 'Advanced application development and software engineering skills.', career: 'Lead Application Developer' },
  ],
};

// --- SUB-COMPONENTS ---

const ProgramTile: React.FC<{ program: any; isHovered: boolean; onMouseEnter: () => void; }> = ({ program, isHovered, onMouseEnter }) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="relative p-6 rounded-xl h-48 flex flex-col justify-center transition-all duration-500 ease-out"
      style={{
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <div className={`transition-all duration-500 ${isHovered ? 'opacity-0 -translate-y-2' : 'opacity-100'}`}>
        <h3 className="text-xl font-bold text-center text-white">{program.name}</h3>
      </div>
      <div className={`absolute inset-0 p-6 flex flex-col justify-center text-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
        <p className="text-sm text-gray-300">{program.desc}</p>
        <p className="text-xs text-cyan-400 font-semibold mt-4 uppercase tracking-wider">{program.career}</p>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---

const ProgramsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'UG' | 'PG'>('UG');
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const programsToShow = activeFilter === 'UG' ? programsData.UG : programsData.PG;

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

  return (
    <section className="relative py-20 sm:py-28" style={{ backgroundColor: '#1a2b4f' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Discover Your Future Path
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            An interactive matrix of our premier undergraduate and postgraduate programs. Hover over any tile to explore.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveFilter('UG')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeFilter === 'UG' ? 'bg-cyan-400 text-slate-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Undergraduate
          </button>
          <button
            onClick={() => setActiveFilter('PG')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeFilter === 'PG' ? 'bg-cyan-400 text-slate-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Postgraduate
          </button>
        </div>

        {/* Interactive Grid */}
        <div
          ref={gridRef}
          onMouseLeave={() => setHoveredTile(null)}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative group"
          style={{
            '--mouse-x': '50%',
            '--mouse-y': '50%',
          } as React.CSSProperties}
        >
          {/* Spotlight Effect */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 255, 0.15), transparent 80%)',
            }}
          ></div>

          {programsToShow.map((program) => (
            <ProgramTile
              key={program.name}
              program={program}
              isHovered={hoveredTile === program.name}
              onMouseEnter={() => setHoveredTile(program.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;