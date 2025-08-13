import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';

// --- DATA (Unchanged) ---
const trainingData = {
    title: "Our Training Process",
    intro: "VIIT (A) is committed to training and nurturing students to excel and be industry-ready. Besides providing academic excellence, students are groomed for corporate placements using multiple training and mentoring interventions. This program enables each student to become pro-active in defining their own goals and bring out their inherent talent.",
    pillars: [
        { name: "Soft Skills", description: "Essential interpersonal skills that include communication, teamwork, problem-solving, and adaptability. Developing these skills is crucial for students as they enter the workforce." },
        { name: "Language & Communication", description: "Effective communication is a fundamental skill in any field. Improving language and communication skills helps students convey their ideas clearly and confidently." },
        { name: "Life Skills", description: "A range of abilities necessary for daily living, such as time management, decision-making, and stress management, contributing to personal and professional success." },
        { name: "Transforming Skills", description: "The ability to learn and adapt to the ever-changing landscape of new technologies and business trends, ensuring our students are future-ready." },
        { name: "Tech Trend Awareness", description: "Staying updated with the latest technological advancements is crucial. We provide students with awareness of these trends to ensure they are well-prepared for industry demands." },
    ],
    yearlyStats: [
        { year: '2023-24', softSkillsEvents: 4, softSkillsStudents: 1628, langEvents: 3, langStudents: 1083, lifeEvents: 5, lifeStudents: 1933, techEvents: 50, techStudents: 11212, link: '#' },
        { year: '2022-23', softSkillsEvents: 4, softSkillsStudents: 3345, langEvents: 3, langStudents: 588, lifeEvents: 15, lifeStudents: 3363, techEvents: 31, techStudents: 4655, link: '#' },
        { year: '2021-22', softSkillsEvents: 4, softSkillsStudents: 1694, langEvents: 6, langStudents: 1020, lifeEvents: 15, lifeStudents: 3293, techEvents: 30, techStudents: 5690, link: '#' },
        { year: '2020-21', softSkillsEvents: 5, softSkillsStudents: 4020, langEvents: 2, langStudents: 181, lifeEvents: 5, lifeStudents: 1422, techEvents: 16, techStudents: 2241, link: '#' },
        { year: '2019-20', softSkillsEvents: 3, softSkillsStudents: 3026, langEvents: 2, langStudents: 202, lifeEvents: 9, lifeStudents: 1830, techEvents: 13, techStudents: 2328, link: '#' },
        { year: '2018-19', softSkillsEvents: 3, softSkillsStudents: 3176, langEvents: 2, langStudents: 709, lifeEvents: 6, lifeStudents: 767, techEvents: 14, techStudents: 5314, link: '#' },
    ]
};

// --- STYLED COMPONENTS (With Responsive Fixes) ---
const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
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

const IntroText = styled(motion.p)`
  font-size: 1.1rem;
  color: #4A5568;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem auto;
  line-height: 1.8;
`;

const PillarsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const PillarTab = styled.button`
  font-family: 'Georgia', serif;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 30px;
  border: 2px solid #E2E8F0;
  background-color: ${props => (props.active ? '#3B82F6' : '#FFFFFF')};
  color: ${props => (props.active ? '#FFFFFF' : '#1A2C4B')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3B82F6;
  }
`;

const PillarContent = styled(motion.div)`
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto 4rem auto;
  text-align: center;
  color: #4A5568;
  line-height: 1.7;
`;

const DashboardContainer = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  padding: 2.5rem;
  box-shadow: 0 8px 25px rgba(0, 42, 112, 0.08);
  max-width: 1000px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  h3 {
    font-size: 1.8rem;
    color: #1A2C4B;
    margin: 0;
  }

  select {
    font-family: 'Georgia', serif;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 42, 112, 0.1);
  }

  h4 {
    font-size: 1rem;
    color: #4A5568;
    margin: 0 0 0.5rem 0;
    font-weight: normal;
  }

  p {
    font-size: 2rem;
    font-weight: bold;
    color: #1A2C4B;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    p {
      font-size: 1.75rem;
    }
  }
`;

const ReportButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  background-color: #3B82F6;
  color: #FFFFFF;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563EB;
  }
`;

// --- Main Component ---
const TrainingProcess = () => {
    const [activePillar, setActivePillar] = useState(trainingData.pillars[0]);
    const [selectedYear, setSelectedYear] = useState(trainingData.yearlyStats[0].year);

    const cardVariants = {
        offscreen: { opacity: 0, y: 50 },
        onscreen: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1.2 } }
    };

    const selectedYearData = trainingData.yearlyStats.find(y => y.year === selectedYear);
    if (!selectedYearData) return <div>Error: Data for selected year not found.</div>;

    return (
        <SectionWrapper>
            <SectionTitle variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                {trainingData.title}
            </SectionTitle>
            <IntroText variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                {trainingData.intro}
            </IntroText>

            <PillarsContainer variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                {trainingData.pillars.map(pillar => (
                    <PillarTab key={pillar.name} onClick={() => setActivePillar(pillar)} active={activePillar.name === pillar.name}>
                        {pillar.name}
                    </PillarTab>
                ))}
            </PillarsContainer>

            <AnimatePresence mode="wait">
                <PillarContent
                    key={activePillar.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {activePillar.description}
                </PillarContent>
            </AnimatePresence>

            <DashboardContainer variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                <DashboardHeader>
                    <h3>Annual Training Data</h3>
                    <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        {trainingData.yearlyStats.map(y => <option key={y.year} value={y.year}>{y.year}</option>)}
                    </select>
                </DashboardHeader>

                <StatsGrid>
                    <StatCard><h4>Soft Skills Events</h4><p>{selectedYearData.softSkillsEvents}</p></StatCard>
                    <StatCard><h4>Students Trained</h4><p>{selectedYearData.softSkillsStudents.toLocaleString()}</p></StatCard>
                    <StatCard><h4>Language Events</h4><p>{selectedYearData.langEvents}</p></StatCard>
                    <StatCard><h4>Students Trained</h4><p>{selectedYearData.langStudents.toLocaleString()}</p></StatCard>
                    <StatCard><h4>Life Skills Events</h4><p>{selectedYearData.lifeEvents}</p></StatCard>
                    <StatCard><h4>Students Trained</h4><p>{selectedYearData.lifeStudents.toLocaleString()}</p></StatCard>
                    <StatCard><h4>Tech Trend Events</h4><p>{selectedYearData.techEvents}</p></StatCard>
                    <StatCard><h4>Students Trained</h4><p>{selectedYearData.techStudents.toLocaleString()}</p></StatCard>
                </StatsGrid>
                
                <div style={{ textAlign: 'center' }}>
                    <ReportButton href={selectedYearData.link} target="_blank" rel="noopener noreferrer">
                        View Full Report for {selectedYear}
                    </ReportButton>
                </div>
            </DashboardContainer>
        </SectionWrapper>
    );
};

export default TrainingProcess;