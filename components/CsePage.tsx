// src/components/CsePage.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import DepartmentLayout from './DepartmentLayout'; // Uses the layout with the sidebar

// --- Data for the CSE Department ---
const cseSidebarData = [
  { title: 'About Us', href: '#about' },
  { title: 'Vision and Mission', href: '#vision' },
  {
    title: 'Program Structure & Syllabus',
    children: [
      { title: 'R13', href: '#' }, { title: 'R16', href: '#' }, { title: 'VR17', href: '#' },
      { title: 'VR19', href: '#' }, { title: 'VR20', href: '#' }, { title: 'VR23', href: '#' },
    ],
  },
  { title: 'Faculty', href: '#faculty' },
  { title: 'Infrastructure', href: '#infrastructure' },
  { title: 'Placements', href: '#placements' },
  { title: 'Awards and Achievements', href: '#awards' },
];

// const csePageData = {
//   name: 'Computer Science and Engineering',
//   heroImage: 'https://sirgurudasmahavidyalaya.ac.in/public/storage/department/OlRFpc01GsaXMC1Bj51zNXINmJCweOlRLtxaHncN.jpg',
//   about: "Established in 2002, the Department of Computer Science and Engineering at Vignan's Institute provides a perfect academic and research environment complemented by excellence in teaching. We offer B.Tech and M.Tech programmes with a comprehensive, industry-aligned curriculum that emphasizes practical, hands-on learning to prepare students for the future of technology.",
//   hodMessage: "A warm welcome to CSE@Vignan’s Institute of Information Technology... CSE at the Vignan's Institute of Information Technology has its seeds in the erstwhile Institute set up in 2002. While at inception, it was primarily focused on academics, the ambit expanded on the journey to include M.Tech Programmes, Research and Placements, Research Center, and NBA Accreditations (2009 and 2017), leading to the current name.",
//   hodName: 'Dr. Mohan Mahanty',
//   hodImage: 'http://vignaniit.edu.in/images/mohan1.png',
//   vision: "To become a nationally recognized leader in computer science education, research, and innovation, producing graduates who are highly sought after by industry and academia.",
//   mission: "To provide a dynamic and creative learning environment that fosters a deep understanding of computer science fundamentals, encourages practical problem-solving, and inspires lifelong learning and ethical responsibility.",
// };

// --- Styled Sub-components for the Light Theme ---
const SyllabusCard: React.FC<{ title: string; href: string }> = ({ title, href }) => (
  <a 
    href={href} 
    className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-lg hover:border-blue-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    <p className="font-semibold text-gray-800">{title}</p>
  </a>
);

// --- Main Page Component ---
const CsePage: React.FC<{ data: any; onBack: () => void }> = ({ data, onBack}) => {
  return (
    ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
    <DepartmentLayout
      departmentName={data.name}
      heroImage={data.heroImage}
      sidebarNavItems={cseSidebarData}
      onBack={onBack} // Pass the onBack function to the layout
    >
      <article className="space-y-16">
        
        {/* ABOUT SECTION */}
        <section id="about" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-200 pb-3 mb-4">About The Department</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{data.about}</p>
        </section>

        {/* VISION AND MISSION SECTION */}
        <section id="vision" className="scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Our Vision
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{data.vision}</p>
                </div>
                <div className="bg-white border border-gray-200 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.5l4-4m0 0l4-4m-4 4v11m0-11h11m-11 0l4 4m-4-4l4 4" /></svg>
                        Our Mission
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{data.mission}</p>
                </div>
            </div>
        </section>

        {/* HOD MESSAGE SECTION */}
        <section id="hod-message" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-200 pb-3 mb-4">
            Message from the HOD
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-8 bg-white p-8 rounded-2xl border border-gray-200">
            <img 
              src={data.hodImage} 
              alt={`HOD ${data.hodName}`}
              className="w-40 h-40 rounded-full object-cover shadow-lg shrink-0 border-4 border-white ring-4 ring-blue-500"
            />
            <div className="w-full">
              <p className="text-gray-600 leading-relaxed italic text-lg sm:text-xl relative">
                <span className="absolute -top-2 -left-4 text-6xl text-blue-100 font-serif">“</span>
                {data.hodMessage}
              </p>
              <div className="text-right mt-6">
                  <p className="font-semibold text-blue-800 text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {data.hodName}
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest -mt-1">
                    Head of Department
                  </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM STRUCTURE & SYLLABUS SECTION */}
        <section id="syllabus" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-200 pb-3 mb-6">Program Structure & Syllabus</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cseSidebarData.find(item => item.title.includes('Syllabus'))?.children?.map(s => <SyllabusCard key={s.title} title={s.title} href={s.href} />)}
            </div>
        </section>

      </article>
    </DepartmentLayout>
    </div>,document.body)
  );
};

export default CsePage;