import React, { useState, useRef } from 'react';
import { Program } from '../types';
import { findPrograms } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { useInView } from '../hooks/useInView';
import { useShine } from '../hooks/useShine';

const ALL_PROGRAMS: Program[] = [
  // Engineering Programs
  { 
    id: 1, 
    name: 'B.Tech in Computer Science & Engineering', 
    discipline: 'School of Engineering', 
    description: 'AICTE approved 4-year program with specializations in AI/ML, Cybersecurity, and Full Stack Development. 100% placement record with top tech companies.',
    duration: '4 Years',
    eligibility: '10+2 with PCM, 60% aggregate',
    fees: '₹1.25 Lakhs per annum',
    career: 'Software Engineer, Data Scientist, DevOps Engineer'
  },
  { 
    id: 2, 
    name: 'B.Tech in AI & Data Science', 
    discipline: 'School of Engineering', 
    description: 'Cutting-edge program focusing on machine learning, big data analytics, and neural networks with industry internships at leading AI companies.',
    duration: '4 Years',
    eligibility: '10+2 with PCM, 60% aggregate',
    fees: '₹1.45 Lakhs per annum',
    career: 'AI Engineer, ML Specialist, Data Scientist'
  },
  { 
    id: 3, 
    name: 'B.Tech in Electronics & Communication', 
    discipline: 'School of Engineering', 
    description: 'NAAC A+ accredited program covering IoT, VLSI design, embedded systems, and signal processing with state-of-the-art labs and industry partnerships.',
    duration: '4 Years',
    eligibility: '10+2 with PCM, 60% aggregate',
    fees: '₹1.15 Lakhs per annum',
    career: 'VLSI Designer, Embedded Systems Engineer'
  },
  { 
    id: 4, 
    name: 'B.Tech in Mechanical Engineering', 
    discipline: 'School of Engineering', 
    description: 'Comprehensive program with focus on CAD/CAM, automation, robotics, and renewable energy systems. Features dedicated labs for thermal engineering and manufacturing.',
    duration: '4 Years',
    eligibility: '10+2 with PCM, 60% aggregate',
    fees: '₹1.10 Lakhs per annum',
    career: 'Mechanical Engineer, Design Engineer, Production Manager'
  },
  { 
    id: 5, 
    name: 'B.Tech in Civil Engineering', 
    discipline: 'School of Engineering', 
    description: 'Learn structural engineering, transportation systems, environmental engineering, and sustainable construction with field visits and practical training.',
    duration: '4 Years',
    eligibility: '10+2 with PCM, 60% aggregate',
    fees: '₹1.05 Lakhs per annum',
    career: 'Structural Engineer, Project Manager, Urban Planner'
  },
  
  // Management Programs
  { 
    id: 6, 
    name: 'Master of Business Administration (MBA)', 
    discipline: 'School of Management', 
    description: 'AICTE approved 2-year program with specializations in Finance, Marketing, HR, and Operations. Includes industry internships and placement assistance.',
    duration: '2 Years',
    eligibility: 'Graduation with 50% marks, Valid CAT/MAT/GMAT score',
    fees: '₹2.50 Lakhs per annum',
    career: 'Business Analyst, Marketing Manager, Finance Manager'
  },
  { 
    id: 7, 
    name: 'Executive MBA', 
    discipline: 'School of Management', 
    description: 'Weekend program designed for working professionals with 5+ years of experience. Focuses on leadership, strategic management, and business transformation.',
    duration: '2 Years (Weekend)',
    eligibility: 'Graduation with 50% marks, Minimum 5 years work experience',
    fees: '₹3.25 Lakhs per annum',
    career: 'Senior Management, Business Consultant, Entrepreneur'
  },
  { 
    id: 8, 
    name: 'BBA in Business Analytics', 
    discipline: 'School of Management', 
    description: 'Innovative program combining business fundamentals with data analytics skills. Includes training in tools like Tableau, Power BI, and Python.',
    duration: '3 Years',
    eligibility: '10+2 with 50% aggregate in any stream',
    fees: '₹1.15 Lakhs per annum',
    career: 'Business Analyst, Market Research Analyst, Data Visualization Specialist'
  },
  
  // Pharmacy Programs
  { 
    id: 9, 
    name: 'B.Pharm (Bachelor of Pharmacy)', 
    discipline: 'School of Pharmacy', 
    description: 'PCI approved program covering pharmaceutical sciences, drug formulation, and quality control with well-equipped labs and hospital training.',
    duration: '4 Years',
    eligibility: '10+2 with PCB, 55% aggregate',
    fees: '₹1.25 Lakhs per annum',
    career: 'Pharmacist, Drug Safety Associate, Quality Control Analyst'
  },
  { 
    id: 10, 
    name: 'Pharm.D (Doctor of Pharmacy)', 
    discipline: 'School of Pharmacy', 
    description: 'Six-year doctoral program focusing on clinical pharmacy practice, patient care, and pharmaceutical research with extensive hospital internships.',
    duration: '6 Years',
    eligibility: '10+2 with PCB, 60% aggregate',
    fees: '₹1.75 Lakhs per annum',
    career: 'Clinical Pharmacist, Healthcare Administrator, Research Scientist'
  },
  
  // Science Programs
  { 
    id: 11, 
    name: 'B.Sc in Computer Science', 
    discipline: 'School of Sciences', 
    description: 'Three-year program covering programming fundamentals, database systems, and software development with focus on practical applications.',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics, 50% aggregate',
    fees: '₹75,000 per annum',
    career: 'Software Developer, System Administrator, Technical Support Specialist'
  },
  { 
    id: 12, 
    name: 'B.Sc in Chemistry', 
    discipline: 'School of Sciences', 
    description: 'Comprehensive program in organic, inorganic, physical and analytical chemistry with advanced lab facilities and research opportunities.',
    duration: '3 Years',
    eligibility: '10+2 with PCM/PCB, 50% aggregate',
    fees: '₹65,000 per annum',
    career: 'Research Scientist, Quality Control Analyst, Lab Technician'
  },
  { 
    id: 13, 
    name: 'M.Sc in Data Science', 
    discipline: 'School of Sciences', 
    description: 'Advanced program focusing on statistical modeling, machine learning, big data technologies and data visualization with industry projects.',
    duration: '2 Years',
    eligibility: 'B.Sc/B.Tech with Mathematics/Statistics, 55% aggregate',
    fees: '₹1.20 Lakhs per annum',
    career: 'Data Scientist, Statistical Analyst, Business Intelligence Developer'
  },
];

