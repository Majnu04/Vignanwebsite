// src/pages/departments/CsePage.tsx

import React from 'react';
import DepartmentLayout from './DepartmentLayout';

// --- Data for the CSE Department ---
const cseSidebarData = [
  { title: 'About Us', href: '#about' },
  { title: 'Vision and Mission', href: '#vision' },
  {
    title: 'Program Structure & Syllabus',
    children: [
      { title: 'R13', href: '#r13' },
      { title: 'R16', href: '#r16' },
      { title: 'VR17', href: '#vr17' },
      { title: 'VR19', href: '#vr19' },
      { title: 'VR20', href: '#vr20' },
      { title: 'VR23', href: '#vr23' },
    ],
  },
  { title: 'Faculty', href: '#faculty' },
  { title: 'Infrastructure', href: '#infrastructure' },
  { title: 'Placements', href: '#placements' },
  { title: 'Awards and Achievements', href: '#awards' },
];

const csePageData = {
    name: 'Computer Science and Engineering',
    heroImage: 'https://sirgurudasmahavidyalaya.ac.in/public/storage/department/OlRFpc01GsaXMC1Bj51zNXINmJCweOlRLtxaHncN.jpg',
    about: `Established in 2002, the Department of Computer Science and Engineering at Vignan's Institute provides a perfect academic and research environment complemented by excellence in teaching. We offer B.Tech and M.Tech programmes with a comprehensive, industry-aligned curriculum that emphasizes practical, hands-on learning to prepare students for the future of technology.`,
    hodMessage: `A warm welcome to CSE@Vignan’s Institute of Information Technology... CSE at the Vignan's Institute of Information Technology has its seeds in the erstwhile Institute set up in 2002. While at inception, it was primarily focused on academics, the ambit expanded on the journey to include M.Tech Programmes, Research and Placements, Research Center, and NBA Accreditations (2009 and 2017), leading to the current name.`,
    hodName: 'Dr. Mohan Mahanty',
    hodImage: 'http://vignaniit.edu.in/images/mohan1.png',
    vision: "To become a nationally recognized leader in computer science education, research, and innovation, producing graduates who are highly sought after by industry and academia.",
    mission: "To provide a dynamic and creative learning environment that fosters a deep understanding of computer science fundamentals, encourages practical problem-solving, and inspires lifelong learning and ethical responsibility.",
};

// --- Beautifully Styled Sub-components with the "Crimson & Gold" Theme ---

const StatCard: React.FC<{ icon: JSX.Element; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:bg-rose-500/10 hover:border-rose-400/20">
    <div className="text-amber-400 mb-3">{icon}</div>
    <p className="text-4xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400 uppercase tracking-wider">{label}</p>
  </div>
);

const SyllabusCard: React.FC<{ title: string; href: string }> = ({ title, href }) => (
    <a href={href} className="bg-slate-800/50 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-amber-400/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        <p className="font-semibold text-white">{title}</p>
    </a>
);


// --- Main Page Component ---

const CsePage: React.FC = () => {
  return (
    <DepartmentLayout
      departmentName={csePageData.name}
      heroImage={csePageData.heroImage}
      sidebarNavItems={cseSidebarData}
    >
      <article className="space-y-16">
        
        {/* ABOUT SECTION */}
        <section id="about" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-amber-300 border-b-2 border-amber-400/30 pb-3 mb-4">About The Department</h2>
          <p className="text-slate-300 leading-relaxed text-lg">{csePageData.about}</p>
        </section>

        {/* VISION AND MISSION SECTION */}
        <section id="vision" className="scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 border border-white/10 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-amber-300 mb-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Our Vision
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{csePageData.vision}</p>
                </div>
                <div className="bg-slate-800/50 border border-white/10 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-amber-300 mb-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.5l4-4m0 0l4-4m-4 4v11m0-11h11m-11 0l4 4m-4-4l4 4" /></svg>
                        Our Mission
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{csePageData.mission}</p>
                </div>
            </div>
        </section>

        {/* HOD MESSAGE SECTION */}
        <section id="hod-message" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-amber-300 border-b-2 border-amber-400/30 pb-3 mb-4">
            Message from the HOD
          </h2>
          <div className="relative flex flex-col sm:flex-row items-center gap-8 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 p-8 rounded-2xl overflow-hidden border border-white/10">
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 text-slate-700/50" aria-hidden="true">
              <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M89.75 169.25C89.75 174.5 87.625 178.5 83.375 181.25C79.125 184 74.25 185.375 68.75 185.375C60.625 185.375 53.75 182.875 48.125 177.875C42.5 172.875 39.625 166.5 39.625 158.75C39.625 152.25 41.25 146.25 44.5 140.75L62.75 110.375C64.25 107.75 65.375 105.5 66.125 103.625C66.875 101.75 67.25 100.125 67.25 98.75C67.25 96.5 66.5 94.875 65 93.875C63.5 92.875 61.375 92.375 58.625 92.375H56.75V83.375H89.75V132.875H70.25L56.75 157.25C60.75 160.25 64.125 161.75 66.875 161.75C68.625 161.75 70.125 161.375 71.375 160.625C72.625 159.875 73.25 158.625 73.25 156.875V132.875H89.75V169.25Z" fill="currentColor"/>
                <path d="M164.75 169.25C164.75 174.5 162.625 178.5 158.375 181.25C154.125 184 149.25 185.375 143.75 185.375C135.625 185.375 128.75 182.875 123.125 177.875C117.5 172.875 114.625 166.5 114.625 158.75C114.625 152.25 116.25 146.25 119.5 140.75L137.75 110.375C139.25 107.75 140.375 105.5 141.125 103.625C141.875 101.75 142.25 100.125 142.25 98.75C142.25 96.5 141.5 94.875 140 93.875C138.5 92.875 136.375 92.375 133.625 92.375H131.75V83.375H164.75V132.875H145.25L131.75 157.25C135.75 160.25 139.125 161.75 141.875 161.75C143.625 161.75 145.125 161.375 146.375 160.625C147.625 159.875 148.25 158.625 148.25 156.875V132.875H164.75V169.25Z" fill="currentColor"/>
              </svg>
            </div>
            <img 
              src={csePageData.hodImage} 
              alt={`HOD ${csePageData.hodName}`}
              className="relative z-10 w-40 h-40 rounded-full object-cover shadow-2xl shadow-rose-900/50 shrink-0 border-4 border-slate-700 ring-4 ring-amber-400/30"
            />
            <div className="relative z-10 w-full">
              <p className="text-slate-300 leading-relaxed italic text-lg sm:text-xl">
                {csePageData.hodMessage}
              </p>
              <div className="text-right mt-6">
                  <p className="font-semibold text-amber-300 text-3xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {csePageData.hodName}
                  </p>
                  <p className="text-sm text-slate-400 uppercase tracking-widest -mt-1">
                    Head of Department
                  </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM STRUCTURE & SYLLABUS SECTION */}
        <section id="syllabus" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-amber-300 border-b-2 border-amber-400/30 pb-3 mb-6">Program Structure & Syllabus</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cseSidebarData.find(item => item.title.includes('Syllabus'))?.children?.map(s => <SyllabusCard key={s.title} title={s.title} href={s.href} />)}
            </div>
        </section>
      </article>
    </DepartmentLayout>
  );
};

export default CsePage;