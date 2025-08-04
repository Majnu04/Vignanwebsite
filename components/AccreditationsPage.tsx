import React from 'react';

// --- Data for Accreditations (ALL 8 logos are now included) ---
const accreditationsData = [
    { name: "NAAC 2012 (Cycle-I)", imgSrc: '/images/accreditations/headnaac.jpeg', alt: 'NAAC A+ Grade Accreditation' },
    { name: "NAAC 2017 (Cycle-II)", imgSrc: '/images/accreditations/headnaac.jpeg', alt: 'NAAC A+ Grade Accreditation' },
    { name: "NAAC 2024 (Cycle-III)", imgSrc: '/images/accreditations/headnaac.jpeg', alt: 'NAAC A+ Grade Accreditation' },
    { name: "NBA 2009-12", imgSrc: '/images/accreditations/headnba.png', alt: 'NBA Accreditation' },
    { name: "NBA 2017-20", imgSrc: '/images/accreditations/headnba.png', alt: 'NBA Accreditation' },
    { name: "NBA 2020-23", imgSrc: '/images/accreditations/headnba.png', alt: 'NBA Accreditation' },
    { name: "NBA 2024-26", imgSrc: '/images/accreditations/headnba.png', alt: 'NBA Accreditation' },
    { name: "UGC 2f&12B Certification", imgSrc: '/images/accreditations/headugc.png', alt: 'UGC 2f&12B Certification' }
];

// --- Main Accreditations Page Component (NO SIDEBAR) ---
const AccreditationsPage = () => {
    return (
        <>
            <style>{`
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .accreditations-section-focused {
                    background-color: #f8fafc;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .accreditations-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    padding-top: 20px;
                }

                .accreditations-container-focused {
                    width: 100%;
                    background-color: #ffffff;
                    padding: 3rem;
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
                    opacity: 0;
                    animation: contentFadeInUp 0.6s 0.1s ease-out forwards;
                }
                .title-wrapper {
                    text-align: center;
                }

                .accreditations-grid {
                    display: grid;
                    /* Creates a responsive grid that fits as many columns as possible */
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 3rem;
                    justify-items: center;
                }
                .accreditation-item {
                    text-align: center;
                    opacity: 0;
                    animation: contentFadeInUp 0.6s ease-out forwards;
                    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .accreditation-item:hover {
                    transform: translateY(-15px);
                }

                /* --- KEY FIX FOR PERFECT ALIGNMENT --- */
                .accreditation-image-wrapper {
                    width: 200px;
                    height: 200px;
                    margin: 0 auto 1.5rem;
                    border-radius: 16px;
                    display: flex; /* Use flexbox for centering */
                    align-items: center;
                    justify-content: center;
                    padding: 1rem; /* Add some padding around the logo */
                    background-color: #f8fafc;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 10px 20px -10px rgba(0, 51, 102, 0.15);
                    transition: all 0.4s ease;
                }
                .accreditation-item:hover .accreditation-image-wrapper {
                    box-shadow: 0 20px 40px -15px rgba(0, 51, 102, 0.3);
                    border-color: #dbeafe;
                }
                .accreditation-image-wrapper img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain; /* This ensures correct aspect ratio without distortion */
                }
                .accreditation-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #334155;
                    line-height: 1.4;
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

                @media (max-width: 1023px) {
                    .accreditations-section-focused { padding: 1rem; }
                    .accreditations-main-wrapper { padding-top: 70px; }
                    .accreditations-container-focused { margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }
                }
            `}</style>
            <section className="accreditations-section-focused">
                <div className="accreditations-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="accreditations-container-focused">
                        <div className="title-wrapper">
                            <h2 className="main-content-title">ACCREDITATIONS</h2>
                        </div>
                        <div className="accreditations-grid">
                            {accreditationsData.map((item, index) => (
                                <div key={item.name} className="accreditation-item" style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
                                    <div className="accreditation-image-wrapper">
                                        <img src={item.imgSrc} alt={item.name} />
                                    </div>
                                    <p className="accreditation-name">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AccreditationsPage;