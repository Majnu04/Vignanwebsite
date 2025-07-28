import React from 'react';
import styled from 'styled-components';

// ------------------- STYLED COMPONENTS -------------------
// By defining styles in the same file, we keep component-specific styling co-located.

const TrainingContainer = styled.div`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  color: #4A4A4A;
  line-height: 1.7;
  padding: 2.5rem;
  background-color: #FDFDFD;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #2c3e50;
  border-bottom: 3px solid #3498db;
  padding-bottom: 0.75rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.9rem;
  color: #34495e;
  margin-bottom: 1.25rem;
  font-weight: 500;
`;

const Paragraph = styled.p`
  font-size: 1.05rem;
  margin-bottom: 1rem;
  text-align: justify;
  max-width: 900px;
`;

const Emphasis = styled.span`
  font-weight: 600;
  color: #2980b9;
`;

const List = styled.ul`
  list-style-position: inside;
  padding-left: 10px;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

const TableHead = styled.thead`
  background-color: #34495e;
  color: #ffffff;
`;

const TableHeader = styled.th`
  padding: 1.25rem 1rem;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
`;

const SubHeader = styled(TableHeader)`
  background-color: #4a6278;
  font-weight: 400;
  font-size: 0.85rem;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  

  &:last-of-type {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  color: #555;
`;

const YearCell = styled(TableCell)`
  font-weight: 600;
  color: #2c3e50;
`;

const DetailsButton = styled.a`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// ------------------- DATA AND INTERFACES -------------------

// Define a clear interface for the training data objects for type safety
interface TrainingRecord {
    academicYear: string;
    softSkillsEvents: number;
    softSkillsStudents: number;
    languageSkillsEvents: number;
    languageSkillsStudents: number;
    lifeSkillsEvents: number;
    lifeSkillsStudents: number;
    techTrendsEvents: number;
    techTrendsStudents: number;
    link: string;
}

const trainingData: TrainingRecord[] = [
    { academicYear: '2023-24', softSkillsEvents: 4, softSkillsStudents: 1628, languageSkillsEvents: 3, languageSkillsStudents: 1083, lifeSkillsEvents: 5, lifeSkillsStudents: 1933, techTrendsEvents: 50, techTrendsStudents: 11212, link: 'https://vignaniit.edu.in/aqar2324uploads/Criteria5/5_1_3_Summary%20Sheet_final.pdf' },
    { academicYear: '2022-23', softSkillsEvents: 4, softSkillsStudents: 3345, languageSkillsEvents: 3, languageSkillsStudents: 588, lifeSkillsEvents: 15, lifeSkillsStudents: 3363, techTrendsEvents: 31, techTrendsStudents: 4655, link: 'https://vignaniit.edu.in/capacitybuilding2021-22.php' },
    { academicYear: '2021-22', softSkillsEvents: 4, softSkillsStudents: 1694, languageSkillsEvents: 6, languageSkillsStudents: 1020, lifeSkillsEvents: 15, lifeSkillsStudents: 3293, techTrendsEvents: 30, techTrendsStudents: 5690, link: 'https://vignaniit.edu.in/capacitybuilding2020-21.php' },
    { academicYear: '2020-21', softSkillsEvents: 5, softSkillsStudents: 4020, languageSkillsEvents: 2, languageSkillsStudents: 181, lifeSkillsEvents: 5, lifeSkillsStudents: 1422, techTrendsEvents: 16, techTrendsStudents: 2241, link: 'https://vignaniit.edu.in/capacitybuilding2019-20.php' },
    { academicYear: '2019-20', softSkillsEvents: 3, softSkillsStudents: 3026, languageSkillsEvents: 2, languageSkillsStudents: 202, lifeSkillsEvents: 9, lifeSkillsStudents: 1830, techTrendsEvents: 13, techTrendsStudents: 2328, link: 'https://vignaniit.edu.in/capacitybuilding2018-19.php' },
    { academicYear: '2018-19', softSkillsEvents: 3, softSkillsStudents: 3176, languageSkillsEvents: 2, languageSkillsStudents: 709, lifeSkillsEvents: 6, lifeSkillsStudents: 767, techTrendsEvents: 14, techTrendsStudents: 5314, link: 'https://vignaniit.edu.in/capacitybuilding2018-19.php' },
];


// ------------------- REACT COMPONENT -------------------

const Training: React.FC = () => {
    return (
        <TrainingContainer>
            <Title>Training and Development at VIIT</Title>

            <Section>
                <SectionTitle>Commitment to Student Excellence</SectionTitle>
                <Paragraph>
                    VIIT (A) is committed to training and nurturing the students to excel in industry-ready. Besides providing academic excellence by the departments, the students are groomed for corporate placements using multiple training and mentoring interventions. Career guidance programs provide assistance and equip students with the skills and knowledge and better informed so that they can become architects in building their own future.
                </Paragraph>
                <Paragraph>
                    <Emphasis>Mentoring, Career Guidance, Training and Placement</Emphasis> is an innovative and novel process introduced by the Management of VIIT. The aim of the institute to motivate the students to the academic environment, providing guidance and train all students from the very beginning to enhance their knowledge, skill and talent and help them achieve their goals. This program enables each student to become pro-active in defining their own goals and bring out inherent talent.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Core Skill Enhancement Initiatives</SectionTitle>
                <Paragraph>
                    VIIT has created a robust platform for capacity development and skills enhancement. These initiatives are crucial for preparing students for academic and professional success:
                </Paragraph>
                <List>
                    <ListItem><Emphasis>Soft Skills:</Emphasis> Soft skills are essential interpersonal skills that include communication, teamwork, problem-solving, and adaptability. Developing these skills is crucial for students as they enter the workforce.</ListItem>
                    <ListItem><Emphasis>Language & Communication:</Emphasis> Effective communication is a fundamental skill in any field. Improving language and communication skills helps students convey their ideas clearly and confidently.</ListItem>
                    <ListItem><Emphasis>Life Skills:</Emphasis>Life skills encompass a range of abilities that are necessary for daily living, such as time management, decision-making, and stress management. These skills contribute to personal and professional success.</ListItem>
                    <ListItem><Emphasis>Transforming Skills:</Emphasis>It's important to adapt to the ever-changing landscape of technology and business. "Transforming skills" could refer to the ability to learn and adapt to new technologies and trends.</ListItem>
                    <ListItem><Emphasis>Awareness of Trends in Technology:</Emphasis> Staying updated with the latest technological advancements is crucial in the IT field. Providing students with awareness of these trends ensures they are well-prepared for industry demands.</ListItem>
                </List>
            </Section>

            <TableContainer>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableHeader colSpan={10}>Capacity development and skills enhancement activities are organised for improving students capability</TableHeader>
                        </TableRow>
                        <TableRow>
                            <TableHeader rowSpan={2}>Academic Year</TableHeader>
                            <TableHeader colSpan={2}>Soft Skills</TableHeader>
                            <TableHeader colSpan={2}>Language & Communication</TableHeader>
                            <TableHeader colSpan={2}>Life Skills</TableHeader>
                            <TableHeader colSpan={2}>Tech Trends Awareness</TableHeader>
                            <TableHeader rowSpan={2}>Details</TableHeader>
                        </TableRow>
                        <TableRow>
                            <SubHeader>Events</SubHeader>
                            <SubHeader>Students</SubHeader>
                            <SubHeader>Events</SubHeader>
                            <SubHeader>Students</SubHeader>
                            <SubHeader>Events</SubHeader>
                            <SubHeader>Students</SubHeader>
                            <SubHeader>Events</SubHeader>
                            <SubHeader>Students</SubHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainingData.map((data) => (
                            <TableRow key={data.academicYear}>
                                <YearCell>{data.academicYear}</YearCell>
                                <TableCell>{data.softSkillsEvents}</TableCell>
                                <TableCell>{data.softSkillsStudents.toLocaleString()}</TableCell>
                                <TableCell>{data.languageSkillsEvents}</TableCell>
                                <TableCell>{data.languageSkillsStudents.toLocaleString()}</TableCell>
                                <TableCell>{data.lifeSkillsEvents}</TableCell>
                                <TableCell>{data.lifeSkillsStudents.toLocaleString()}</TableCell>
                                <TableCell>{data.techTrendsEvents}</TableCell>
                                <TableCell>{data.techTrendsStudents.toLocaleString()}</TableCell>
                                <TableCell>
                                    <DetailsButton href={data.link} target="_blank" rel="noopener noreferrer">
                                        View
                                    </DetailsButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </TrainingContainer>
    );
};

export default Training;