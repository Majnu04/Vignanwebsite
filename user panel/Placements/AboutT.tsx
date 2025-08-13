// In src/components/placements/AboutVision.tsx

import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

// --- DATA (Unchanged) ---
const visionData = {
    title: "Career Guidance, Training & Placement Cell",
    mission: "The Central Training & Placement Cell (CGTPC) endeavors to provide career development and job-oriented training to students. Through this cell, programs on Communication, Technical Aptitude, and Personality Development are provided by expert professionals to groom students for national and multinational companies.",
    pillars: [
        { title: "Placement Opportunities", description: "Provide ample opportunities for placement of students to achieve cent percent placements." },
        { title: "Centralized Management", description: "Manage centralized placement activities for all courses." },
        { title: "Campus Recruitment", description: "Organize campus recruitment for students with National and Multinational Companies." },
        { title: "Holistic Training", description: "Prepare students for recruitment by arranging training in Aptitude tests, Group discussions, and Technical interviews." },
    ],
    dean: {
        name: "Dr. B. Prasad",
        title: "Dean - Training and Placements",
        image: "https://vignaniit.edu.in/images/t&p.jpg"
    }
};

// --- STYLED COMPONENTS (With Dean's Image updated) ---
const SectionWrapper = styled.section`
  @import url('https://fonts.googleapis.com/css?family=Georgia&display=swap');
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
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) { font-size: 2.2rem; }
`;

const MissionText = styled(motion.p)`
  font-size: 1.1rem;
  color: #4A5568;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem auto; 
  line-height: 1.8;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PillarsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const PremiumCard = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  padding: 2rem; 
  box-shadow: 0 8px 25px rgba(0, 42, 112, 0.07);
  overflow: hidden;

  .sheen {
    position: absolute;
    top: 0; left: -150%; width: 250%; height: 100%;
    background: linear-gradient(100deg, transparent 30%, rgba(0, 86, 179, 0.05) 50%, transparent 70%);
    pointer-events: none;
  }
`;

const PillarTitle = styled.h3` font-size: 1.5rem; font-weight: 600; color: #1A2C4B; margin: 0 0 0.75rem 0; `;
const PillarDescription = styled.p` color: #4A5568; line-height: 1.7; margin: 0; `;

const DeanCard = styled(PremiumCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: sticky;
  top: 6rem;

  @media (max-width: 992px) {
    position: static;
  }
`;

const DeanImage = styled.img`
  width: 250px;
  height: 320px;
  border-radius: 12px;
  object-fit: cover;
  object-position: top;
  border: 3px solid #EAF4FF;
  transform: translateZ(20px);
  margin-bottom: 1.5rem;
`;
const DeanName = styled.h3` font-size: 1.8rem; font-weight: 700; color: #1A2C4B; margin: 0 0 0.25rem 0; transform: translateZ(30px); `;
const DeanTitle = styled.p` color: #005AEE; font-weight: 500; margin: 0; transform: translateZ(20px); `;

// --- Reusable Hook for 3D Tilt Effect ---
const useHoloEffect = () => {
    const x = useMotionValue(0); const y = useMotionValue(0);
    const rotateX = useTransform(y, [-150, 150], [8, -8]);
    const rotateY = useTransform(x, [-150, 150], [-8, 8]);
    const sheenX = useTransform(x, [-150, 150], [-50, 150]);
    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }
    function handleMouseLeave() { x.set(0); y.set(0); }
    return { style: { rotateX, rotateY }, onMouseMove: handleMouse, onMouseLeave: handleMouseLeave, sheenStyle: { x: sheenX } };
};

// --- Main Component ---
const AboutVision = () => {
    const cardVariants = { offscreen: { opacity: 0, y: 50 }, onscreen: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1.2 } } };
    const pillarEffects = visionData.pillars.map(() => useHoloEffect());
    const deanEffect = useHoloEffect();

    return (
        <SectionWrapper>
            <SectionTitle variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                {visionData.title}
            </SectionTitle>
            <MissionText variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, delay: 0.1 }}>
                {visionData.mission}
            </MissionText>

            <ContentGrid>
                <PillarsContainer>
                    {visionData.pillars.map((pillar, i) => (
                        <PremiumCard key={i} {...pillarEffects[i]} variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                            <PillarTitle>{pillar.title}</PillarTitle>
                            <PillarDescription>{pillar.description}</PillarDescription>
                            <motion.div className="sheen" style={pillarEffects[i].sheenStyle} />
                        </PremiumCard>
                    ))}
                </PillarsContainer>
                
                <DeanCard {...deanEffect} variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                    <DeanImage src={visionData.dean.image} alt={visionData.dean.name} />
                    <DeanName>{visionData.dean.name}</DeanName>
                    <DeanTitle>{visionData.dean.title}</DeanTitle>
                    {/* === THIS IS THE CORRECTED LINE === */}
                    <motion.div className="sheen" style={deanEffect.sheenStyle} />
                </DeanCard>
            </ContentGrid>
        </SectionWrapper>
    );
};

export default AboutVision;