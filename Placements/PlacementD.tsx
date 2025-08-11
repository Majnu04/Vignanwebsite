import { CSSProperties, memo, useCallback, useEffect, useMemo, useState, useRef } from 'react';

// --- Type Definitions & ALL ORIGINAL DATA ---
interface PlacementYearData { academicYear: string; totalStrength: number; studentsPlaced: number; higherEducation: number; entrepreneurs: number; placementPercentage: number; }
interface Department { name: string; program: 'ug' | 'pg'; caption: string; imageUrl: string; highestPackage: string; averagePackage: string; placed: number; }
interface Recruiter { name: string; logoUrl: string; }

// You can now add more years here, and the component will adapt automatically
const placementData: PlacementYearData[] = [
    { academicYear: '2024 - 2025*', totalStrength: 1647, studentsPlaced: 1215, higherEducation: 13, entrepreneurs: 0, placementPercentage: 75 },
    { academicYear: '2023 - 2024', totalStrength: 1447, studentsPlaced: 1143, higherEducation: 19, entrepreneurs: 4, placementPercentage: 80.58 },
    { academicYear: '2022 - 2023', totalStrength: 1296, studentsPlaced: 1104, higherEducation: 19, entrepreneurs: 6, placementPercentage: 87.11 },
    { academicYear: '2021 - 2022', totalStrength: 1220, studentsPlaced: 1011, higherEducation: 40, entrepreneurs: 7, placementPercentage: 86.72 },
    { academicYear: '2020 - 2021', totalStrength: 1268, studentsPlaced: 1051, higherEducation: 40, entrepreneurs: 8, placementPercentage: 86.67 },
    
    // Example: Add more years below to test the new scalable timeline
    // { academicYear: '2019 - 2020', totalStrength: 1200, studentsPlaced: 950, higherEducation: 35, entrepreneurs: 5, placementPercentage: 82.08 },
    // { academicYear: '2018 - 2019', totalStrength: 1150, studentsPlaced: 900, higherEducation: 30, entrepreneurs: 4, placementPercentage: 80.87 },
];

const departmentData: Department[] = [
    { program: 'ug', name: "CSE", caption: "Computer Science & Engineering", imageUrl: "https://vignaniit.edu.in/images/placement/CSE_01-%20NEW%20copy.jpg", highestPackage: "50 LPA", averagePackage: "6.43 LPA", placed: 257 },
    { program: 'ug', name: "IT", caption: "Information Technology", imageUrl: "https://vignaniit.edu.in/images/placement/IT%20copy.jpg", highestPackage: "26 LPA", averagePackage: "5.1 LPA", placed: 55 },
    { program: 'ug', name: "ECE", caption: "Electronics & Communication", imageUrl: "https://vignaniit.edu.in/images/placement/ECE_01-%20copy.jpg", highestPackage: "9.5 LPA", averagePackage: "4.23 LPA", placed: 275 },
    { program: 'ug', name: "AI&DS", caption: "Artificial Intelligence & Data Science", imageUrl: "https://vignaniit.edu.in/images/placement/AI&DS-%20copy.jpg", highestPackage: "37 LPA", averagePackage: "5.8 LPA", placed: 146 },
    { program: 'ug', name: "EEE", caption: "Electrical & Electronics", imageUrl: "https://vignaniit.edu.in/images/placement/EEE-%20copy.jpg", highestPackage: "9.0 LPA", averagePackage: "4.0 LPA", placed: 263 },
    { program: 'ug', name: "MECH", caption: "Mechanical Engineering", imageUrl: "https://vignaniit.edu.in/images/placement/MECH-%20copy.jpg", highestPackage: "10.44 LPA", averagePackage: "3.48 LPA", placed: 303 },
    { program: 'ug', name: "ECM", caption: "Electronics & Computer", imageUrl: "https://vignaniit.edu.in/images/placement/ECM_01-%20copy.jpg", highestPackage: "12 LPA", averagePackage: "4.56 LPA", placed: 45 },
    { program: 'ug', name: "CIVIL", caption: "Civil Engineering", imageUrl: "https://vignaniit.edu.in/images/placement/civil%20copy.jpg", highestPackage: "9.5 LPA", averagePackage: "3.55 LPA", placed: 146 },
    { program: 'pg', name: "MCA", caption: "Master of Computer Applications", imageUrl: "https://vignaniit.edu.in/images/placement/MCA%20copy.jpg", highestPackage: "06 LPA", averagePackage: "4.5 LPA", placed: 75 },
    { program: 'pg', name: "MBA", caption: "Master of Business Administration", imageUrl: "https://vignaniit.edu.in/images/placement/MBA%20copy.jpg", highestPackage: "06 LPA", averagePackage: "5.37 LPA", placed: 96 },
];

