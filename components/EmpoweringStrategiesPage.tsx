import React, { useState } from 'react';

// --- Data for Empowering Strategies ---
const strategiesData = [
    { title: "Performance appraisal system", content: ["The performance of employees is recognized and rewarded with annual increments based on the recommendations of Staff Appraisal Committee."] },
    { title: "Avenues for career development/progression", content: ["Financial support for faculty for attending conferences, workshops, FDPs, refresher, and orientation courses.", "Provision to the teaching faculty to pursue Ph.D under QIP program and academic leave to the extent of 2 months, those who are pursuing Ph.D in part time mode.", "The non-teaching staff are encouraged to upgrade their qualifications. Once they upgrade, suitable position is given.", "Incentives are provided to faculty members for their outstanding research work, publications, and patents. Rewarded consultancy policy with more than 60% share to the faculty."] },
    { title: "Welfare measures for teaching and non-teaching staff", content: ["Free Group health insurance to all teaching staff members with 2,50,000 INR coverage", "Provident Fund for all eligible staff members", "25-75% of fee concession for the children of all staff in Vignan group of institutions.", "180 days of maternity leave.", "Casual leave, medical leave, earned leave, paternity leave and marriage leaves as per the policy.", "Contributes to ESI for all eligible staff members.", "15 days Paid marriage leave with a gift voucher worth Rs. 3,000.", "On the occasion of Ugadi/Dussehra/Diwali/Sankranti, new clothes and sweets to teaching and non-teaching staff", "Visishta Seva Award with cash prize of Rs. 10,000 to those who complete 10 years of service", "Subsidized lunch and free tea, coffee, and snacks to all the staff members", "Free transport for non-teaching staff and subsidized transport for teaching staff"] }
];

// --- Data for the PDF Links ---
const pdfLinksData = [
    { name: "Staff Awards", link: "/path/to/pdf.pdf" }, { name: "Staff Health Insurance", link: "/path/to/pdf.pdf" },
    { name: "Staff Performance Appraisal", link: "/path/to/pdf.pdf" }, { name: "Staff Transport Facility", link: "/path/to/pdf.pdf" },
    { name: "Staff Welfares", link: "/path/to/pdf.pdf" }, { name: "Staff Leave Policy", link: "/path/to/pdf.pdf" },
    { name: "Financial Aid Policy", link: "/path/to/pdf.pdf" }, { name: "Faculty Career Development", link: "/path/to/pdf.pdf" },
    { name: "Faculty Career Development Events", link: "/path/to/pdf.pdf" }, { name: "Faculty Development Programmes (FDPs)/Management Development Programmes (MDPs)", link: "/path/to/pdf.pdf" }
];

// --- Helper Components ---
const PdfIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-4V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>);

const AccordionItem: React.FC<{ strategy: any; isOpen: boolean; onClick: () => void; animationDelay: string; }> = ({ strategy, isOpen, onClick, animationDelay }) => {
    return (
        <div className="accordion-item animated-item" style={{ animationDelay }}>
            <button className={`accordion-header ${isOpen ? 'active' : ''}`} onClick={onClick}>
                <h3>{strategy.title}</h3>
                <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className={`accordion-content-wrapper ${isOpen ? 'open' : ''}`}><div className="accordion-content"><ul>{strategy.content.map((point: string, index: number) => <li key={index}>{point}</li>)}</ul></div></div>
        </div>
    );
};

// --- Main Empowering Strategies Page Component (with Corrected Spacing) ---
const EmpoweringStrategiesPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const handleAccordionClick = (index: number) => setOpenIndex(openIndex === index ? null : index);

    return (
        <>
            <style>{`
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .strategies-section { 
                    background-color: #f1f5f9; 
                    padding: 2rem 2rem 5rem; 
                    font-family: 'Georgia', 'Times New Roman', serif; 
                    display: flex; 
                    justify-content: center; 
                    align-items: flex-start; 
                    min-height: 100vh; 
                }
                
                .strategies-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1000px;
                    /* --- FINAL FIX: Reduced padding to bring content closer to the header --- */
                    padding-top: 20px;
                }
                
                .strategies-container { 
                    width: 100%; 
                    background-color: #ffffff; 
                    padding: 3.5rem; 
                    border-radius: 16px; 
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); 
                    perspective: 1000px;
                    margin-top: 2.5rem; /* Space below the button */
                }
                .animated-item { opacity: 0; animation: contentFadeInUp 0.6s ease-out forwards; }
                
                .strategies-title { font-size: 2.25rem; font-weight: 700; color: #1e3a8a; margin-bottom: 1rem; line-height: 1.2; }
                .strategies-intro { font-size: 1.1rem; line-height: 1.8; color: #475569; margin-bottom: 3rem; }
                .accordion-item { border-bottom: 1px solid #e2e8f0; }
                .accordion-item:last-child { border-bottom: none; }
                .accordion-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 1rem; background-color: transparent; border: none; cursor: pointer; text-align: left; transition: all 0.3s ease; }
                .accordion-header:hover { background-color: #f8fafc; }
                .accordion-header h3 { font-size: 1.25rem; font-weight: 600; color: #1e293b; transition: color 0.3s ease; }
                .accordion-header:hover h3, .accordion-header.active h3 { color: #003366; }
                .accordion-icon { font-size: 2rem; font-weight: 300; color: #003366; transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
                .accordion-header.active .accordion-icon { transform: rotate(180deg); }
                .accordion-content-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.5s cubic-bezier(0.165, 0.84, 0.44, 1); }
                .accordion-content-wrapper.open { grid-template-rows: 1fr; }
                .accordion-content { overflow: hidden; }
                .accordion-content ul { list-style: none; padding: 0 1rem 1.5rem 1rem; margin: 0; color: #334155; font-size: 1.05rem; line-height: 1.8; }
                .accordion-content li { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
                .accordion-content li::before { content: '✓'; color: #2563eb; font-weight: bold; }
                
                .pdf-links-section { margin-top: 3.5rem; padding-top: 2.5rem; border-top: 1px solid #e2e8f0; }
                .pdf-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; }
                .pdf-link-item { display: block; padding: 0.75rem 1rem; background-color: #f8fafc; border-radius: 8px; text-decoration: none; border: 1px solid #e2e8f0; transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); }
                .pdf-link-item:hover { transform: translateY(-6px) scale(1.04) rotateX(5deg) rotateY(-3deg); box-shadow: 0 12px 25px -8px rgba(59, 130, 246, 0.3); border-color: #bfdbfe; background-color: #ffffff; }
                .pdf-link-content { display: flex; align-items: center; gap: 0.75rem; color: #1e3a8a; font-weight: 500; font-family: 'Inter', 'Segoe UI', sans-serif; }
                .pdf-link-content .pdf-icon { color: #ef4444; transition: color 0.3s ease; }
                .pdf-link-item:hover .pdf-icon { color: #b91c1c; }

                /* --- FINAL, CORRECTED BACK BUTTON STYLES --- */
                .back-button-exact {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: #0056b3;
                    color: white;
                    border: none;
                    border-radius: 30px;
                    padding: 14px 28px;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 16px;
                    font-weight: bold;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                    text-decoration: none;
                    text-align: center;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }

                .back-button-exact:hover {
                    background-color: #003d82; 
                    transform: translateY(-3px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
                }
                
                @media (max-width: 768px) {
                    .strategies-section { padding: 1rem; }
                    .strategies-main-wrapper { padding-top: 70px; }
                    .strategies-container { padding: 2rem; margin-top: 0; }
                    .back-button-exact {
                        top: 10px;
                        right: 10px;
                        padding: 12px 24px;
                        font-size: 15px;
                    }
                    .strategies-title { font-size: 1.75rem; }
                    .accordion-header h3 { font-size: 1.1rem; }
                }
            `}</style>
            <section className="strategies-section">
                <div className="strategies-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="strategies-container">
                        <h2 className="strategies-title animated-item" style={{ animationDelay: '0.1s' }}>Empowering Strategies</h2>

                        <p className="strategies-intro animated-item" style={{ animationDelay: '0.3s' }}>
                            The institution values its staff and makes all possible attempts to enhance their to attract and retain both teaching and non-teaching staff a well-defined appraisal system and welfare measures are introduced in the institution. In addition to these many activities are conducted for the career development and progression of the staff.
                        </p>

                        <div className="accordion-container">
                            {strategiesData.map((strategy, index) => (
                                <AccordionItem key={index} strategy={strategy} isOpen={openIndex === index} onClick={() => handleAccordionClick(index)} animationDelay={`${0.4 + index * 0.1}s`} />
                            ))}
                        </div>

                        <div className="pdf-links-section animated-item" style={{ animationDelay: '0.8s' }}>
                            <div className="pdf-grid">
                                {pdfLinksData.map((pdf) => (
                                    <a key={pdf.name} href={pdf.link} target="_blank" rel="noopener noreferrer" className="pdf-link-item">
                                        <div className="pdf-link-content">
                                            <span className="pdf-icon"><PdfIcon /></span>
                                            <span>{pdf.name}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmpoweringStrategiesPage;