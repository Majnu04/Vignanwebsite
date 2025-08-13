import React from 'react';

// --- Data for Statutory Approvals (Exactly as provided) ---
const approvalsData = [
    {
        bodyName: "AICTE",
        logoSrc: "/images/accreditations/headaicte.png", // <-- REPLACE with your logo link
        approvals: [
            { name: "AICTE Approval 2025-26", link: "/path/to/pdf.pdf" },
            { name: "AICTE Approval 2024-25", link: "/path/to/pdf.pdf" },
            { name: "AICTE Approval 2023-24", link: "/path/to/pdf.pdf" },
            { name: "AICTE Approval 2022-23", link: "/path/to/pdf.pdf" },
            { name: "AICTE Approval 2021-22", link: "/path/to/pdf.pdf" },
            { name: "AICTE Approval 2020-21", link: "/path/to/pdf.pdf" },
            { name: "AICTE Approval 2019-20", link: "/path/to/pdf.pdf" },
            { name: "AICTE Approval 2018-19", link: "/path/to/pdf.pdf" }
        ]
    },
    {
        bodyName: "JNTUK",
        logoSrc: "/images/accreditations/headjntuk.png", // <-- REPLACE with your logo link
        approvals: [
            { name: "JNTUK Permanent Affiliation 2021-23", link: "/path/to/pdf.pdf" },
            { name: "JNTUK Permanent Affiliation 2019-20", link: "/path/to/pdf.pdf" }
        ]
    },
    {
        bodyName: "UGC",
        logoSrc: "/images/accreditations/headugc.png", // <-- REPLACE with your logo link
        approvals: [
            { name: "UGC Autonomous Status 2017", link: "/path/to/pdf.pdf" },
            { name: "UGC Autonomous Status 2024", link: "/path/to/pdf.pdf" }
        ]
    },
    {
        bodyName: "JNTUGV",
        logoSrc: "/images/accreditations/headjntugv.jpg", // <-- REPLACE with your logo link
        approvals: [
            { name: "JNTUGV Research Center CE 2023-25", link: "/path/to/pdf.pdf" },
            { name: "JNTUGV Research Center CSE 2023-25", link: "/path/to/pdf.pdf" },
            { name: "JNTUGV Research Center ECE 2023-25", link: "/path/to/pdf.pdf" },
            { name: "JNTUGV Research Center EEE 2023-25", link: "/path/to/pdf.pdf" },
            { name: "JNTUGV Research Center MECH 2023-25", link: "/path/to/pdf.pdf" },
            { name: "JNTUGV Research Center MBA 2023-25", link: "/path/to/pdf.pdf" }
        ]
    },
    {
        bodyName: "JNTUK Research",
        logoSrc: "/images/accreditations/headjntuk.png", // <-- REPLACE with your logo link
        approvals: [
            { name: "JNTUK Research Center CSE 2016-17", link: "/path/to/pdf.pdf" },
            { name: "JNTUK Research Center MECH 2016-17", link: "/path/to/pdf.pdf" },
            { name: "JNTUK Research Center ECE 2017-18", link: "/path/to/pdf.pdf" },
            { name: "JNTUK Research Center CSE 2018-19", link: "/path/to/pdf.pdf" },
            { name: "JNTUK Research Center EEE 2018-19", link: "/path/to/pdf.pdf" },
            { name: "JNTUK Research Center MBA 2018-19", link: "/path/to/pdf.pdf" },
            { name: "JNTUK Research Center ECE 2019-20", link: "/path/to/pdf.pdf" }
        ]
    }
];

// --- Helper component for the PDF icon ---
const PdfIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-4V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>);


// --- Main Statutory Approvals Page Component ---
const StatutoryApprovalsPage = () => {
    return (
        <>
            <style>{`
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .approvals-section {
                    background-color: #f1f5f9;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .approvals-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    padding-top: 20px;
                }

                .approvals-container {
                    width: 100%;
                    background-color: #ffffff;
                    padding: 3.5rem;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
                    margin-top: 3rem;
                }

                .main-content-title {
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: #1e3a8a;
                    text-align: center;
                    margin-bottom: 4rem;
                    padding-bottom: 1rem;
                    border-bottom: 3px solid #1e3a8a;
                    display: inline-block;
                    animation: contentFadeInUp 0.6s 0.1s ease-out forwards;
                    opacity: 0;
                }
                .title-wrapper {
                    text-align: center;
                }

                .approval-card {
                    display: grid;
                    grid-template-columns: 1fr 3fr;
                    gap: 2.5rem;
                    align-items: flex-start;
                    padding: 2rem 0;
                    border-bottom: 1px solid #e2e8f0;
                    opacity: 0;
                    animation: contentFadeInUp 0.6s ease-out forwards;
                }
                .approval-card:last-child {
                    border-bottom: none;
                }

                .statutory-body {
                    text-align: center;
                }
                .statutory-body-logo {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 1rem;
                    object-fit: contain;
                }
                .statutory-body-name {
                    font-weight: 600;
                    color: #334155;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }

                .approvals-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1rem;
                    perspective: 1000px;
                }
                
                .approval-link-item {
                    display: block;
                    padding: 0.75rem 1rem;
                    background-color: #f8fafc;
                    border-radius: 8px;
                    text-decoration: none;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .approval-link-item:hover {
                    transform: translateY(-6px) scale(1.04) rotateX(5deg) rotateY(-3deg);
                    box-shadow: 0 12px 25px -8px rgba(59, 130, 246, 0.3);
                    border-color: #bfdbfe;
                    background-color: #ffffff;
                }

                .approval-link-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #1e3a8a;
                    font-weight: 500;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }
                .approval-link-content .pdf-icon { color: #ef4444; }
                .approval-link-item:hover .pdf-icon { color: #b91c1c; }

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
                    .approvals-section { padding: 1rem; }
                    .approvals-main-wrapper { padding-top: 70px; }
                    .approvals-container { padding: 2rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }
                    .approval-card {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    .approvals-list {
                        justify-items: center;
                    }
                }
            `}</style>
            <section className="approvals-section">
                <div className="approvals-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="approvals-container">
                        <div className="title-wrapper">
                            <h2 className="main-content-title">STATUTORY APPROVALS</h2>
                        </div>
                        
                        {approvalsData.map((body, index) => (
                            <div key={body.bodyName} className="approval-card" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                                <div className="statutory-body">
                                    <img src={body.logoSrc} alt={`${body.bodyName} Logo`} className="statutory-body-logo" />
                                    <p className="statutory-body-name">{body.bodyName}</p>
                                </div>
                                <div className="approvals-list">
                                    {body.approvals.map((approval) => (
                                        <a key={approval.name} href={approval.link} target="_blank" rel="noopener noreferrer" className="approval-link-item">
                                            <div className="approval-link-content">
                                                <span className="pdf-icon"><PdfIcon /></span>
                                                <span>{approval.name}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default StatutoryApprovalsPage;