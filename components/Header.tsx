import React, { useState, useEffect, useRef } from 'react';

// Import components
import AnimatedLogo from './AnimatedLogo';
import MobileMenuItem from './MobileMenuItem';
import { useVideo } from '../contexts/VideoContext';

// Import type definitions
import { NavItem, NavSubItem } from '../types/navigation';

// --- Navigation Data (Unchanged) ---
const navItems: NavItem[] = [
{
name: 'About Us',
link: '/about-us',
isMegaWithImage: true,
defaultImage: 'https://i.ibb.co/Y7bPd5y6/image.png',
sub: [
{
name: "Our Identity",
sub: [
{ name: 'Vission & Mission', link: '/visionmission', image: '' },
{ name: 'Administration', link: '/administration', image: 'https://i.ibb.co/PvHZ9D0q/image.png' },
{ name: 'Policies', link: '/policies', image: 'https://i.ibb.co/dw23gy1B/image.png' },
{ name: 'Best Practice', link: '/best-practices', image: 'https://i.ibb.co/xqFZGJp7/image.png' },
{ name: 'Empowering Strategies', link: '/empowering-strategies', image: '/images/strategies.jpg' }
]
},
{
name: "Messages",
sub: [
{ name: 'Chairman', link: '/chairman', image: '/images/leadership.jpg' },
{ name: 'Ceo', link: '/ceo', image: '/images/leadership.jpg' },
{ name: 'Rector', link: '/rector', image: '/images/leadership.jpg' },
{ name: 'Principal', link: '/principal', image: '/images/leadership.jpg' },
]
}
]
},
{
name: 'Accreditation',
link: '/accreditations',
isMegaWithImage: true,
defaultImage: 'https://i.ibb.co/93ctFFdH/image.png',
sub: [
{
name: "Quality & Recognition",
sub: [
{ name: 'Accreditations', link: '/accreditations', image: '/images/accreditations-main.jpg' },
{ name: 'Strategy Approvals', link: '/statutory-approvals', image: '/images/strategy.jpg' },
{ name: 'Centre of Excellence', link: '/center-of-excellence', image: '/images/excellence.jpg' },
{ name: 'Ranking and Certifications', link: '/rankings', image: '/images/rankings.jpg' },
{ name: 'Awards and Accolades', link: '/awards', image: '/images/awards.jpg' }
]
}
]
},
{
name: 'Academics',
link: '/academics',
isMegaWithImage: true,
defaultImage: '/images/headerpics/academics.jpeg',
sub: [
{
name: "Academic Programs",
image: '/images/academic-programs.jpg',
sub: [
{
name: 'Admissions',
link: '#',
opensDown: true,
sub: [
{ name: 'Courses Offered', link: '/courses-offered' },
{ name: 'Admissions Procedure', link: '/admissionsprocedure' },
{ name: 'Admission Lists', link: '/admissionslists' },
{ name: 'Course Outcomes', link: '/admissionsoutcomes' }
]
},
{ name: 'Academics Calendars', link: '/academics/calendars' },
{
name: 'Teaching Learning Process',
link: '#',
opensDown: true,
sub: [
{ name: 'Teaching Methodologies', link: '/teaching-methodologies' },
{ name: 'OBE Practices', link: '/tlp/obe' },
{ name: 'Special Programs - Student Diversity', link: '/student-diversity' },
{ name: 'Mentor - Mentee System', link: '/mentor-mentee' }
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
{
name: 'Placements',
link: '/placements',
isMegaWithImage: true,
defaultImage: '/images/headerpics/placements.jpeg',
sub: [
{
name: "Career Services",
sub: [
{ name: 'About T&P', link: '/placements/about-t', image: '/images/about-tp.jpg' },
{ name: 'Placement Details', link: '/placements/PlacementDetails', image: '/images/placement-details.jpg' },
{ name: 'Training Process', link: '/placements/TrainingProcess', image: '/images/training-process.jpg' },
{ name: 'Contact', link: '/placements/Contact', image: '/images/contact-placements.jpg' }
]
}
]
},
{
name: 'Governance',
link: '/governance',
isMegaWithImage: true,
defaultImage: 'https://i.ibb.co/DPd2b4n0/image.png',
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
{
name: 'Examinations',
link: '/examinations',
isMegaWithImage: true,
defaultImage: '/images/headerpics/examinations.jpeg',
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
defaultImage: '/images/headerpics/cells.jpeg',
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
}
];

const adminPanelLinks = [
{ name: 'ECAP', link: 'https://webprosindia.com/vignanit/', target: '_blank' },
{ name: 'V-TP', link: '#', target: '_self' },
{ name: 'Admin', link: '/admin-login', target: '_self' },
];

interface SubMenuItemProps {
item: NavSubItem;
onHover: () => void;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ item, onHover }) => {
const [isSubOpen, setIsSubOpen] = useState(false);
const hasNestedSubmenu = item.sub && item.sub.length > 0;
const opensDown = item.opensDown === true;

return (
    <li
        className={`group/submenu-item relative rounded-lg transition-colors duration-200 hover:bg-blue-100/60 ${isSubOpen ? 'z-30' : 'z-auto'}`}
        onMouseEnter={() => { onHover(); if (hasNestedSubmenu) setIsSubOpen(true); }}
        onMouseLeave={() => { if (hasNestedSubmenu) setIsSubOpen(false); }}
    >
        <a href={item.link} target={item.target} className="flex w-full items-center justify-between p-3 text-sm">
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
                    {item.sub?.map((nestedItem) => <SubMenuItem key={nestedItem.name} item={nestedItem} onHover={() => {}} />)}
                </ul>
            </div>
        )}
    </li>
);


};

interface HeaderProps {
onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
const [isScrolled, setIsScrolled] = useState(false);
const [activeMenu, setActiveMenu] = useState<NavItem | null>(null);
const [activeImage, setActiveImage] = useState<string | null>(null);
const [prevImage, setPrevImage] = useState<string | null>(null);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
const { playVideo } = useVideo(); // Get playVideo function from context

const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
const [isMobileAdminPanelOpen, setIsMobileAdminPanelOpen] = useState(false);
const mobileAdminPanelRef = useRef<HTMLDivElement>(null);
const adminMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

const handleMouseEnter = (item: NavItem) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    if (item.sub) {
        setActiveMenu(item);
        // Close admin panel when mega menu opens
        setIsAdminPanelOpen(false);
        if (adminMenuTimeoutRef.current) clearTimeout(adminMenuTimeoutRef.current);
        
        if (item.isMegaWithImage) {
            setActiveImage(item.defaultImage || null);
            setPrevImage(item.defaultImage || null);
        }
    } else {
        handleMouseLeave();
    }
};

const handleMouseLeave = () => { menuTimeoutRef.current = setTimeout(() => { setActiveMenu(null); setActiveImage(null); }, 200); };
const handleMenuContainerEnter = () => { if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current); };
const handleLinkHover = (image: string | null) => {
    if (image && image !== activeImage) {
        setPrevImage(activeImage);
        setActiveImage(image);
    }
};

const handleAdminPanelEnter = () => {
    if (adminMenuTimeoutRef.current) clearTimeout(adminMenuTimeoutRef.current);
    setIsAdminPanelOpen(true);
    // Close mega menu when admin panel opens
    setActiveMenu(null);
    setActiveImage(null);
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
};
const handleAdminPanelLeave = () => {
    adminMenuTimeoutRef.current = setTimeout(() => setIsAdminPanelOpen(false), 200);
};

useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (mobileAdminPanelRef.current && !mobileAdminPanelRef.current.contains(event.target as Node)) {
            setIsMobileAdminPanelOpen(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, [mobileAdminPanelRef]);

return (
    <>
        <style>{`
            @keyframes elegantCascade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } } 
            @keyframes slideIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes fadeInSimple { from { opacity: 0; } to { opacity: 1; } }
            .custom-scrollbar::-webkit-scrollbar { width: 6px; } 
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } 
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; } 
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
            .aspect-w-4 { position: relative; padding-bottom: 75%; }
            .aspect-h-3 { }
            .aspect-w-4 > * { position: absolute; height: 100%; width: 100%; top: 0; right: 0; bottom: 0; left: 0; }
            .mobile-menu-item { animation: slideIn 0.5s forwards; }
            .mobile-menu-item:nth-child(1) { animation-delay: 0.1s; }
            .mobile-menu-item:nth-child(2) { animation-delay: 0.15s; }
            .mobile-menu-item:nth-child(3) { animation-delay: 0.2s; }
            .mobile-menu-item:nth-child(4) { animation-delay: 0.25s; }
            .mobile-menu-item:nth-child(5) { animation-delay: 0.3s; }
            .mobile-menu-item:nth-child(6) { animation-delay: 0.35s; }
            .mobile-menu-item:nth-child(7) { animation-delay: 0.4s; }
            .mobile-menu-item:nth-child(8) { animation-delay: 0.45s; }
            .mobile-menu-item:nth-child(9) { animation-delay: 0.5s; }
            .mobile-menu-item:nth-child(10) { animation-delay: 0.55s; }
        `}</style>
        <header className="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out" onMouseLeave={() => { handleMouseLeave(); handleAdminPanelLeave(); }}>
            <div className="absolute top-0 left-0 right-0 h-full transition-all duration-300" style={{ background: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent', backdropFilter: isScrolled ? 'blur(10px)' : 'blur(10px)', boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' : 'none' }}></div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-16'}`}>
                    
                    {/* --- KEY FIX: Left Group (Logo + Main Nav) --- */}
                    <div className="flex items-center gap-x-6">
                        <div className="flex-shrink-0">
                            {/* Make logo clickable to play video */}
                            <AnimatedLogo 
                              isScrolled={isScrolled} 
                              logoSize={isScrolled ? 96 : 128} 
                              onClick={() => {
                                playVideo(); // Play the video when logo is clicked
                                if (onLogoClick) onLogoClick(); // Still call the original onLogoClick if provided
                              }} 
                            />
                        </div>
                         <nav className="hidden lg:flex lg:items-center lg:h-full lg:space-x-1">
                            {navItems.map((item) => (
                                <div key={item.name} className="h-full flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5" onMouseEnter={() => handleMouseEnter(item)}>
                                    <a href={item.link} target={item.target} className={`relative flex items-center px-4 py-2 font-medium rounded-lg whitespace-nowrap font-['Georgia',_serif] transition-all duration-300 text-blue-600 hover:text-blue ${activeMenu?.name === item.name && item.sub ? (isScrolled ? 'bg-slate-200 text-red-600' : 'bg-slate-200 text-blue-600') : (isScrolled ? "text-slate-700 hover:bg-slate-200 hover:text-blue-600" : "text-slate-700 hover:bg-slate-200 hover:text-blue-600 ")}`}>
                                        <span style={{ textShadow: !isScrolled ? '0 1px 3px rgba(0,0,0,0.3)' : 'none' }}>{item.name}</span>
                                        {item.sub && <svg className={`h-4 w-4 ml-1.5 transition-transform duration-300 ${activeMenu?.name === item.name ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>}
                                    </a>
                                </div>
                            ))}
                        </nav>
                    </div>
                    
                    {/* --- KEY FIX: Right Group (Admin Panel on Desktop, All Controls on Mobile) --- */}
                    <div className="flex items-center">
                        {/* Desktop Admin Panel */}
                        <div className="hidden lg:flex h-full items-center justify-center relative" onMouseEnter={handleAdminPanelEnter} onMouseLeave={handleAdminPanelLeave}>
                            <button className={`p-2 rounded-lg transition-colors duration-300 ${isScrolled ? "text-slate-700 hover:bg-slate-200" : "text-slate-700 hover:bg-slate-200"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className={`absolute top-full right-0 mt-2 w-56 transition-all duration-300 ease-in-out transform-gpu ${isAdminPanelOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <ul className="bg-white rounded-lg shadow-lg border border-slate-200/60 p-2 space-y-1">
                                    {adminPanelLinks.map(link => (
                                        <li key={link.name}>
                                            <a href={link.link} target={link.target} className="block px-4 py-2 text-sm text-slate-700 rounded-md hover:bg-blue-50 hover:text-blue-600">{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex items-center lg:hidden space-x-2">
                            <div className="relative" ref={mobileAdminPanelRef}>
                                <button
                                    onClick={() => setIsMobileAdminPanelOpen(!isMobileAdminPanelOpen)}
                                    className={`p-2 rounded-lg transition-colors duration-300 focus:outline-none ${isMobileAdminPanelOpen ? 'bg-blue-50' : 'hover:bg-slate-100'}`}
                                    aria-label="Toggle admin panel"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className={`absolute top-full right-0 mt-2 w-56 transition-all duration-300 ease-in-out transform-gpu ${isMobileAdminPanelOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                    <ul className="bg-white rounded-lg shadow-lg border border-slate-200/60 p-2 space-y-1">
                                        {adminPanelLinks.map(link => (
                                            <li key={link.name}>
                                                <a href={link.link} target={link.target} className="block px-4 py-2 text-sm text-slate-700 rounded-md hover:bg-blue-50 hover:text-blue-600">{link.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <button 
                                className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${isMobileMenuOpen ? 'bg-blue-50' : 'hover:bg-slate-100'}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Toggle navigation menu"
                            >
                                <span className="sr-only">Open main menu</span>
                                <div className="w-6 h-6 flex flex-col items-center justify-center relative">
                                    <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ease-out ${isMobileMenuOpen ? 'absolute rotate-45 bg-blue-600' : ''}`} style={{ transformOrigin: '50% 50%' }}></span>
                                    <span className={`block w-5 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 translate-x-8' : 'bg-slate-700'}`} style={{ marginTop: '6px', marginBottom: '6px' }}></span>
                                    <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ease-out ${isMobileMenuOpen ? 'absolute -rotate-45 bg-blue-600' : ''}`} style={{ transformOrigin: '50% 50%' }}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Mega Menu --- */}
            <div onMouseEnter={handleMenuContainerEnter} className={`absolute top-full left-0 right-0 z-10 transition-all duration-300 ease-in-out transform-gpu ${activeMenu ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-3 scale-98'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-white to-slate-100 rounded-b-2xl shadow-2xl shadow-slate-800/20 border-t border-slate-200/60 overflow-hidden">
                        {activeMenu && activeMenu.sub && (
                            <div className="flex">
                                <div className={`flex flex-1 gap-x-8 p-10 justify-start`}>
                                    {activeMenu.sub.map((column, index) => (
                                        <div key={column.name} className="px-5 border-l border-slate-200/80 first:border-l-0" style={{ animation: `elegantCascade 0.6s ${index * 0.08}s cubic-bezier(0.16, 1, 0.3, 1) forwards`, opacity: 0 }} onMouseEnter={() => handleLinkHover(column.image || null)}>
                                            <h3 className="text-base font-semibold text-slate-600 mb-5 font-['Georgia',_serif]">{column.name}</h3>
                                            <ul className="space-y-1">
                                                 {column.sub.map((link) => (<SubMenuItem key={link.name} item={link} onHover={() => handleLinkHover(link.image || column.image || (activeMenu.defaultImage || null))} />))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                {activeMenu.isMegaWithImage && (
                                    <div className="w-1/2 relative p-10 pl-0" style={{ animation: `elegantCascade 0.6s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards`, opacity: 0 }}>
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

            {/* --- Mobile Menu --- */}
            <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className={`fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl overflow-hidden transition-transform duration-500 ease-in-out lg:hidden ${isMobileMenuOpen ? 'transform-none' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-center">
                      <div className="block w-36">
                        <AnimatedLogo 
                          isScrolled={true} 
                          logoSize={64} 
                          onClick={() => playVideo()} // Play video on mobile logo click too
                        />
                      </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-slate-200 transition-colors" aria-label="Close menu"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="h-[calc(100vh-70px)] overflow-y-auto">
                    <nav className="p-4">
                        <div className="relative mb-6">
                            <input type="text" placeholder="Search..." className="w-full py-2 pl-10 pr-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <ul className="space-y-2">
                            {navItems.map((item, index) => (<li key={item.name} className="mobile-menu-item opacity-0" style={{ animationDelay: `${0.1 + index * 0.05}s` }}><MobileMenuItem item={item}/></li>))}
                        </ul>
                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <h3 className="text-xs font-semibold uppercase text-slate-500 mb-4 tracking-wider">Quick Links</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <a href="/login" className="flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>Login</a>
                                <a href="/contact" className="flex items-center justify-center py-3 px-4 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Contact</a>
                                <a href="/admissions/procedure" className="flex items-center justify-center py-3 px-4 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 012 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>Apply Now</a>
                                <a href="/campus-map" className="flex items-center justify-center py-3 px-4 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-colors shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>Campus Map</a>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center space-x-4 py-4">
                            <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors"><span className="sr-only">Facebook</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                            <a href="#" className="text-slate-600 hover:text-purple-600 transition-colors"><span className="sr-only">Instagram</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
                            <a href="#" className="text-slate-600 hover:text-blue-400 transition-colors"><span className="sr-only">Twitter</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
                            <a href="#" className="text-slate-600 hover:text-red-600 transition-colors"><span className="sr-only">YouTube</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg></a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    </>
);


};

export default Header;

