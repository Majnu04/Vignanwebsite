import React, { useState, useEffect } from 'react';

// Assuming AnimatedLogo component exists and works as intended
import AnimatedLogo from '../components/AnimatedLogo.tsx';


// --- *** THE 100% CORRECTED AND FINALIZED NAVIGATION DATA (VERSION 4) *** ---
const navItems = [
    // --- ABOUT US: Unchanged ---
    { 
        name: 'About Us', 
        link: '/about-us', 
        isMegaWithImage: true, 
        defaultImage: '/images/about-us-default.jpg', 
        sub: [
            { 
                name: "Our Identity", 
                sub: [
                    { name: 'Vission & Mission', link: '/vision-mission', image: '/images/vision.jpg' },
                    { 
                        name: 'Messages', 
                        link: '#', 
                        image: '/images/leadership.jpg', 
                        sub: [
                            { name: 'Chairman', link: '/messages/chairman' },
                            { name: 'CEO', link: '/messages/ceo' },
                            { name: 'Rector', link: '/messages/rector' },
                            { name: 'Principal', link: '/messages/principal' }
                        ] 
                    },
                    { name: 'Administration', link: '/administration', image: '/images/admin.jpg' },
                    { name: 'Policies', link: '/policies', image: '/images/policies.jpg' },
                    { name: 'Best Practice', link: '/best-practice', image: '/images/best-practice.jpg' },
                    { name: 'Empowering Strategies', link: '/empowering-strategies', image: '/images/strategies.jpg' }
                ] 
            }
        ] 
    },
    { name: 'ECAP', link: '/ecap' },
    // --- ACCREDITATION: Unchanged ---
    { 
        name: 'Accreditation', 
        link: '/accreditations', 
        isMegaWithImage: true, 
        defaultImage: '/images/accreditation-default.jpg',
        sub: [
            { 
                name: "Quality & Recognition", 
                sub: [
                    { name: 'Accreditations', link: '/accreditations-main', image: '/images/accreditations-main.jpg' },
                    { name: 'Strategy Approvals', link: '/strategy-approvals', image: '/images/strategy.jpg' },
                    { name: 'Centre of Excellence', link: '/centre-of-excellence', image: '/images/excellence.jpg' },
                    { name: 'Ranking and Certifications', link: '/rankings', image: '/images/rankings.jpg' },
                    { name: 'Awards and Accolades', link: '/awards', image: '/images/awards.jpg' }
                ] 
            }
        ] 
    },
    // --- ACADEMICS: MODIFIED - Added 'opensDown' to Admissions and TLP ---
    { 
        name: 'Academics', 
        link: '/academics', 
        isMegaWithImage: true,
        defaultImage: '/images/academics-default.jpg',
        sub: [
            { 
                name: "Academic Programs", 
                image: '/images/academic-programs.jpg',
                sub: [
                    { 
                        name: 'Admissions', 
                        link: '#',
                        opensDown: true, // <-- Make this sub-menu open downwards
                        sub: [
                            { name: 'Courses Offered', link: '/admissions/courses' },
                            { name: 'Admissions Procedure', link: '/admissions/procedure' },
                            { name: 'Admission Lists', link: '/admissions/lists' },
                            { name: 'Course Outcomes', link: '/admissions/outcomes' }
                        ] 
                    },
                    { name: 'Academics Calendars', link: '/academics/calendars' },
                    { 
                        name: 'Teaching Learning Process', 
                        link: '#',
                        opensDown: true, // <-- Make this sub-menu open downwards
                        sub: [
                            { name: 'Teaching Methodologies', link: '/tlp/methodologies' },
                            { name: 'OBE Practices', link: '/tlp/obe' },
                            { name: 'Special Programs - Student Diversity', link: '/tlp/special-programs' },
                            { name: 'Mentor - Mentee System', link: '/tlp/mentor-mentee' }
                        ] 
                    }
                ] 
            },
            { 
                name: "Student & Curriculum", 
                image: '/images/student-curriculum.jpg',
                sub: [
                    { name: 'Internship Manual', link: '/academics/internship-manual' },
                    { name: 'Exit Students Feedback', link: '/academics/feedback' },
                    { name: 'MoUs- Academics', link: '/academics/mous' },
                    { name: 'Extra Curricular Activities', link: '/academics/extra-curricular' },
                    { name: 'POSs, PEOs and PSOs', link: '/academics/pos-peos' },
                    { name: 'Curriculum Design Process', link: '/academics/curriculum-design' },
                    { name: 'Internship Projects and Research Projects', link: '/academics/projects' },
                    { name: 'Strategic Plan', link: '/academics/strategic-plan' }
                ] 
            }
        ] 
    },
    // --- PLACEMENTS: Unchanged ---
    { 
        name: 'Placements', 
        link: '/placements', 
        isMegaWithImage: true, 
        defaultImage: '/images/placements-default.jpg',
        sub: [
            { 
                name: "Career Services", 
                sub: [
                    { name: 'About T&P', link: '/placements/about', image: '/images/about-tp.jpg' },
                    { name: 'Placement Details', link: '/placements/details', image: '/images/placement-details.jpg' },
                    { name: 'Training Process', link: '/placements/training', image: '/images/training-process.jpg' },
                    { name: 'Contact', link: '/placements/contact', image: '/images/contact-placements.jpg' }
                ] 
            }
        ] 
    },
    // --- GOVERNANCE: Unchanged ---
    { 
        name: 'Governance', 
        link: '/governance', 
        isMegaWithImage: true, 
        defaultImage: '/images/governance-default.jpg',
        sub: [
            { 
                name: "Core Structure",
                image: '/images/core-structure.jpg',
                sub: [
                    { name: 'Organizational Structure', link: '/governance/org-structure' },
                    { name: 'Governing Body', link: '/governance/governing-body' },
                    { name: 'Academic Council', link: '/governance/academic-council' },
                    { name: 'Finance Committee', link: '/governance/finance-committee' }
                ] 
            },
            {
                name: "Committees",
                image: '/images/committees-default.jpg',
                sub: [
                    {
                        name: "Non Statutory Committees",
                        link: '#',
                        opensDown: true,
                        isScrollable: true,
                        sub: [
                            { name: 'Planning and Monitoring committee (PMC)', link: '/committees/pmc' },
                            { name: 'Academic Planning and Monitoring committee (APMC)', link: '/committees/apmc' },
                            { name: 'Admission Advisory committee (AAC)', link: '/committees/aac' },
                            { name: 'Research & Development Advisory committee (R&D AC)', link: '/committees/rnd-ac' },
                            { name: 'Examination Evaluation Committee (EEC)', link: '/committees/eec' },
                            { name: 'Training and Placement Committee (T&PC)', link: '/committees/tpc' },
                            { name: 'Code of Conduct Monitoring Committee (CCMC)', link: '/committees/ccmc' },
                            { name: 'Grievance Redressal Committee (GRC)', link: '/committees/grc' },
                            { name: 'Internal Complaints Committee (ICC)', link: '/committees/icc' },
                            { name: 'Purchase Committee (PC)', link: '/committees/pc' },
                            { name: 'Library Advisory Committee (LAC)', link: '/committees/lac' },
                            { name: 'Hostel Management Committee (HMC)', link: '/committees/hmc' },
                            { name: 'Research Ethics Committee (REC)', link: '/committees/rec' },
                            { name: 'SC & ST Committee (SC&ST C)', link: '/committees/sc-st' },
                            { name: 'Student Activity Committee (SAC)', link: '/committees/sac' },
                            { name: 'Student Welfare Committee (SWC)', link: '/committees/swc' },
                            { name: 'Anti Ragging Committee (ARC)', link: '/committees/arc' },
                            { name: 'Academic and Administrative Audit Committee (AAAC)', link: '/committees/aaac' },
                            { name: 'Department Development Committee (DDC)', link: '/committees/ddc' }
                        ]
                    }
                ]
            }
        ] 
    },
    // --- EXAMINATIONS & CELLS: Unchanged ---
    { 
        name: 'Examinations', 
        link: '/examinations', 
        isMegaWithImage: true, 
        defaultImage: '/images/exams-default.jpg',
        sub: [
            { 
                name: "Exam Cell & Resources", 
                sub: [
                    { name: 'About ExamCell', link: '/exams/about', image: '/images/exam-cell.jpg' },
                    { name: 'Results', link: '/exams/results', image: '/images/results.jpg' },
                    { name: 'Time Tables', link: '/exams/timetables', image: '/images/timetables.jpg' },
                    { name: 'Notifications', link: '/exams/notifications', image: '/images/notifications.jpg' },
                    { name: 'IT Reforms', link: '/exams/it-reforms', image: '/images/it-reforms.jpg' },
                    { name: 'Examination Manual', link: '/exams/manual', image: '/images/exam-manual.jpg' }
                ] 
            }
        ] 
    },
    { 
        name: 'Cells', 
        link: '#', 
        isMegaWithImage: true, 
        defaultImage: '/images/cells-default.jpg',
        sub: [
            { 
                name: 'Innovation & Development', 
                sub: [
                    { name: 'Discipline Cell', link: '/cells/discipline', image: '/images/cell-discipline.jpg' },
                    { name: 'ED Cell', link: '/cells/edc', image: '/images/cell-edc.jpg' },
                    { name: 'Idea Lab', link: '/cells/idea-lab', image: '/images/cell-idealab.jpg' },
                    { name: 'IIC Cell', link: '/cells/iic', image: '/images/cell-iic.jpg' },
                    { name: 'IPR Cell', link: '/cells/ipr', image: '/images/cell-ipr.jpg' },
                    { name: 'Research Cell', link: '/cells/research', image: '/images/cell-research.jpg' },
                    { name: 'Skill Development Lab', link: '/cells/skill-dev', image: '/images/cell-skilldev.jpg' }
                ] 
            },
            { 
                name: 'Student & Community', 
                sub: [
                    { name: 'Green Club', link: '/cells/green-club', image: '/images/cell-green.jpg' },
                    { name: 'International Student Cell', link: '/cells/international', image: '/images/cell-international.jpg' },
                    { name: 'IEEE Chapter', link: '/cells/ieee', image: '/images/cell-ieee.jpg' },
                    { name: 'Media Cell', link: '/cells/media', image: '/images/cell-media.jpg' },
                    { name: 'NSS Unit', link: '/cells/nss', image: '/images/cell-nss.jpg' },
                    { name: 'Student Activity Council', link: '/cells/sac', image: '/images/cell-sac.jpg' },
                    { name: 'WEP Cell', link: '/cells/wep', image: '/images/cell-wep.jpg' }
                ] 
            }
        ] 
    },
];

// --- Sub-menu Item Component (Unchanged) ---
const SubMenuItem = ({ item, onHover }) => {
    const [isSubOpen, setIsSubOpen] = useState(false);
    const hasNestedSubmenu = item.sub && item.sub.length > 0;
    const opensDown = item.opensDown === true;

    return (
        <li
            className={`group/submenu-item relative rounded-lg transition-colors duration-200 hover:bg-blue-100/60 ${isSubOpen ? 'z-30' : 'z-auto'}`}
            onMouseEnter={() => { onHover(); if (hasNestedSubmenu) setIsSubOpen(true); }}
            onMouseLeave={() => { if (hasNestedSubmenu) setIsSubOpen(false); }}
        >
            <a href={item.link} className="flex w-full items-center justify-between p-3 text-sm">
                <span className="absolute -left-3 top-1/2 h-2/3 w-1 rounded-full bg-blue-500 transition-all duration-300 ease-in-out transform -translate-y-1/2 scale-y-0 group-hover/submenu-item:scale-y-100"></span>
                <span className="font-medium text-slate-700 group-hover/submenu-item:text-blue-700">{item.name}</span>
                {hasNestedSubmenu && <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d={opensDown ? "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" : "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"} clipRule="evenodd" /></svg>}
            </a>
            {hasNestedSubmenu && (
                <div className={`absolute w-auto min-w-[250px] transition-all duration-300 ease-in-out transform-gpu
                    ${opensDown
                        ? `top-full left-0 mt-2 ${isSubOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`
                        : `-top-2.5 left-full ml-2 ${isSubOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}`
                    }`}
                >
                    <ul 
                        className={`bg-gradient-to-br from-white to-slate-100 rounded-xl shadow-2xl shadow-slate-800/20 border border-slate-200/60 p-2 space-y-1 ${item.isScrollable ? 'custom-scrollbar' : ''}`}
                        style={item.isScrollable ? { maxHeight: 'calc(50vh - 100px)', overflowY: 'auto' } : {}}
                    >
                        {item.sub.map((nestedItem) => <SubMenuItem key={nestedItem.name} item={nestedItem} onHover={() => {}} />)}
                    </ul>
                </div>
            )}
        </li>
    );
};

// --- Main Header Component (Unchanged) ---
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [prevImage, setPrevImage] = useState(null);
    let menuTimeout;

    const handleMouseEnter = (item) => {
        clearTimeout(menuTimeout);
        if (item.sub) {
            setActiveMenu(item);
            if (item.isMegaWithImage) {
                setActiveImage(item.defaultImage);
                setPrevImage(item.defaultImage);
            }
        } else {
            handleMouseLeave();
        }
    };
    
    const handleMouseLeave = () => { 
        menuTimeout = setTimeout(() => { 
            setActiveMenu(null); 
            setActiveImage(null); 
        }, 200); 
    };
    
    const handleMenuContainerEnter = () => clearTimeout(menuTimeout);
    
    const handleLinkHover = (image) => {
        if (image && image !== activeImage) {
            setPrevImage(activeImage);
            setActiveImage(image);
        }
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <>
            <style>{`
                @keyframes elegantCascade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } } 
                .custom-scrollbar::-webkit-scrollbar { width: 6px; } 
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } 
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; } 
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
                .aspect-w-4 { position: relative; padding-bottom: 75%; }
                .aspect-h-3 { }
                .aspect-w-4 > * { position: absolute; height: 100%; width: 100%; top: 0; right: 0; bottom: 0; left: 0; }
            `}</style>
            <header className="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out" onMouseLeave={handleMouseLeave}>
                <div className="absolute top-0 left-0 right-0 h-full transition-all duration-300" style={{ background: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent', backdropFilter: isScrolled ? 'blur(10px)' : 'none', boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' : 'none' }}></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
                        <div className="flex-shrink-0"><a href="/" aria-label="Home"><AnimatedLogo isScrolled={isScrolled} logoSize={isScrolled ? 96 : 128} /></a></div>
                        <nav className="hidden lg:flex lg:items-center lg:h-full lg:space-x-1">
                            {navItems.map((item) => (
                                <div key={item.name} className="h-full flex items-center transition-transform duration-300 hover:-translate-y-0.5" onMouseEnter={() => handleMouseEnter(item)}>
                                    <a href={item.link} className={`relative flex items-center px-4 py-2 font-medium rounded-lg whitespace-nowrap font-['Georgia',_serif] transition-all duration-300 ${activeMenu?.name === item.name && item.sub ? (isScrolled ? 'bg-slate-200 text-blue-600' : 'bg-white/20 text-white') : (isScrolled ? "text-slate-700 hover:bg-slate-200 hover:text-blue-600" : "text-white/90 hover:text-white hover:bg-white/10")}`}>
                                        <span style={{ textShadow: !isScrolled ? '0 1px 3px rgba(0,0,0,0.3)' : 'none' }}>{item.name}</span>
                                        {item.sub && <svg className={`h-4 w-4 ml-1.5 transition-transform duration-300 ${activeMenu?.name === item.name ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>}
                                    </a>
                                </div>
                            ))}
                        </nav>
                        <div className="flex items-center space-x-2"></div>
                    </div>
                </div>

                <div onMouseEnter={handleMenuContainerEnter} className={`absolute top-full left-0 right-0 z-10 transition-all duration-300 ease-in-out transform-gpu ${activeMenu ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-3 scale-98'}`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-br from-white to-slate-100 rounded-b-2xl shadow-2xl shadow-slate-800/20 border-t border-slate-200/60 overflow-hidden">
                            {activeMenu && (
                                <div className="flex">
                                    <div className={`flex flex-1 gap-x-8 p-10 justify-start`}>
                                        {activeMenu.sub.map((column, index) => (
                                            <div 
                                                key={column.name} 
                                                className="px-5 border-l border-slate-200/80 first:border-l-0" 
                                                style={{ animation: `elegantCascade 0.6s ${index * 0.08}s cubic-bezier(0.16, 1, 0.3, 1) forwards`, opacity: 0 }}
                                                onMouseEnter={() => handleLinkHover(column.image || null)}
                                            >
                                                <h3 className="text-base font-semibold text-slate-600 mb-5 font-['Georgia',_serif]">{column.name}</h3>
                                                <ul className="space-y-1">
                                                     {column.sub.map((link) => (
                                                        <SubMenuItem 
                                                            key={link.name} 
                                                            item={link} 
                                                            onHover={() => handleLinkHover(link.image || column.image || activeMenu.defaultImage)}
                                                        />
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {activeMenu.isMegaWithImage && (
                                        <div 
                                            className="w-2/5 relative p-10 pl-0" 
                                            style={{ animation: `elegantCascade 0.6s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards`, opacity: 0 }}
                                        >
                                            <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg w-full h-full">
                                                {prevImage && <img src={prevImage} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeImage === prevImage ? 'opacity-100' : 'opacity-0'}`} />}
                                                {activeImage && <img src={activeImage} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeImage !== prevImage ? 'opacity-100' : 'opacity-0'}`} />}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;