const topRecruiters: Recruiter[] = [
    { name: 'Amazon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' }, { name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' }, { name: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' }, { name: 'Infosys', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' }, { name: 'TCS', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' }, { name: 'Wipro', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg' }, { name: 'Accenture', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg' }, { name: 'Capgemini', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Capgemini_Logo.svg/2560px-Capgemini_Logo.svg.png' }
];

// --- Custom Hooks ---
const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        if (media.matches !== matches) setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

const useAnimatedCounter = (target: number, duration = 1500): number => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = count;
        const end = target;
        if (start === end) return;
        let startTime: number | null = null;
        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.floor(easedProgress * (end - start) + start);
            setCount(currentVal);
            if (progress < 1) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    }, [target, duration]);
    return count;
};

// --- Style Objects ---
const styles: { [key: string]: CSSProperties } = {
    container: { fontFamily: "'Sora', sans-serif", backgroundColor: '#f4f7fc', color: '#111', overflowX: 'hidden' },
    section: { padding: '6rem 2rem' },
    sectionMobile: { padding: '4rem 1rem' },
    heroSection: { background: 'linear-gradient(135deg, #1a2a6c, #0d324d)', color: 'white', textAlign: 'center' },
    heroTitle: { fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 600, marginBottom: '1rem', letterSpacing: '-2px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' },
    heroSubtitle: { fontSize: '1.2rem', opacity: 0.8, maxWidth: '750px', margin: '0 auto 3rem', lineHeight: 1.6 },
    heroStats: { display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 2rem)', flexWrap: 'wrap' },
    statCard: { background: 'rgba(255,255,255,0.05)', padding: 'clamp(1rem, 4vw, 2rem)', borderRadius: '20px', minWidth: '240px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transition: 'transform 0.3s' },
    statValue: { fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600 },
    statLabel: { fontSize: '0.9rem', opacity: 0.7, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' },
    
    timelineSection: { backgroundColor: '#fff', padding: '6rem 0', boxShadow: '0 -20px 50px rgba(0,0,0,0.05)' },
    sectionTitle: { fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center', marginBottom: '1rem', fontWeight: 600 },
    sectionSubtitle: { textAlign: 'center', fontSize: '1.1rem', color: '#555', maxWidth: '600px', margin: '0 auto 4rem', lineHeight: 1.6 },
    timeline: { position: 'relative', width: '90%', maxWidth: '1000px', margin: '0 auto', height: '80px', display: 'flex', alignItems: 'center' },
    timelineTrack: { position: 'absolute', width: '100%', height: '4px', backgroundColor: '#e0e7ff', borderRadius: '2px' },
    timelineSpotlight: { position: 'absolute', top: '50%', height: '50px', width: '50px', background: 'radial-gradient(circle, rgba(13, 110, 253, 0.3) 0%, rgba(13, 110, 253, 0) 70%)', borderRadius: '50%', transform: 'translate(-50%, -50%)', transition: 'left 0.5s cubic-bezier(0.65, 0, 0.35, 1)' },
    timelineStop: { position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' },
    stopDot: { height: '12px', width: '12px', borderRadius: '50%', backgroundColor: '#a5b4fc', transition: 'transform 0.3s, background-color 0.3s' },
    stopDotActive: { backgroundColor: '#3b82f6', transform: 'scale(1.5)' },
    stopLabel: { fontWeight: 600, fontSize: '1rem', color: '#4b5563', transition: 'color 0.3s', whiteSpace: 'nowrap' },
    stopLabelActive: { color: '#1d4ed8' },
    
    yearlySnapshot: { display: 'flex', justifyContent: 'center', alignItems: 'stretch', gap: '2rem', flexWrap: 'wrap', padding: '0 2rem', marginTop: '2rem', animation: 'fadeIn 0.5s ease' },
    snapshotCard: { flex: '1', minWidth: '220px', background: 'transparent', padding: '1rem', textAlign: 'center' },
    snapshotValue: { fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600, color: '#1a3b5d' },
    snapshotLabel: { color: '#6c757d', marginTop: '0.5rem', fontWeight: 500 },
    
    departmentSection: { backgroundColor: '#f4f7fc', padding: '6rem 0' },
    departmentContainer: { display: 'flex', maxWidth: '1400px', margin: '0 auto', background: '#fff', borderRadius: '30px', boxShadow: '0 20px 60px rgba(28, 48, 70, 0.1)', minHeight: '600px', overflow: 'hidden' },
    departmentContainerMobile: { flexDirection: 'column', minHeight: 'auto' },
    departmentSidebar: { flex: '0 0 40%', borderRight: '1px solid #e9ecef', padding: 'clamp(1.5rem, 4vw, 3rem)' },
    departmentSidebarMobile: { width: '100%', borderRight: 'none', padding: '1.5rem', borderBottom: '1px solid #e9ecef' },
    departmentTabs: { display: 'flex', gap: '1rem', marginBottom: '1.5rem' },
    deptTabButton: { padding: '0.8rem 1.5rem', cursor: 'pointer', fontWeight: 600, borderRadius: '30px', border: '1px solid #d1d5db', background: 'transparent', color: '#4b5563', transition: 'all 0.3s ease', whiteSpace: 'nowrap' },
    deptTabButtonActive: { background: '#3b82f6', color: '#fff', borderColor: '#3b82f6', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)' },
    departmentList: { display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' },
    deptListItem: { width: '100%', textAlign: 'left', padding: '1rem 1.5rem', cursor: 'pointer', fontWeight: 500, borderRadius: '12px', color: '#374151', background: 'transparent', transition: 'background-color 0.3s, color 0.3s, transform 0.2s' },
    deptListItemActive: { backgroundColor: '#e0e7ff', color: '#1e3a8a', fontWeight: 600 },
    
    deptDetailView: { flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer' },
    detailContent: { position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(2rem, 5vw, 4rem)', animation: 'fadeIn 0.8s ease' },
    detailImage: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, transition: 'transform 8s ease-in-out, opacity 0.8s ease' },
    detailOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0, 10, 30, 0.85) 0%, transparent 60%)', zIndex: 2 },
    detailTextContainer: { position: 'relative', zIndex: 3, color: '#fff' },
    detailCaption: { fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' },
    detailStatsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' },
    detailStatCard: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', padding: '1.2rem', borderRadius: '16px', textAlign: 'center' },
    detailStatValue: { fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600 },
    enlargeIcon: { position: 'absolute', top: '20px', right: '20px', zIndex: 4, background: 'rgba(255,255,255,0.1)', color: '#fff', backdropFilter: 'blur(5px)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s, transform 0.3s', opacity: 0 },
    
    recruiterSection: { position: 'relative', padding: '8rem 0', backgroundColor: '#111' },
    logoWall: { display: 'flex', flexDirection: 'column', gap: '1.5rem', maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)', overflow: 'hidden' },
    logoRow: { display: 'flex', gap: '1.5rem', width: 'fit-content' },
    recruiterLogoContainer: { height: '70px', aspectRatio: '3 / 2', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '12px', padding: '0.5rem', transition: 'transform 0.3s ease-in-out' },
    recruiterLogo: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },

    modalBackdrop: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.3s ease' },
    modalContent: { width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', borderRadius: '16px', background: '#fff' },
    modalImage: { display: 'block', width: '100%', height: 'auto', objectFit: 'contain' },
    modalCloseButton: { position: 'fixed', top: '20px', right: '20px', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s, background-color 0.3s' },
};

// --- Child Components ---
const ImageModal = memo(({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => (
    <div style={styles.modalBackdrop} onClick={onClose}>
         <button style={{...styles.modalCloseButton, ':hover': { transform: 'scale(1.1)', backgroundColor: 'rgba(0,0,0,0.5)' } as CSSProperties }} onClick={onClose}>×</button>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={imageUrl} alt="Enlarged placement view" style={styles.modalImage} />
        </div>
    </div>
));

const AnimatedStatCard = memo(({ value, label, suffix = '' }: { value: number; label: string; suffix?: string; }) => {
    const animatedValue = useAnimatedCounter(value);
    return (
        <div style={styles.statCard} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={styles.statValue}>{animatedValue}{suffix}</div>
            <div style={styles.statLabel}>{label}</div>
        </div>
    );
});

const YearTimeline = memo(({ onSelect, activeIndex, isScrollable }: { onSelect: (index: number) => void; activeIndex: number; isScrollable: boolean }) => {
    const [spotlightLeft, setSpotlightLeft] = useState('0%');
    const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const activeStop = stopRefs.current[activeIndex];
        if (activeStop) {
            setSpotlightLeft(`${activeStop.offsetLeft}px`);
        }
    }, [activeIndex]);

    if (isScrollable) {
        return (
            <div style={{...styles.departmentList, flexDirection: 'row', overflowX: 'auto', padding: '0 1rem', justifyContent: 'flex-start'}}>
                {placementData.map((year, index) => (
                    <button key={year.academicYear} onClick={() => onSelect(index)} style={index === activeIndex ? {...styles.deptTabButton, ...styles.deptTabButtonActive} : styles.deptTabButton}>
                        {year.academicYear}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div style={styles.timeline}>
            <div style={styles.timelineTrack}></div>
            <div style={{...styles.timelineSpotlight, left: spotlightLeft }}></div>
            {placementData.map((year, index) => (
                <div key={year.academicYear}
                    ref={el => stopRefs.current[index] = el}
                    style={{...styles.timelineStop, left: `${2.5 + (index / (placementData.length - 1)) * 95}%`}}
                    onClick={() => onSelect(index)}>
                    <div style={index === activeIndex ? {...styles.stopDot, ...styles.stopDotActive} : styles.stopDot}></div>
                    <span style={index === activeIndex ? {...styles.stopLabel, ...styles.stopLabelActive} : styles.stopLabel}>{year.academicYear}</span>
                </div>
            ))}
        </div>
    );
});

const DepartmentDetailView = memo(({ department, onImageClick }: { department: Department | null; onImageClick: (url: string) => void; }) => {
    const [isHovered, setIsHovered] = useState(false);
    if (!department) return null;
    return (
        <div style={styles.deptDetailView} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onImageClick(department.imageUrl)}>
            <div style={{...styles.enlargeIcon, opacity: isHovered ? 1 : 0, transform: isHovered ? 'scale(1)' : 'scale(0.8)'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6"/></svg>
            </div>
            <div key={department.name} style={styles.detailContent}>
                <img src={department.imageUrl} alt="" style={{ ...styles.detailImage, transform: isHovered ? 'scale(1.1)' : 'scale(1)' }} />
                <div style={styles.detailOverlay}></div>
                <div style={styles.detailTextContainer}>
                    <h3 style={styles.detailCaption}>{department.caption}</h3>
                    <div style={styles.detailStatsGrid}>
                        <div style={styles.detailStatCard}><div style={styles.detailStatValue}>{department.highestPackage}</div><span style={{fontSize: '0.9rem'}}>Highest</span></div>
                        <div style={styles.detailStatCard}><div style={styles.detailStatValue}>{department.averagePackage}</div><span style={{fontSize: '0.9rem'}}>Average</span></div>
                        <div style={styles.detailStatCard}><div style={styles.detailStatValue}>{department.placed}</div><span style={{fontSize: '0.9rem'}}>Placed</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const LogoWall = memo(() => (
    <div style={styles.logoWall}>
        {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div key={rowIndex} style={{...styles.logoRow, animation: `scroll ${rowIndex % 2 === 0 ? 70 : 85}s linear infinite ${rowIndex % 2 === 0 ? 'reverse' : ''}` }}>
                {[...topRecruiters, ...topRecruiters].map((r, i) => (
                    <div key={`${r.name}-${i}-${rowIndex}`} style={styles.recruiterLogoContainer} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        <img src={r.logoUrl} alt={r.name} style={styles.recruiterLogo} />
                    </div>
                ))}
            </div>
        ))}
    </div>
));

// --- Main Parent Component ---
const PlacementD = () => {
    const isMobile = useMediaQuery('(max-width: 992px)');
    // This threshold determines when to switch from the 'spotlight' timeline to the 'scrollable' one.
    const timelineThreshold = 7; 
    const useScrollableTimeline = isMobile || placementData.length >= timelineThreshold;

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeProgram, setActiveProgram] = useState<'ug' | 'pg'>('ug');
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
    
    const selectedYear = placementData[activeIndex];
    const filteredDepts = useMemo(() => departmentData.filter(d => d.program === activeProgram), [activeProgram]);
    const [selectedDept, setSelectedDept] = useState<Department | null>(null);
    
    useEffect(() => {
        const firstDeptInProgram = departmentData.find(d => d.program === activeProgram);
        setSelectedDept(firstDeptInProgram || null);
    }, [activeProgram]);

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerHTML = `
            @import url('https://api.fontshare.com/v2/css?f[]=clash-display@600&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap');
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        `;
        document.head.appendChild(styleSheet);
        return () => { document.head.removeChild(styleSheet) };
    }, []);

    const commonSectionStyle = isMobile ? {...styles.section, ...styles.sectionMobile} : styles.section;
    const totalPlaced = useMemo(() => placementData.reduce((sum, year) => sum + year.studentsPlaced, 0), []);
    const highestEverPackage = useMemo(() => Math.max(...departmentData.map(d => parseFloat(d.highestPackage))), []);

    return (
        <div style={styles.container}>
            {modalImageUrl && <ImageModal imageUrl={modalImageUrl} onClose={() => setModalImageUrl(null)} />}

            <section style={{...commonSectionStyle, ...styles.heroSection}}>
                <h1 style={styles.heroTitle}>Placement Success</h1>
                <p style={styles.heroSubtitle}>Consistently transforming ambitious students into successful professionals for global industries.</p>
                <div style={styles.heroStats}>
                    {/* The label is now dynamic based on the length of the placementData array */}
                    <AnimatedStatCard value={totalPlaced} label={`Total Placed (${placementData.length} Yrs)`} />
                    <AnimatedStatCard value={highestEverPackage} label="Highest Salary" suffix=" LPA" />
                    <AnimatedStatCard value={topRecruiters.length * 10} label="Recruiting Partners" suffix="+" />
                </div>
            </section>

            <section style={styles.timelineSection}>
                <h2 style={styles.sectionTitle}>Year-over-Year Growth</h2>
                <p style={styles.sectionSubtitle}>Select a year to see our detailed placement statistics and track our consistent performance over time.</p>
                <YearTimeline onSelect={setActiveIndex} activeIndex={activeIndex} isScrollable={useScrollableTimeline} />
                <div key={selectedYear.academicYear} style={styles.yearlySnapshot}>
                    <div style={styles.snapshotCard}><div style={styles.snapshotValue}>{useAnimatedCounter(selectedYear.studentsPlaced)}</div><div style={styles.snapshotLabel}>Students Placed</div></div>
                    <div style={styles.snapshotCard}><div style={styles.snapshotValue}>{useAnimatedCounter(Math.round(selectedYear.placementPercentage))}%</div><div style={styles.snapshotLabel}>Placement Rate</div></div>
                    <div style={styles.snapshotCard}><div style={styles.snapshotValue}>{useAnimatedCounter(selectedYear.higherEducation)}</div><div style={styles.snapshotLabel}>Higher Education</div></div>
                    <div style={styles.snapshotCard}><div style={styles.snapshotValue}>{useAnimatedCounter(selectedYear.entrepreneurs)}</div><div style={styles.snapshotLabel}>Entrepreneurs</div></div>
                </div>
            </section>
            
            <section style={styles.departmentSection}>
                 <div style={isMobile ? {...styles.departmentContainer, ...styles.departmentContainerMobile} : styles.departmentContainer}>
                    <div style={isMobile ? styles.departmentSidebarMobile : styles.departmentSidebar}>
                         <h2 style={{...styles.sectionTitle, textAlign: 'left'}}>Department Highlights</h2>
                         <p style={{...styles.sectionSubtitle, textAlign: 'left', margin: '0 0 2rem 0'}}>Explore the outstanding achievements of our individual departments.</p>
                        <div style={styles.departmentTabs}>
                            <button onClick={() => setActiveProgram('ug')} style={activeProgram === 'ug' ? {...styles.deptTabButton, ...styles.deptTabButtonActive} : styles.deptTabButton}>Undergraduate</button>
                            <button onClick={() => setActiveProgram('pg')} style={activeProgram === 'pg' ? {...styles.deptTabButton, ...styles.deptTabButtonActive} : styles.deptTabButton}>Postgraduate</button>
                        </div>
                        <div style={styles.departmentList}>
                            {filteredDepts.map(dept => (
                                <button key={dept.name} onClick={() => setSelectedDept(dept)} style={selectedDept?.name === dept.name ? {...styles.deptListItem, ...styles.deptListItemActive} : styles.deptListItem}>{dept.caption}</button>
                            ))}
                        </div>
                    </div>
                    <DepartmentDetailView department={selectedDept} onImageClick={setModalImageUrl} />
                </div>
            </section>

            <section style={styles.recruiterSection}>
                <h2 style={{...styles.sectionTitle, color: '#fff'}}>Our Valued Recruiters</h2>
                <p style={{...styles.sectionSubtitle, color: '#aaa'}}>We are proud to partner with the world's leading companies to provide exceptional opportunities for our students.</p>
                <LogoWall />
            </section>
        </div>
    );
};

export default PlacementD;