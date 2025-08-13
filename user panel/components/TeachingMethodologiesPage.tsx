import React, { useEffect } from 'react';

// --- Data for Teaching Methodologies (Exactly as provided) ---
const methodologiesData = {
    intro: [
        "The institute employed student-centric methods following NEP 2020 for planning and delivering of content. A monitoring committee, comprised of the Dean of Academics, the Department Head, IQAC representatives, and the Department Teaching-Learning Coordinator, is responsible for overseeing the execution of NEP 2020 and submit a report to Principal.",
        "The faculty are guided to adopt student-centric methods, they were instructed to:",
    ],
    instructions: [
        "Utilized to teach 40% of classes using ICT enabled teaching tools like MATLAB, Autodesk Fusion 360, LabVIEW, CISCO Packet tracer, Google Cloud AutoML, PVsyst, Google Colab.",
        "lecture minimum two topics for each course using innovative methods.",
        "upload lesson plans, lecture notes, question papers in LMS, 'MOODLES'.",
        "Register and complete two online courses through Swayam-NPTEL, Coursera, edX.",
        "Participate in FDPs to upgrade technical knowledge and 40% of faculty are encouraged to participate in FDPs related to ICT."
    ],
    outro: "Every academic year, during the first week of classes, the class coordinator and the department's Teaching-Learning (TL) coordinator assess students through the Felder-Soloman Learning Questionnaire. Diverse teams based on various learning styles are established and adhered to for all collaborative Teaching-Learning (TL) approaches.",
    sections: [
        {
            title: "Experiential/ Experiment learning through",
            points: [
                "Integration of theory courses with practical sessions.",
                "Minor projects for all II & III Year UG programmes.",
                "Semester-long internship in final year.",
                "Skill Development Labs and Value-Added Courses.",
                "Simulation based experiments in laboratories.",
                "Activities through Clubs and IEEE Student Chapter, ACM Professional Chapters and Department Associations in STEM domains."
            ]
        },
        {
            title: "Participative Learning:",
            points: [
                "Participative and Collaborative learning is promoted through innovative T&L methods such as Think Pair Share (TPS), Formulate Share Create Revise (FSCR), Attention Relevance Confidence Satisfaction (ARCS), Open Book Exam, Flipped Classroom, Expert lectures and Peer learning etc.",
                "Students were given the option to enrol MOOCs to complete 14 courses through online.",
                "Research guidance to publish articles/works in indexed journals."
            ]
        },
        {
            title: "Problem Solving Methodologies:",
            points: [
                "Students are fortified to participate in Start-up challenges, VISTA-Technical Project Exhibition.",
                "Included a course on Engineering Exploration in the curriculum.",
                "Collaborated with HackerEarth, Codechef, Geeks for Geeks, IIC and Community Service Projects etc."
            ]
        },
        {
            title: "Blended Teaching Approach:",
            points: [
                "3554 video lectures were developed by faculty and given access through institute LMS portal https://elearning.vignaniit.edu.in/.",
                "ICT tools like Google forms, Mentimeter, Slido and Kahoot are employed for quick formative assessments and instant feedback.",
                "6226 E-books and 537 Journals (194 IEEE, 39 ASCE, 28 ASME, 276 ELSEVIER) are available in the library."
            ]
        }
    ],
    flowchartImage: "https://i.ibb.co/xK6k7fZZ/image.png" // <-- REPLACE WITH YOUR FLOWCHART IMAGE LINK
};

// --- Main Teaching Methodologies Page Component ---
const TeachingMethodologiesPage = () => {

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
                
                .teaching-section-professional {
                    background-color: #f1f5f9;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .teaching-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1100px;
                    padding-top: 20px;
                }

                .teaching-container-professional {
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

                .intro-paragraph, .method-section-professional ul {
                    font-size: 1.1rem;
                    line-height: 1.9;
                    color: #334155;
                    margin-bottom: 1.5rem;
                }
                
                .method-section-professional {
                    padding-top: 2rem;
                    margin-top: 2rem;
                    border-top: 1px solid #e2e8f0;
                }

                .method-section-professional h3 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #003366;
                    margin-top: 0;
                    margin-bottom: 1.5rem;
                }
                
                .method-section-professional ul {
                    list-style: none;
                    padding-left: 0;
                    margin-bottom: 0;
                }
                .method-section-professional li {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 0.75rem;
                }
                .method-section-professional li::before {
                    content: '•';
                    color: #2563eb;
                    font-weight: bold;
                    font-size: 1.25rem;
                    line-height: 1.5;
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
                    .teaching-section-professional { padding: 1rem; }
                    .teaching-main-wrapper { padding-top: 70px; }
                    .teaching-container-professional { padding: 2rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }
                    .method-section-professional h3 { font-size: 1.5rem; }
                }
            `}</style>
            <section className="teaching-section-professional">
                <div className="teaching-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="teaching-container-professional">
                        <div className="animated-item" style={{ animationDelay: '0.1s' }}>
                            <h2 className="main-content-title">TEACHING METHODOLOGIES</h2>
                            {methodologiesData.intro.map((text, index) => <p key={index} className="intro-paragraph">{text}</p>)}
                            <div className="method-section-professional" style={{borderTop: 'none', paddingTop: 0, marginTop: 0}}>
                                <ul>{methodologiesData.instructions.map((point, index) => <li key={index}>{point}</li>)}</ul>
                            </div>
                            <p className="intro-paragraph">{methodologiesData.outro}</p>
                        </div>
                        
                        {methodologiesData.sections.map((section, index) => (
                            <div key={section.title} className="method-section-professional animated-item" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                                <h3>{section.title}</h3>
                                <ul>
                                    {section.points.map((point, pIndex) => <li key={pIndex}>{point}</li>)}
                                </ul>
                            </div>
                        ))}

                        <div className="flowchart-container animated-item" style={{ animationDelay: '0.8s' }}>
                            <div className="flowchart-image-wrapper">
                                <img src={methodologiesData.flowchartImage} alt="Student Centric Methods Flowchart" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeachingMethodologiesPage;