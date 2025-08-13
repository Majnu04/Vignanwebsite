
import React from 'react';
import ReactDOM from 'react-dom';
import DepartmentLayout from './DepartmentLayout';
import { useContext } from 'react';
import { StoreContext } from '../storeContext/StoreContext';

// --- Data for the CSE Department ---
const cseSidebarData = [
  { title: 'About Us', href: '#about' },
  { title: 'Vision and Mission', href: '#vision' },
  { title: 'HOD Message', href: '#hod-message' },
  {
    title: 'Program Structure & Syllabus',
    children: [
      { title: 'R13', href: '#' }, { title: 'R16', href: '#' }, { title: 'VR17', href: '#' },
      { title: 'VR19', href: '#' }, { title: 'VR20', href: '#' }, { title: 'VR23', href: '#' },
    ],
  },
  { title: 'Faculty', href: '#faculty' },
  { title: 'Infrastructure', href: '#infrastructure' },
  // { title: 'Placements', href: '#placements' },
  { title: 'Awards and Achievements', href: '#awards' },
];

// --- Styled Sub-components ---
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
const CsePage: React.FC<{  onBack: () => void }> = ({ onBack}) => {
   const { url, departmentList } = useContext(StoreContext);
   const data = departmentList?.[0] || {};
  console.log("=== CsePage Debug ===");
  console.log("departmentList:", departmentList);
  console.log("data:", data);
  console.log("data.name:", data?.name);
  console.log("typeof data:", typeof data);
  console.log("===================");

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  
  return (
    ReactDOM.createPortal(
  <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
    <DepartmentLayout
      departmentName={data.name}
      heroImage={`${url}/uploads/${data.heroImage}`}
      sidebarNavItems={cseSidebarData}
      onBack={onBack}
      sidebarClassName="bg-blue-800 text-white border-blue-700"
    >
      <article className="space-y-16">

        {/* ABOUT SECTION */}
        <section id="about" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-200 pb-3 mb-4">About The Department</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{data.about}</p>
        </section>

        {/* VISION AND MISSION SECTION */}
        <section id="vision" className="scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-lg">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{data.vision}</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-r-lg">
                  <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      Our Mission
                  </h3>
                  <ul className="text-gray-700 leading-relaxed list-disc list-inside space-y-2">
                    {data.mission?.map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
              </div>
          </div>
        </section>
        
        {/* HOD MESSAGE SECTION */}
        <section id="hod-message" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-200 pb-3 mb-4">
            Message from the HOD
          </h2>
          <div className="flex flex-col items-center gap-8 bg-slate-50 p-8 rounded-2xl border border-gray-200">
            <img
              src={`${url}/uploads/${data.hodImage}`}
              alt={`HOD ${data.hodName}`}
              className="w-full h-80 rounded-lg object-contain shadow-lg shrink-0 border-4 border-white"
              // className="w-full max-w-sm h-auto rounded-lg object-contain shadow-lg border-4 border-white"
            />
            {/* <div className="flex flex-col items-center gap-6 bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-200">
               <img
                 src={data.hodImage}
                 alt={`HOD ${data.hodName}`}
                 className="w-full h-80 rounded-lg object-cover shadow-lg shrink-0 border-4 border-white"
               /> */}
            <div className="w-full text-left">
              <p className="font-Georgia, font-serif text-gray-800 leading-relaxed text-lg mb-6">
                {data.hodMessage}
              </p>
              <div>
                  <p className="font-semibold text-blue-800 text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {data.hodName}
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">
                    Head of Department
                  </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM STRUCTURE & SYLLABUS SECTION */}
        <section id="syllabus" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-200 pb-3 mb-6">Program Structure & Syllabus</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cseSidebarData.find(item => item.title.includes('Syllabus'))?.children?.map(s => <SyllabusCard key={s.title} title={s.title} href={s.href} />)}
            </div>
        </section>

        {/* FACULTY SECTION */}
        <section id="faculty" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-200 pb-3 mb-6">Our Faculty</h2>
            <div className="space-y-2">
              {data.faculty?.map((member: any, index: number) => (
                <div key={index} className="bg-blue-900 text-white rounded-lg p-4 flex items-center">
                  <span className="text-lg font-bold text-yellow-300 w-12 text-center">{member.sno}.</span>
                  <div className="flex-grow ml-4">
                    <p className="font-semibold text-white text-lg">{member.name}</p>
                    <p className="text-yellow-300">{member.designation}</p>
                  </div>
                </div>
              ))}
            </div>
        </section>

      </article>
    </DepartmentLayout>
      </div>,document.body)
  );
};

export default CsePage;




