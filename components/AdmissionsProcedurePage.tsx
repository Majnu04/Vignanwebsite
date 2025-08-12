import React, { useState, useEffect } from 'react';

// --- Data for Admissions Procedure Page (Exactly as provided) ---
const admissionsData = {
    mainImage: "https://i.ibb.co/Y7CZ47tF/image.png", // <-- REPLACE WITH YOUR IMAGE LINK
    intro: "Vignan's Institute of Information Technology (VIIT) was established in the year 2002 in the City of Destiny and is promoted by Visionary Dr. Lavu Rathaiah, Chairman of LES, Guntur, Andhra Pradesh. Approved by AICTE and affiliated with JNTU-GV, VIIT began with 4 UG programs in 2002 and now offers 11 UG and 10 PG programs with 2346 annual intake (Academic Year: 2024-25).",
    sections: [
        {
            title: "ADMISSION POLICY",
            content: [
                "To ensure admission of students based on their performance in the entrance examinations, identifying their academic competence and potentialities of high quality so that its alumni may be able to play their role in the process of nation building and social reconstruction in a meaningful manner.",
                "To promote and maintain multicultural ethos and cosmopolitan feel by admitting students from diverse ethnic, linguistic backgrounds with special emphasis on students hailing from different socio-economic sections.",
                "In tune with the admission policy of the Institution, top most priority is being given to merit in student admission.",
                "To decide policy matters on admission and to oversee the admission process, a separate “Admissions Cell” is constituted. To frame guidelines from time to time for functioning of Admissions Cell, “Admissions Committee” is constituted with the Principal as Chairman."
            ]
        },
        {
            title: "ADMISSION NOTIFICATION",
            content: [
                "<strong>Category-A</strong><br/>Andhra Pradesh State Council of Higher Education (APSCHE), a competent authority of Government of Andhra Pradesh has been conducting a common entrance examination for admission into various UG and PG programmes separately. Based on performance of the candidates, 70% of seats under category-A will be allocated through various phases of counseling. Competent Authority releases notification for entrance examination and counseling as well for UG and PG programmes separately.",
                "<strong>Category-B</strong><br/>As per the guidelines of APSCHE, Institution releases notification for admissions into various UG and PG programmes. Institution gives wide publicity across the states regarding availability of seats and fee structure through a national daily news paper. 30% of total seats are filled under Category-B by the Institution."
            ]
        },
        {
            title: "ADMISSION PROCEDURE",
            content: [
                "<strong>Category-A:</strong> 70% of total seats are filled by the competent authority through counseling based performance in the entrance exams for admissions into various UG and PG programmes. AP EAPCET, a common entrance test for Engineering, AP EAMCET, a common entrance test for an Honors and Minors Degree Program, AP LAWCET, a common entrance test for Lateral Entry, APICET, a common entrance test for MBA and MCA, APPGCET, a common entrance test for M.Tech Admission.",
                "<strong>Category-B:</strong> 30% of total seats are filled by the Institute as per the guidelines of APSCHE, a competent authority of Government of Andhra Pradesh. As per the guidelines of APSCHE, Institution releases notification to fill category-B vacancies and invite applications from the eligible candidates. Students under this category are also filled based on performance in qualifying examination and other entrance examinations. Upon submission of admission application by the candidate for various UG and PG programmes, candidates will be short listed according to the performance in qualifying examination and other concerned entrance examinations. After verification of eligibility criteria and authentication of original certificates and the parents and the students who are ready to pay the fee, are directed to the accounts section to remit the required fee. After paying the prescribed fee and submission of copies certificates, seat is allotted by the Institution authorities."
            ],
            pdfLink: { name: "Admission Procedure", link: "/path/to/admission-procedure.pdf" }
        }
    ]
};

// --- Helper Components ---
const PdfIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-4V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>);

const AccordionItem: React.FC<{ section: any; isOpen: boolean; onClick: () => void; animationDelay: string; }> = ({ section, isOpen, onClick, animationDelay }) => {
    return (
        <div className="accordion-item animated-item" style={{ animationDelay }}>
            <button className={`accordion-header ${isOpen ? 'active' : ''}`} onClick={onClick}>
                <h3>{section.title}</h3>
                <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className={`accordion-content-wrapper ${isOpen ? 'open' : ''}`}>
                <div className="accordion-content">
                    {section.content.map((point: string, index: number) => <p key={index} dangerouslySetInnerHTML={{ __html: point }} />)}
                    {section.pdfLink && (
                         <a href={section.pdfLink.link} target="_blank" rel="noopener noreferrer" className="pdf-link-item">
                            <div className="pdf-link-content">
                                <span className="pdf-icon"><PdfIcon /></span>
                                <span>{section.pdfLink.name}</span>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Admissions Procedure Page Component ---
const AdmissionsProcedurePage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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

    const handleAccordionClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <style>{`
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .admissions-section {
                    background-color: #f1f5f9;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .admissions-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1100px;
                    padding-top: 20px;
                }

                .admissions-container {
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

                .main-image-wrapper {
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 15px 30px -10px rgba(0, 51, 102, 0.2);
                    margin-bottom: 2rem;
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }
                .main-image-wrapper:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 25px 40px -12px rgba(0, 51, 102, 0.3);
                }
                .main-image-wrapper img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .intro-paragraph {
                    font-size: 1.1rem;
                    line-height: 1.9;
                    color: #334155;
                    margin-bottom: 3rem;
                    text-align: justify;
                }

                .accordion-item { border-bottom: 1px solid #e2e8f0; }
                .accordion-item:last-child { border-bottom: none; }
                .accordion-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 1rem; background-color: transparent; border: none; cursor: pointer; text-align: left; transition: all 0.3s ease; }
                .accordion-header:hover { background-color: #f8fafc; }
                .accordion-header h3 { font-size: 1.5rem; font-weight: 600; color: #1e293b; transition: color 0.3s ease; }
                .accordion-header:hover h3, .accordion-header.active h3 { color: #003366; }
                .accordion-icon { font-size: 2rem; font-weight: 300; color: #003366; transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
                .accordion-header.active .accordion-icon { transform: rotate(180deg); }
                .accordion-content-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.5s cubic-bezier(0.165, 0.84, 0.44, 1); }
                .accordion-content-wrapper.open { grid-template-rows: 1fr; }
                .accordion-content { overflow: hidden; }
                .accordion-content p { color: #334155; font-size: 1.05rem; line-height: 1.8; padding: 0 1rem 1.5rem 1rem; text-align: justify; }
                .accordion-content p strong { color: #1e3a8a; }

                .pdf-link-item { display: inline-block; margin: 0 1rem 1.5rem 1rem; padding: 0.75rem 1rem; background-color: #f8fafc; border-radius: 8px; text-decoration: none; border: 1px solid #e2e8f0; transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); }
                .pdf-link-item:hover { transform: translateY(-5px); box-shadow: 0 8px 20px -5px rgba(59, 130, 246, 0.25); border-color: #bfdbfe; background-color: #eff6ff; }
                .pdf-link-content { display: flex; align-items: center; gap: 0.75rem; color: #1e3a8a; font-weight: 500; font-family: 'Inter', 'Segoe UI', sans-serif; }
                .pdf-link-content .pdf-icon { color: #ef4444; }

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
                    .admissions-section { padding: 1rem; }
                    .admissions-main-wrapper { padding-top: 70px; }
                    .admissions-container { padding: 2rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }
                    .accordion-header h3 { font-size: 1.25rem; }
                }
            `}</style>
            <section className="admissions-section">
                <div className="admissions-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="admissions-container">
                        <div className="animated-item" style={{ animationDelay: '0.1s' }}>
                            <h2 className="main-content-title">ADMISSIONS PROCEDURE</h2>
                        </div>
                        
                        <div className="main-image-wrapper animated-item" style={{ animationDelay: '0.2s' }}>
                            <img src={admissionsData.mainImage} alt="Admissions Information" />
                        </div>

                        <p className="intro-paragraph animated-item" style={{ animationDelay: '0.3s' }}>
                            {admissionsData.intro}
                        </p>
                        
                        <div className="accordion-container">
                            {admissionsData.sections.map((section, index) => (
                                <AccordionItem 
                                    key={index} 
                                    section={section} 
                                    isOpen={openIndex === index} 
                                    onClick={() => handleAccordionClick(index)} 
                                    animationDelay={`${0.4 + index * 0.1}s`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdmissionsProcedurePage;