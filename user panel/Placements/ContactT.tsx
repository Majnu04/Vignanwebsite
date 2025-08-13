import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

// --- DATA (From your original files) ---
const contactData = {
    title: "Contact the Placement Cell",
    dean: { name: 'Dr. B. Prasad', position: 'Dean - Training & Placements, Internships', mobile: '9866399942', email: 'dean_tp@vignaniit.edu.in' },
    bgvEmail: 'vignaniit@yahoo.com'
};

// --- STYLED COMPONENTS ---
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
  margin-bottom: 4rem;
`;

const ContactCard = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 8px 25px rgba(0, 42, 112, 0.08);
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden; /* To contain the BGV notice background */
`;

const PrimaryContact = styled.div`
  padding: 3rem;
  text-align: center;
`;

const DeanName = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1A2C4B;
  margin: 0;
`;

const DeanPosition = styled.p`
  font-size: 1.2rem;
  color: #3B82F6;
  font-weight: 500;
  margin: 0.5rem 0 2rem 0;
`;

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  color: #4A5568;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover { color: #3B82F6; }
  svg { margin-right: 0.5rem; }
`;

const BGVNotice = styled.div`
  background-color: #EFF6FF;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid #E2E8F0;
  
  p {
    margin: 0;
    font-size: 1.1rem;
    color: #4A5568;
    line-height: 1.7;
  }

  a {
    color: #3B82F6;
    font-weight: bold;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

// --- Main Component ---
const ContactSection = () => {
    const cardVariants = {
        offscreen: { opacity: 0, y: 50 },
        onscreen: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1.2 } }
    };

    return (
        <SectionWrapper>
            <SectionTitle variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                {contactData.title}
            </SectionTitle>
            <ContactCard variants={cardVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
                <PrimaryContact>
                    <DeanName>{contactData.dean.name}</DeanName>
                    <DeanPosition>{contactData.dean.position}</DeanPosition>
                    <ContactLinks>
                        <ContactLink href={`tel:${contactData.dean.mobile}`}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58L3.654 1.328z"/></svg>
                            {contactData.dean.mobile}
                        </ContactLink>
                        <ContactLink href={`mailto:${contactData.dean.email}`}>
                             <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.558z"/></svg>
                            {contactData.dean.email}
                        </ContactLink>
                    </ContactLinks>
                </PrimaryContact>
                <BGVNotice>
                    <p>
                        <strong>Note:</strong> For Background Verifications (BGVs), please send a request email to <a href={`mailto:${contactData.bgvEmail}`}>{contactData.bgvEmail}</a>.
                    </p>
                </BGVNotice>
            </ContactCard>
        </SectionWrapper>
    );
};

export default ContactSection;