const ProgramCard: React.FC<{ program: Program, inView: boolean, delay: string }> = ({ program, inView, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useShine(cardRef as React.RefObject<HTMLElement>);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div ref={cardRef} className={`card-shine bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-500 flex flex-col ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} p-4 sm:p-6`} style={{transitionDelay: delay}}>
      <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-primary-600 bg-primary-50 rounded-full">{program.discipline}</span>
      <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-gray-600 bg-gray-100 rounded-full ml-2">{program.level}</span>
      <h3 className="text-lg sm:text-xl font-bold text-primary-900 leading-tight mb-2 sm:mb-3">{program.name}</h3>
      <p className="text-gray-600 text-xs sm:text-sm mb-2">{program.description}</p>
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-72 mt-2 sm:mt-4' : 'max-h-0'}`}>
        <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm">
          {program.eligibility && (
            <div>
              <h4 className="font-semibold text-blue-900">Eligibility</h4>
              <p className="text-gray-600">{program.eligibility}</p>
            </div>
          )}
          {program.fees && (
            <div>
              <h4 className="font-semibold text-blue-900">Fee Structure</h4>
              <p className="text-gray-600">{program.fees}</p>
            </div>
          )}
          {program.career && (
            <div>
              <h4 className="font-semibold text-blue-900">Career Opportunities</h4>
              <p className="text-gray-600">{program.career}</p>
            </div>
          )}
        </div>
      </div>
      <button className="mt-2 sm:mt-4 px-4 py-2 w-full sm:w-auto rounded-lg bg-primary-600 text-white font-semibold text-xs sm:text-sm shadow hover:bg-primary-700 transition-all duration-300">
        Learn More
      </button>
    </div>
  );
};


const ProgramsSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedPrograms, setDisplayedPrograms] = useState<Program[]>(ALL_PROGRAMS);
  const [isAiSearched, setIsAiSearched] = useState(false);
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });


  const handleSearch = async () => {
    if (!query.trim()) {
      setDisplayedPrograms(ALL_PROGRAMS);
      setIsAiSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const results = await findPrograms(query, ALL_PROGRAMS);
      const matchedPrograms = results.map(result => ALL_PROGRAMS.find(p => p.name === result.programName)).filter(Boolean) as Program[];
      setDisplayedPrograms(matchedPrograms.length > 0 ? matchedPrograms : []);
      setIsAiSearched(true);
    } catch (err) {
      setError('Sorry, we couldn\'t process your request. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setDisplayedPrograms(ALL_PROGRAMS);
    setError(null);
    setIsAiSearched(false);
  };


  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filteredPrograms = activeFilter 
    ? displayedPrograms.filter(program => program.discipline === activeFilter)
    : displayedPrograms;
    
  const disciplines = Array.from(new Set(ALL_PROGRAMS.map(p => p.discipline)));

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-28" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="inline-block mb-5 px-6 py-1.5 bg-blue-100 rounded-full text-blue-800 font-medium">
            Academic Programs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">
            Discover Your Future Path
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of AICTE-approved and NAAC A+ accredited programs across Engineering, Management, Sciences, and Pharmacy. Use our AI Assistant to find the right fit for your interests and career goals.
          </p>
        </div>
        
        {/* Discipline Filters */}
        <div className={`mb-10 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-100 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === null 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveFilter(null)}
          >
            All Programs
          </button>
          {disciplines.map(discipline => (
            <button
              key={discipline}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === discipline 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter(discipline)}
            >
              {discipline}
            </button>
          ))}
        </div>

        <div className={`max-w-2xl mx-auto mb-12 transition-all duration-700 delay-200 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'I want to build apps and learn about AI'"
              className="w-full pl-6 pr-36 py-4 rounded-full border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className={`absolute inset-y-0 right-2 my-2 flex items-center bg-blue-800 text-white px-5 rounded-full font-semibold hover:bg-blue-900 transition-colors duration-300 disabled:bg-blue-400 transform hover:scale-105 disabled:scale-100`}
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              {isLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
        </div>

        {error && <p className="text-center text-red-600 mb-8">{error}</p>}
        
        {isAiSearched && (
          <div className="text-center mb-8">
            <p className="text-gray-700">Showing AI recommendations for: "{query}"</p>
            <button onClick={handleReset} className="text-blue-600 hover:underline font-semibold mt-1">
              Show all programs
            </button>
          </div>
        )}

        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8" ref={gridRef}>
            {filteredPrograms.map((program, index) => (
              <ProgramCard key={program.id} program={program} inView={gridInView} delay={`${index*100}ms`} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No programs match your search.</p>
            <p className="text-gray-500 mt-2">Try rephrasing your interests or browse all programs.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProgramsSection;
