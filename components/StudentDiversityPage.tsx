import React, { useEffect } from 'react';

// --- Data for Student Diversity Page (Exactly as provided) ---
const diversityData = {
    intro: "A well-defined system is established to identify the students as advanced and slow learners. It works based on the differential learning style of the students and their performance in continuous evaluation process. After identification, students are counselled to overcome their learning difficulties.",
    assessment: "Assessment of learning abilities",
    advancedLearners: {
        intro: "Students with SGPA above 7 in the previous semester are identified as advanced learners. Slow learners: Students are identified as advanced and slow learners based on their EAMCET Rank and performance in MID-I (I Semester examination).",
        title: "Special programs for Advanced Learners:",
        points: [
            "Self-learning via online courses on platforms like SWAYAM, NPTEL, and Coursera.",
            "Active participation in Hackathons, Competitive Coding, and Design Contests.",
            "Introduction to Real-time Industry Projects and Semester Long Internships.",
            "Conduction of special classes for GATE, GRE and TOEFL.",
            "Reinforcement to opt for an Honors and Minors Degree Program.",
            "Placement training and Career counselling.",
            "Research guidance to publish articles/works in indexed journals."
        ]
    },
    slowLearners: {
        title: "Special programs for Slow Learners:",
        intro: "Continuous monitoring of slow learners' academic progress is ensured. The institution's well established counselling system fosters a mentor-mentee relationship, motivating students towards their objectives. Pre-identified factors like family, emotions, and social influences on the learners are addressed through effective counselling. The programs include:",
        points: [
            "Remedial Classes",
            "Access to e-resources",
            "Special course material for better preparation",
            "Remedial classes for backlog students.",
            "Peer mentoring and learning with the support of advanced learners.",
            "Recorded video-lectures access through LMS Platform."
        ]
    },
    flowchartImage: "https://i.ibb.co/k6wF6Bcw/image.png" // <-- REPLACE WITH YOUR FLOWCHART IMAGE LINK
};

// --- Main Student Diversity Page Component ---
const StudentDiversityPage = () => {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animated-item');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <>
            <style>{`
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes contentSlideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes contentSlideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
                
                .diversity-section {
                    background-color: #f1f5f9;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .diversity-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    padding-top: 20px;
                }

                .diversity-container {
                    width: 100%;
                    background-color: #ffffff;
                    padding: 3.5rem;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
                    margin-top: 3rem;
                }

                .animated-item { opacity: 0; animation-fill-mode: forwards; }
                .fade-up { animation-name: contentFadeInUp; animation-duration: 0.8s; animation-timing-function: ease-out; }
                .slide-left { animation-name: contentSlideInLeft; animation-duration: 0.8s; animation-timing-function: ease-out; }
                .slide-right { animation-name: contentSlideInRight; animation-duration: 0.8s; animation-timing-function: ease-out; }

                .main-content-title {
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: #1e3a8a;
                    margin-bottom: 2rem;
                }

                .intro-paragraph, .assessment-text {
                    font-size: 1.1rem;
                    line-height: 1.9;
                    color: #334155;
                    margin-bottom: 1.5rem;
                }
                .assessment-text {
                    font-weight: 600;
                    color: #1e293b;
                }
                
                .learners-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                    margin-top: 3rem;
                }
                @media (min-width: 1024px) {
                    .learners-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                .learner-card {
                    background-color: #f8fafc;
                    padding: 2.5rem;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .learner-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px -15px rgba(0, 51, 102, 0.2);
                }

                .learner-card h3 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #003366;
                    margin-top: 0;
                    margin-bottom: 1.5rem;
                }
                .learner-card p {
                    font-size: 1rem;
                    line-height: 1.8;
                    color: #475569;
                    margin-bottom: 1.5rem;
                }
                .learner-card ul {
                    list-style: none;
                    padding-left: 0;
                    margin: 0;
                }
                .learner-card li {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 0.75rem;
                    color: #334155;
                    font-size: 1rem;
                }
                .learner-card li::before {
                    content: '✓';
                    color: #2563eb;
                    font-weight: bold;
                }
                
                .flowchart-container {
                    margin-top: 4rem;
                    text-align: center;
                }
                .flowchart-image-wrapper {
                    display: inline-block;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px -10px rgba(0, 51, 102, 0.2);
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .flowchart-image-wrapper:hover {
                    transform: translateY(-10px) scale(1.03);
                    box-shadow: 0 35px 60px -15px rgba(0, 51, 102, 0.3);
                }
                .flowchart-image-wrapper img {
                    max-width: 100%;
                    width: 690px;
                    height: auto;
                    display: block;
                }

                /* Back Button */
                .back-button-exact {
                    position: absolute; top: 0; right: 0;
                    background-color: #0056b3; color: white; border: none;
                    border-radius: 30px; padding: 14px 28px; cursor: pointer;
                    display: inline-block; font-size: 16px; font-weight: bold;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    transition: all 0.3s ease; text-decoration: none;
                    text-align: center; font-family: 'Inter', 'Segoe UI', sans-serif;
                }
                .back-button-exact:hover {
                    background-color: #003d82; 
                    transform: translateY(-3px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
                }

                @media (max-width: 768px) {
                    .diversity-section { padding: 1rem; }
                    .diversity-main-wrapper { padding-top: 70px; }
                    .diversity-container { padding: 2rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }
                    .learner-card h3 { font-size: 1.5rem; }
                }
            `}</style>
            <section className="diversity-section">
                <div className="diversity-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="diversity-container">
                        <div className="animated-item fade-up" style={{ animationDelay: '0.1s' }}>
                            <h2 className="main-content-title">SPECIAL PROGRAMS - STUDENT DIVERSITY</h2>
                            <p className="intro-paragraph">{diversityData.intro}</p>
                            <p className="assessment-text">{diversityData.assessment}</p>
                        </div>

                        <div className="learners-grid">
                            <div className="learner-card animated-item slide-left" style={{ animationDelay: '0.3s' }}>
                                <h3>{diversityData.advancedLearners.title}</h3>
                                <p>{diversityData.advancedLearners.intro}</p>
                                <ul>
                                    {diversityData.advancedLearners.points.map((point, index) => <li key={index}>{point}</li>)}
                                </ul>
                            </div>
                            <div className="learner-card animated-item slide-right" style={{ animationDelay: '0.3s' }}>
                                <h3>{diversityData.slowLearners.title}</h3>
                                <p>{diversityData.slowLearners.intro}</p>
                                <ul>
                                    {diversityData.slowLearners.points.map((point, index) => <li key={index}>{point}</li>)}
                                </ul>
                            </div>
                        </div>

                        <div className="flowchart-container animated-item fade-up" style={{ animationDelay: '0.5s' }}>
                            <div className="flowchart-image-wrapper">
                                <img src={diversityData.flowchartImage} alt="Student Diversity Flowchart" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StudentDiversityPage;