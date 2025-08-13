import React, { useEffect } from 'react';

// --- Data for Mentor-Mentee System Page (Corrected Structure for Bullets) ---
const mentorMenteeData = {
    intro: "An effective mentor-mentee system employed in the institute since the inception to handle academic, emotional and psychological issues of the students. Mentoring system always helped mentors to identify the innate strengths and weaknesses of mentees in order to take necessary action.",
    objectives: {
        title: "Objectives of Mentoring System",
        points: [
            "To monitor and enhance the student's regularity, discipline and academic performance.",
            "To focus on individual student progress through consistent support addressing various aspects related to emotional, youth or health issues.",
            "Promote students' balanced engagement in academics and co-curricular activities."
        ]
    },
    process: {
        title: "Process of Mentoring System",
        flowchartImage: "https://i.ibb.co/wxJWLv2/image.png" // <-- REPLACE WITH YOUR FLOWCHART IMAGE LINK
    },
    details: {
        title: "Detailed Process",
        // All points are now in a single array for correct bulleted formatting
        points: [
            "Each faculty is allotted a batch of 15-20 mentees from the first year of admission.",
            "Hours for mentor-mentee interaction are allotted in the regular timetable and however informal interaction is a continuous process.",
            "During interaction of the mentors with the mentee, the personal information is gathered and analyzed by the mentor to assess: family background, any behavioural/ discipline issues, academic/ co-curricular/ extra-curricular interests, health and general well-being.",
            "Basing on the problem, the mentor directs the mentee towards the concerned person to sort out the issue.",
            "In case, the mentee is weak in academics, he/she was entrusted to the coordinator who facilitate them with backlog / remedial classes.",
            "Mentees excelling in academics are motivated to engage in hackathons, coding contests, project expos, certification programs, and similar activities.",
            "Mentees are given liberty to express their problems and assisted in its resolution process at various levels by the department, Chief counselling coordinator, psychologist and management depending on the criticality of the issue.",
            "Freedom given to voice their concerns and are supported in resolving them at different levels by the department, Chief Counselling Coordinator, Psychologist, and Management, based on the severity of the concern.",
            "Mentors provide encouragement to students encountering financial challenges assuring that their problems serve as catalyst and powerful motivators to achieve success.",
            "Mentors closely monitor the mentees and document the interactions; issues raised and resolved using diverse approaches."
        ]
    }
};

// --- Main Mentor-Mentee System Page Component ---
const MentorMenteeSystemPage = () => {

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
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .mentor-section {
                    background-color: #f1f5f9;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .mentor-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1100px;
                    padding-top: 20px;
                }

                .mentor-container {
                    width: 100%;
                    background-color: #ffffff;
                    padding: 3.5rem;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
                    margin-top: 3rem;
                }

                .animated-item {
                    opacity: 0;
                    animation: contentFadeInUp 0.7s ease-out forwards;
                }

                .main-content-title {
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: #1e3a8a;
                    margin-bottom: 2rem;
                }

                .intro-paragraph {
                    font-size: 1.1rem;
                    line-height: 1.9;
                    color: #334155;
                    margin-bottom: 1.5rem;
                    /* --- FIX: Justified text alignment --- */
                    text-align: justify;
                }
                
                .sub-section {
                    margin-top: 3rem;
                }

                .sub-section h3 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #003366;
                    margin-bottom: 1.5rem;
                }
                
                .sub-section ul {
                    list-style: none;
                    padding-left: 0;
                    margin: 0;
                }
                .sub-section li {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 0.75rem;
                    color: #334155;
                    font-size: 1.1rem;
                    line-height: 1.9;
                    /* --- FIX: Justified text alignment --- */
                    text-align: justify;
                }
                .sub-section li::before {
                    content: '•';
                    color: #2563eb;
                    font-weight: bold;
                    font-size: 1.25rem;
                    line-height: 1.5; /* Align bullet with text */
                }
                
                .flowchart-container {
                    margin-top: 3rem;
                    margin-bottom: 3rem;
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
                    .mentor-section { padding: 1rem; }
                    .mentor-main-wrapper { padding-top: 70px; }
                    .mentor-container { padding: 2rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }
                    .sub-section h3 { font-size: 1.5rem; }
                }
            `}</style>
            <section className="mentor-section">
                <div className="mentor-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="mentor-container">
                        <div className="animated-item" style={{ animationDelay: '0.1s' }}>
                            <h2 className="main-content-title">MENTOR – MENTEE SYSTEM</h2>
                            <p className="intro-paragraph">{mentorMenteeData.intro}</p>
                        </div>
                        
                        <div className="sub-section animated-item" style={{ animationDelay: '0.2s' }}>
                            <h3>{mentorMenteeData.objectives.title}</h3>
                            <ul>
                                {mentorMenteeData.objectives.points.map((point, index) => <li key={index}>{point}</li>)}
                            </ul>
                        </div>

                        <div className="sub-section animated-item" style={{ animationDelay: '0.3s' }}>
                            <h3>{mentorMenteeData.process.title}</h3>
                            <div className="flowchart-container">
                                <div className="flowchart-image-wrapper">
                                    <img src={mentorMenteeData.process.flowchartImage} alt="Mentoring System Flowchart" />
                                </div>
                            </div>
                        </div>

                        <div className="sub-section animated-item" style={{ animationDelay: '0.4s' }}>
                             {/* This is now a single list with justified text and bullets */}
                            <ul>
                                {mentorMenteeData.details.points.map((point, index) => <li key={index}>{point}</li>)}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default MentorMenteeSystemPage;