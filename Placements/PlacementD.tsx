import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// --- EXACT & UPDATED DATA (CSE image is now the official vignaniit.edu.in URL) ---
const detailsData = {
    title: "Placement Details",
    subtitle: "A consistent record of excellence, demonstrating our commitment to launching successful careers year after year.",
    stats: [
        { year: '2024 - 2025*', strength: 1647, placed: 1215, higherEd: 13, entrepreneurs: 0, percentage: 75 },
        { year: '2023 - 2024', strength: 1447, placed: 1143, higherEd: 19, entrepreneurs: 4, percentage: 80.58 },
        { year: '2022 - 2023', strength: 1296, placed: 1104, higherEd: 19, entrepreneurs: 6, percentage: 87.11 },
        { year: '2021 - 2022', strength: 1220, placed: 1011, higherEd: 40, entrepreneurs: 7, percentage: 86.72 },
        { year: '2020 - 2021', strength: 1268, placed: 1051, higherEd: 40, entrepreneurs: 8, percentage: 86.67 },
    ],
    branchShowcase: [
        // === THIS IS THE CORRECTED LINE ===
        { id: 'cse', title: 'CSE Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/CSE_01-%20NEW%20copy.jpg' },
        { id: 'it', title: 'IT Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/IT%20copy.jpg' },
        { id: 'ece', title: 'ECE Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/ECE_01-%20copy.jpg' },
        { id: 'aids', title: 'AI & DS Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/AI&DS-%20copy.jpg' },
        { id: 'eee', title: 'EEE Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/EEE-%20copy.jpg' },
        { id: 'mech', title: 'MECH Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/MECH-%20copy.jpg' },
        { id: 'ecm', title: 'ECM Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/ECM_01-%20copy.jpg' },
        { id: 'civil', title: 'Civil Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/civil%20copy.jpg' },
        { id: 'mca', title: 'MCA Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/MCA%20copy.jpg' },
        { id: 'mba', title: 'MBA Placements', imageUrl: 'https://vignaniit.edu.in/images/placement/MBA%20copy.jpg' },
    ]
};

// --- STYLED COMPONENTS (All definitions are complete and correct) ---
const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  position: relative;
  overflow-x: hidden;
  background-color: #F4F8FF; 
  font-family: 'Georgia', serif;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  color: #1A2C4B;
  margin-bottom: 1.5rem;
  @media (max-width: 768px) { font-size: 2.2rem; }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #4A5568;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem auto;
  line-height: 1.8;
`;

const TableContainer = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  padding: 1rem;
  box-shadow: 0 8px 25px rgba(0, 42, 112, 0.08);
  max-width: 1100px;
  margin: 0 auto 6rem auto;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th, td { padding: 1rem 1.5rem; }
  th { color: #1A2C4B; font-size: 1rem; border-bottom: 2px solid #E2E8F0; }
  td { color: #4A5568; font-size: 1rem; }
  tbody tr {
    transition: background-color 0.2s ease;
    &:nth-child(even) { background-color: #F9FAFB; }
    &:hover { background-color: #EFF6FF; }
  }
`;

const GalleryContainer = styled(motion.div)` max-width: 1200px; margin: 0 auto; `;
const ModalBackdrop = styled(motion.div)` position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 1000; cursor: pointer; `;
const ModalContent = styled(motion.div)` max-width: 90vw; max-height: 90vh; img { width: auto; height: auto; max-width: 100%; max-height: 100%; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); } `;
const MobileShowcaseContainer = styled.div``;
const MobileTabs = styled.div` display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem; `;
const MobileTab = styled.button` font-family: 'Georgia', serif; padding: 0.75rem 1.5rem; font-size: 1rem; font-weight: 500; border-radius: 8px; border: 2px solid ${props => (props.active ? '#3B82F6' : '#E2E8F0')}; background-color: ${props => (props.active ? '#3B82F6' : '#FFFFFF')}; color: ${props => (props.active ? '#FFFFFF' : '#1A2C4B')}; cursor: pointer; transition: all 0.3s ease; &:hover { border-color: #3B82F6; } `;
const MobileImageContainer = styled.div` position: relative; background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; box-shadow: 0 8px 25px rgba(0, 42, 112, 0.08); overflow: hidden; img { width: 100%; display: block; } `;
const ViewButton = styled.button` position: absolute; bottom: 1.5rem; right: 1.5rem; padding: 0.75rem 1.5rem; background-color: rgba(26, 44, 75, 0.8); backdrop-filter: blur(5px); color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; font-family: 'Georgia', serif; font-size: 1rem; cursor: pointer; transition: background-color 0.3s ease; &:hover { background-color: rgba(26, 44, 75, 1); } `;
const DesktopShowcaseContainer = styled.div` display: grid; grid-template-columns: 300px 1fr; gap: 3rem; background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; padding: 2rem; box-shadow: 0 8px 25px rgba(0, 42, 112, 0.08); `;
const DesktopTabs = styled.div` border-right: 1px solid #E2E8F0; padding-right: 2rem; `;
const DesktopTab = styled.button` display: block; width: 100%; text-align: left; font-family: 'Georgia', serif; padding: 1rem 1.5rem; font-size: 1.1rem; font-weight: 500; border-radius: 8px; border: none; background-color: ${props => (props.active ? '#EFF6FF' : 'transparent')}; color: ${props => (props.active ? '#3B82F6' : '#1A2C4B')}; cursor: pointer; transition: all 0.3s ease; &:hover { background-color: #EFF6FF; color: #3B82F6; } `;
const DesktopImageContainer = styled.div` position: relative; cursor: pointer; border-radius: 8px; overflow: hidden; img { width: 100%; height: 100%; object-fit: contain; display: block; } `;

// --- Custom Hook to Detect Screen Size ---
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth <= 992);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    return isMobile;
};

// --- Main Component ---
const PlacementDetails = () => {
    const isMobile = useIsMobile();
    const [activeBranch, setActiveBranch] = useState(detailsData.branchShowcase[0]);
    const [modalImage, setModalImage] = useState<string | null>(null);

    const cardVariants = {
        offscreen: { opacity: 0, y: 50 },
        onscreen: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1.2 } }
    };

    return (
        <SectionWrapper>
            <SectionTitle variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                {detailsData.title}
            </SectionTitle>
            <SectionSubtitle variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                {detailsData.subtitle}
            </SectionSubtitle>

            <TableContainer variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                <StyledTable>
                    <thead>
                        <tr><th>ACADEMIC YEAR</th><th>TOTAL STRENGTH</th><th>STUDENTS PLACED</th><th>HIGHER EDUCATION</th><th>ENTREPRENEURS</th><th>PLACEMENT %</th></tr>
                    </thead>
                    <tbody>
                        {detailsData.stats.map(row => (
                            <tr key={row.year}><td>{row.year}</td><td>{row.strength}</td><td>{row.placed}</td><td>{row.higherEd}</td><td>{row.entrepreneurs}</td><td>{row.percentage}</td></tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>

            <GalleryContainer>
                <SectionTitle variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                    Branch-wise Showcase
                </SectionTitle>
                <SectionSubtitle variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                    Each department is a powerhouse of talent. Select a branch to view its detailed placement achievements.
                </SectionSubtitle>
                
                {isMobile ? (
                    <MobileShowcaseContainer>
                        <MobileTabs>
                            {detailsData.branchShowcase.map(branch => (
                                <MobileTab key={branch.id} onClick={() => setActiveBranch(branch)} active={activeBranch.id === branch.id}>
                                    {branch.id.toUpperCase()}
                                </MobileTab>
                            ))}
                        </MobileTabs>
                        <MobileImageContainer>
                            <AnimatePresence mode="wait">
                                <motion.img key={activeBranch.id} src={activeBranch.imageUrl} alt={activeBranch.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
                            </AnimatePresence>
                            <ViewButton onClick={() => setModalImage(activeBranch.imageUrl)}>View Fullscreen</ViewButton>
                        </MobileImageContainer>
                    </MobileShowcaseContainer>
                ) : (
                    <DesktopShowcaseContainer>
                        <DesktopTabs>
                            {detailsData.branchShowcase.map(branch => (
                                <DesktopTab key={branch.id} onClick={() => setActiveBranch(branch)} active={activeBranch.id === branch.id}>
                                    {branch.title}
                                </DesktopTab>
                            ))}
                        </DesktopTabs>
                        <DesktopImageContainer onClick={() => setModalImage(activeBranch.imageUrl)}>
                            <AnimatePresence mode="wait">
                                <motion.img key={activeBranch.id} src={activeBranch.imageUrl} alt={activeBranch.title} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4, ease: 'easeInOut' }} />
                            </AnimatePresence>
                        </DesktopImageContainer>
                    </DesktopShowcaseContainer>
                )}
            </GalleryContainer>
            
            <AnimatePresence>
                {modalImage && (
                    <ModalBackdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalImage(null)}>
                        <ModalContent initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                            <img src={modalImage} alt="Fullscreen Showcase" />
                        </ModalContent>
                    </ModalBackdrop>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
};

export default PlacementDetails;