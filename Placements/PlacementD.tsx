import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { CSSProperties, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

// --- Responsive Hook ---
const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

// --- Setup & Registration ---
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// --- Type Definitions & Enriched Data ---
interface PlacementYearData { academicYear: string; totalStrength: number; studentsPlaced: number; higherEducation: number; entrepreneurs: number; placementPercentage: number; }
interface Department { name: string; caption: string; imageUrl: string; highestPackage: string; averagePackage: string; placed: number; }

const placementData: PlacementYearData[] = [
    { academicYear: '2024 - 2025*', totalStrength: 1647, studentsPlaced: 1215, higherEducation: 13, entrepreneurs: 0, placementPercentage: 75 },
    { academicYear: '2023 - 2024', totalStrength: 1447, studentsPlaced: 1143, higherEducation: 19, entrepreneurs: 4, placementPercentage: 80.58 },
    { academicYear: '2022 - 2023', totalStrength: 1296, studentsPlaced: 1104, higherEducation: 19, entrepreneurs: 6, placementPercentage: 87.11 },
    { academicYear: '2021 - 2022', totalStrength: 1220, studentsPlaced: 1011, higherEducation: 40, entrepreneurs: 7, placementPercentage: 86.72 },
    { academicYear: '2020 - 2021', totalStrength: 1268, studentsPlaced: 1051, higherEducation: 40, entrepreneurs: 8, placementPercentage: 86.67 },
];
const undergraduatePlacements: Department[] = [
    { name: "CSE", caption: "CSE Placements", imageUrl: "https://vignaniit.edu.in/images/placement/CSE_01-%20NEW%20copy.jpg", highestPackage: "50 LPA", averagePackage: "6.43 LPA", placed: 257 },
    { name: "IT", caption: "IT Placements", imageUrl: "https://vignaniit.edu.in/images/placement/IT%20copy.jpg", highestPackage: "26 LPA", averagePackage: "5.1 LPA", placed: 55 },
    { name: "ECE", caption: "ECE Placements", imageUrl: "https://vignaniit.edu.in/images/placement/ECE_01-%20copy.jpg", highestPackage: "9.5 LPA", averagePackage: "4.23 LPA", placed: 275 },
    { name: "AI&DS", caption: "AI & DS Placements", imageUrl: "https://vignaniit.edu.in/images/placement/AI&DS-%20copy.jpg", highestPackage: "37 LPA", averagePackage: "5.8 LPA", placed: 146 },
    { name: "EEE", caption: "EEE Placements", imageUrl: "https://vignaniit.edu.in/images/placement/EEE-%20copy.jpg", highestPackage: "9.0 LPA", averagePackage: "4.0 LPA", placed: 263 },
    { name: "MECH", caption: "MECH Placements", imageUrl: "https://vignaniit.edu.in/images/placement/MECH-%20copy.jpg", highestPackage: "10.44 LPA", averagePackage: "3.48 LPA", placed: 303 },
    { name: "ECM", caption: "ECM Placements", imageUrl: "https://vignaniit.edu.in/images/placement/ECM_01-%20copy.jpg", highestPackage: "12 LPA", averagePackage: "4.56 LPA", placed: 45 },
    { name: "CIVIL", caption: "Civil Placements", imageUrl: "https://vignaniit.edu.in/images/placement/civil%20copy.jpg", highestPackage: "9.5 LPA", averagePackage: "3.55 LPA", placed: 146 },
];
const postgraduatePlacements: Department[] = [
    { name: "MCA", caption: "MCA Placements", imageUrl: "https://vignaniit.edu.in/images/placement/MCA%20copy.jpg", highestPackage: "06 LPA", averagePackage: "4.5 LPA", placed: 75 },
    { name: "MBA", caption: "MBA Placements", imageUrl: "https://vignaniit.edu.in/images/placement/MBA%20copy.jpg", highestPackage: "06 LPA", averagePackage: "5.37 LPA", placed: 96 },
];

// --- JSS-like Style Objects ---
const styles: { [key: string]: CSSProperties } = {
  container: { padding: '2rem', fontFamily: "'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',sans-serif", color: '#333', maxWidth: '1200px', margin: 'auto' },
  containerMobile: { padding: '1rem' },
  section: { marginBottom: '3.5rem' },
  sectionTitle: { fontSize: '2rem', marginBottom: '1.5rem', color: '#1a3b5d', borderBottom: '4px solid #007bff', paddingBottom: '0.5rem', display: 'inline-block' },
  sectionTitleMobile: { fontSize: '1.5rem' },
  
  // --- Responsive Table Styles ---
  tableContainer: { overflowX: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' },
  table: { width: '100%', borderCollapse: 'collapse', overflow: 'hidden' },
  tableHeader: { backgroundColor: '#074AE7', fontWeight: 600,color:'white' },
  tableCell: { border: '1px solid #ddd', padding: '1rem', textAlign: 'left', transition: 'background-color 0.3s ease',backgroundColor: 'white' },
  tableRow: { cursor: 'pointer' },
  tableRowHover: { backgroundColor: '#f9f9f9' },
  tableRowSelected: { backgroundColor: '#e6f2ff', fontWeight: 'bold' },
  mobileTableContainer: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  mobileTableRowCard: { border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', cursor: 'pointer' },
  mobileTableRowCardSelected: { borderColor: '#007bff', boxShadow: '0 4px 10px rgba(0, 123, 255, 0.2)' },
  mobileCardRow: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' },
  mobileCardRowLabel: { fontWeight: 600, color: '#495057' },
  
  // --- Chart and Department Section Styles ---
  chartWrapper: { maxWidth: '800px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)' },
  chartWrapperMobile: { padding: '1rem' },
  chartToggle: { display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' },
  chartToggleButton: { padding: '0.75rem 1.5rem', border: '1px solid #007bff', backgroundColor: '#fff', cursor: 'pointer', transition: 'background-color 0.3s ease, color 0.3s ease', fontSize: '1rem', color: '#007bff' },
  chartToggleButtonActive: { backgroundColor: '#007bff', color: 'white' },
  deptSectionContainer: { background: 'linear-gradient(to bottom, #f7f9fc, #ffffff)', padding: '2rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)' },
  deptSectionContainerMobile: { padding: '1rem' },
  deptHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' },
  deptHeaderMobile: { flexDirection: 'column', alignItems: 'center' },
  programToggleContainer: { display: 'inline-flex', padding: '0.3rem', backgroundColor: '#e9ecef', borderRadius: '12px' },
  programToggleButton: { padding: '0.8rem 1.5rem', border: 'none', backgroundColor: 'transparent', color: '#495057', fontWeight: 600, fontSize: '1rem', borderRadius: '9px', cursor: 'pointer', transition: 'all 0.3s ease' },
  programToggleButtonActive: { backgroundColor: '#007bff', color: '#fff', boxShadow: '0 3px 8px rgba(0, 91, 255, 0.3)' },
  controlsContainer: { display: 'flex', gap: '1rem', alignItems: 'center' },
  controlsContainerMobile: { flexDirection: 'column', width: '100%', alignItems: 'stretch' },
  searchBox: { padding: '0.8rem', fontSize: '1rem', border: '2px solid #ced4da', borderRadius: '9px', transition: 'border-color 0.2s, box-shadow 0.2s', outline: 'none' },
  viewToggle: { display: 'flex', backgroundColor: '#e9ecef', borderRadius: '9px', padding: '0.3rem' },
  viewToggleButton: { flex: 1, background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: '#495057', borderRadius: '7px' },
  viewToggleButtonActive: { backgroundColor: '#fff', color: '#007bff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  
  // --- Flip Card and Carousel Styles ---
  cardContainer: { perspective: '1000px', width: '300px', height: '380px' },
  cardContainerMobile: { width: '90%', maxWidth: '320px' },
  cardInner: { position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s', transformStyle: 'preserve-3d' },
  cardFace: { position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  cardFront: { backgroundColor: '#fff', cursor: 'pointer' },
  cardBack: { backgroundColor: '#1a3b5d', color: '#fff', transform: 'rotateY(180deg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  cardImage: { width: '100%', height: '70%', objectFit: 'cover' },
  cardCaption: { fontWeight: 600, fontSize: '1.2rem', padding: '1.5rem', margin: 0, textAlign: 'center', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardBackTitle: { fontSize: '1.5rem', margin: '0 0 1rem 0', borderBottom: '2px solid #007bff', paddingBottom: '0.5rem' },
  stat: { fontSize: '1.1rem', margin: '0.8rem 0', display: 'flex', justifyContent: 'space-between', width: '100%', gap: '1rem' },
  statLabel: { fontWeight: 300 },
  statValue: { fontWeight: 700 },
  viewImageButton: { marginTop: 'auto', padding: '0.75rem 1.5rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'background-color 0.2s' },
  carouselContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', position: 'relative', width: '100%', height: '420px' },
  carouselNav: { zIndex: 10, position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontSize: '1.5rem' },
  
  // --- Modal Styles ---
  modalBackdrop: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' },
  modalContentWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' },
  modalImage: { display: 'block', maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', boxShadow: '0 0 35px rgba(0,0,0,0.5)', borderRadius: '4px' },
  modalCloseButton: { position: 'fixed', top: '15px', right: '15px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: '2px solid white', color: 'white', fontSize: '1.5rem', lineHeight: '36px', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', zIndex: 1001 },
};

// --- Child Components ---

const ImageModal = memo(({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) => {
    useEffect(() => { const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', handleKeyDown); document.body.style.overflow = 'hidden'; return () => { window.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = 'auto'; }; }, [onClose]);
    return (
        <div style={styles.modalBackdrop} onClick={onClose}>
            <button style={styles.modalCloseButton} onClick={onClose} aria-label="Close image view">×</button>
            <div style={styles.modalContentWrapper}>
                <img src={imageUrl} alt="Enlarged view" style={styles.modalImage} onClick={(e) => e.stopPropagation()} />
            </div>
        </div>
    );
});

const PlacementTable = memo(({ data, selectedYear, onRowClick, isMobile }: { data: PlacementYearData[], selectedYear: string, onRowClick: (data: PlacementYearData) => void, isMobile: boolean }) => {
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    if (isMobile) {
        return (
            <div style={styles.mobileTableContainer}>
                {data.map((row) => (
                    <div 
                        key={row.academicYear} 
                        style={selectedYear === row.academicYear ? {...styles.mobileTableRowCard, ...styles.mobileTableRowCardSelected} : styles.mobileTableRowCard} 
                        onClick={() => onRowClick(row)}
                    >
                        <h3 style={{ marginTop: 0, color: '#007bff' }}>{row.academicYear}</h3>
                        <div style={styles.mobileCardRow}><span style={styles.mobileCardRowLabel}>Total Strength:</span> <span>{row.totalStrength}</span></div>
                        <div style={styles.mobileCardRow}><span style={styles.mobileCardRowLabel}>Students Placed:</span> <span>{row.studentsPlaced}</span></div>
                        <div style={styles.mobileCardRow}><span style={styles.mobileCardRowLabel}>Higher Education:</span> <span>{row.higherEducation}</span></div>
                        <div style={styles.mobileCardRow}><span style={styles.mobileCardRowLabel}>Entrepreneurs:</span> <span>{row.entrepreneurs}</span></div>
                        <div style={{...styles.mobileCardRow, borderBottom: 'none'}}><span style={styles.mobileCardRowLabel}>Placement %:</span> <span>{row.placementPercentage.toFixed(2)}%</span></div>
                    </div>
                ))}
            </div>
        );
    }
    
    return (
        <div style={styles.tableContainer}>
        <table style={styles.table}>
            <thead><tr>{['ACADEMIC YEAR', 'TOTAL STRENGTH', 'STUDENTS PLACED', 'HIGHER EDUCATION', 'ENTREPRENEURS', 'PLACEMENT %'].map(header => (<th key={header} scope="col" style={{...styles.tableCell, ...styles.tableHeader}}>{header}</th>))}</tr></thead>
            <tbody>{data.map((row) => { const isSelected = selectedYear === row.academicYear; const isHovered = hoveredRow === row.academicYear; const rowStyle = { ...styles.tableRow, ...(isSelected && styles.tableRowSelected), ...(isHovered && !isSelected && styles.tableRowHover), }; return (<tr key={row.academicYear} onClick={() => onRowClick(row)} onMouseEnter={() => setHoveredRow(row.academicYear)} onMouseLeave={() => setHoveredRow(null)} style={rowStyle} tabIndex={0}><td style={styles.tableCell}>{row.academicYear}</td><td style={styles.tableCell}>{row.totalStrength}</td><td style={styles.tableCell}>{row.studentsPlaced}</td><td style={styles.tableCell}>{row.higherEducation}</td><td style={styles.tableCell}>{row.entrepreneurs}</td><td style={styles.tableCell}>{row.placementPercentage.toFixed(2)}</td></tr>); })}</tbody>
        </table>
        </div>
    );
});

const FlipCard = memo(({ department, onImageClick, isMobile }: { department: Department, onImageClick: (url: string) => void, isMobile: boolean }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div style={isMobile ? {...styles.cardContainer, ...styles.cardContainerMobile} : styles.cardContainer} onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
            <div style={{ ...styles.cardInner, transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
                <div style={{ ...styles.cardFace, ...styles.cardFront }} onClick={() => onImageClick(department.imageUrl)}>
                    <img src={department.imageUrl} style={styles.cardImage} alt={department.caption} />
                    <h3 style={styles.cardCaption}>{department.caption}</h3>
                </div>
                <div style={{ ...styles.cardFace, ...styles.cardBack }}>
                    <h3 style={styles.cardBackTitle}>{department.name} Stats</h3>
                    <div style={styles.stat}><span style={styles.statLabel}>Highest Pkg:</span> <span style={styles.statValue}>{department.highestPackage}</span></div>
                    <div style={styles.stat}><span style={styles.statLabel}>Average Pkg:</span> <span style={styles.statValue}>{department.averagePackage}</span></div>
                    <div style={styles.stat}><span style={styles.statLabel}>Placed:</span> <span style={styles.statValue}>{department.placed}</span></div>
                    <button style={styles.viewImageButton} onClick={() => onImageClick(department.imageUrl)}>View Placements</button>
                </div>
            </div>
        </div>
    );
});

const DepartmentCarousel = memo(({ departments, onImageClick, isMobile }: { departments: Department[], onImageClick: (url: string) => void, isMobile: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    if (!departments.length) return null;
    const next = () => setCurrentIndex(i => (i + 1) % departments.length);
    const prev = () => setCurrentIndex(i => (i - 1 + departments.length) % departments.length);

    return (
        <div style={styles.carouselContainer}>
            {departments.length > 1 && <button style={{ ...styles.carouselNav, left: isMobile ? '-5px' : '10px' }} onClick={prev}>‹</button>}
            <div style={{ perspective: '2000px', width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {departments.map((dept, index) => {
                    const offset = index - currentIndex;
                    const isVisible = Math.abs(offset) < 3;
                    const scaleFactor = 1 - Math.abs(offset) * 0.2;
                    const transform = isVisible ? `translateX(${offset * (isMobile ? 40 : 50)}%) rotateY(${-offset * 15}deg) scale(${scaleFactor})` : `translateX(${Math.sign(offset) * 150}%) scale(0)`;
                    const zIndex = departments.length - Math.abs(offset);
                    const opacity = Math.abs(offset) < 2 ? 1 : 0;
                    return (
                        <div key={dept.name} style={{ position: 'absolute', transition: 'all 0.5s ease-out', transform, zIndex, opacity, width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                            <FlipCard department={dept} onImageClick={onImageClick} isMobile={isMobile} />
                        </div>
                    );
                })}
            </div>
            {departments.length > 1 && <button style={{ ...styles.carouselNav, right: isMobile ? '-5px' : '10px' }} onClick={next}>›</button>}
        </div>
    );
});


// --- Main Parent Component ---

const PlacementD = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedYearData, setSelectedYearData] = useState<PlacementYearData>(placementData[0]);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeProgram, setActiveProgram] = useState<'ug' | 'pg'>('ug');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentViewMode, setDepartmentViewMode] = useState<'grid' | 'carousel'>('grid');

  const handleRowClick = useCallback((data: PlacementYearData) => setSelectedYearData(data), []);
  const handleImageClick = useCallback((imageUrl: string) => setSelectedImage(imageUrl), []);
  const handleCloseModal = useCallback(() => setSelectedImage(null), []);

  const chartData = {
    labels: ['Placed', 'Higher Edu.', 'Entrepreneurs'],
    datasets: [{
        label: 'Count',
        data: [selectedYearData.studentsPlaced, selectedYearData.higherEducation, selectedYearData.entrepreneurs],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        borderWidth: 1,
    }],
  };
  const chartOptions = { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: chartType === 'pie' }, title: { display: true, text: `Overview for ${selectedYearData.academicYear}`, font: { size: 16 } } } };
  
  const filteredDepartments = useMemo(() => {
    const source = activeProgram === 'ug' ? undergraduatePlacements : postgraduatePlacements;
    if (!searchTerm) return source;
    return source.filter(dept => dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || dept.caption.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [activeProgram, searchTerm]);

  return (
    <>
        <div style={isMobile ? {...styles.container, ...styles.containerMobile} : styles.container}>
            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />}
            
            <section style={styles.section}>
                <h2 style={isMobile ? {...styles.sectionTitle, ...styles.sectionTitleMobile} : styles.sectionTitle}>Overall Placement Statistics</h2>
                <PlacementTable data={placementData} selectedYear={selectedYearData.academicYear} onRowClick={handleRowClick} isMobile={isMobile} />
            </section>

            <section style={styles.section}>
                <div style={isMobile ? {...styles.chartWrapper, ...styles.chartWrapperMobile} : styles.chartWrapper}>
                    <div style={styles.chartToggle}>
                        <button onClick={() => setChartType('bar')} style={{ ...styles.chartToggleButton, borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', ...(chartType === 'bar' ? styles.chartToggleButtonActive : {}) }}>Bar</button>
                        <button onClick={() => setChartType('pie')} style={{ ...styles.chartToggleButton, borderTopRightRadius: '8px', borderBottomRightRadius: '8px', borderLeft: 'none', ...(chartType === 'pie' ? styles.chartToggleButtonActive : {}) }}>Pie</button>
                    </div>
                    {chartType === 'bar' ? <Bar data={chartData} options={chartOptions} /> : <Pie data={chartData} options={chartOptions} />}
                </div>
            </section>

            <section style={isMobile ? {...styles.deptSectionContainer, ...styles.deptSectionContainerMobile} : styles.deptSectionContainer}>
                <div style={isMobile ? {...styles.deptHeader, ...styles.deptHeaderMobile} : styles.deptHeader}>
                    <h2 style={isMobile ? {...styles.sectionTitle, ...styles.sectionTitleMobile, border: 'none', margin: 0} : {...styles.sectionTitle, border: 'none', margin: 0}}>Department Placements</h2>
                    <div style={styles.programToggleContainer}>
                        <button onClick={() => setActiveProgram('ug')} style={activeProgram === 'ug' ? { ...styles.programToggleButton, ...styles.programToggleButtonActive } : styles.programToggleButton}>Under Graduate</button>
                        <button onClick={() => setActiveProgram('pg')} style={activeProgram === 'pg' ? { ...styles.programToggleButton, ...styles.programToggleButtonActive } : styles.programToggleButton}>Post Graduate</button>
                    </div>
                    <div style={isMobile ? {...styles.controlsContainer, ...styles.controlsContainerMobile} : styles.controlsContainer}>
                        <input type="text" placeholder="Search department..." style={styles.searchBox} onChange={(e) => setSearchTerm(e.target.value)} />
                        <div style={styles.viewToggle}>
                            <button style={departmentViewMode === 'grid' ? {...styles.viewToggleButton, ...styles.viewToggleButtonActive} : styles.viewToggleButton} onClick={() => setDepartmentViewMode('grid')} title="Grid View">☰</button>
                            <button style={departmentViewMode === 'carousel' ? {...styles.viewToggleButton, ...styles.viewToggleButtonActive} : styles.viewToggleButton} onClick={() => setDepartmentViewMode('carousel')} title="Carousel View">⧉</button>
                        </div>
                    </div>
                </div>

                {departmentViewMode === 'grid' ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                        {filteredDepartments.map((dept) => <FlipCard key={dept.name} department={dept} onImageClick={handleImageClick} isMobile={isMobile}/>)}
                    </div>
                ) : (
                    <DepartmentCarousel departments={filteredDepartments} onImageClick={handleImageClick} isMobile={isMobile}/>
                )}
            </section>
        </div>
    </>
  );
};

export default PlacementD;