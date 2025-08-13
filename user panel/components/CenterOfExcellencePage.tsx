import React from 'react';

// --- Data for Center of Excellence (All 16 logos are now included) ---
const coeData = [
    { name: "AICTE Idea lab", imgSrc:  '/images/accreditations/headaicteidea.png', alt: 'AICTE Idea Lab Accreditation' },
    { name: "DST-FIST", imgSrc:  '/images/accreditations/headdst.png', alt: 'DST-FIST Accreditation' },
    { name: "UGC STRIDE", imgSrc:  '/images/accreditations/headugc.png', alt: 'UGC STRIDE Accreditation' },
    { name: "UGC Paramarsh", imgSrc:  '/images/accreditations/headugc.png', alt: 'UGC Paramarsh Accreditation' },
    { name: "MSME Incubation", imgSrc:  '/images/accreditations/headmsme.png', alt: 'MSME Incubation Accreditation' },
    { name: "Unnat Bharat Abhiyan", imgSrc:  '/images/accreditations/headuba.png', alt: 'Unnat Bharat Abhiyan Accreditation' },
    { name: "IIC 2018-19", imgSrc:  '/images/accreditations/headiic.png', alt: 'IIC 2018-19 Accreditation' },
    { name: "IIC 2020-21", imgSrc:  '/images/accreditations/headiic.png', alt: 'IIC 2020-21 Accreditation' },
    { name: "IIC 2021-22", imgSrc:  '/images/accreditations/headiic.png', alt: 'IIC 2021-22 Accreditation' },
    { name: "IIC 2022-23", imgSrc:  '/images/accreditations/headiic.png', alt: 'IIC 2022-23 Accreditation' },
    { name: "IIC 2023-24", imgSrc:  '/images/accreditations/headiic.png', alt: 'IIC 2023-24 Accreditation' },
    { name: "IIC NIPAM 2022", imgSrc:  '/images/accreditations/headiic.png', alt: 'IIC NIPAM 2022 Accreditation' },
    { name: "VFSTR Research Center", imgSrc:  '/images/accreditations/headvfstr.png', alt: 'VFSTR Research Center Accreditation' },
    { name: "APSCHE QAC Mentor", imgSrc:  '/images/accreditations/headapsche.png', alt: 'APSCHE QAC Mentor Accreditation' },
    { name: "CISCO", imgSrc:  '/images/accreditations/headcisco.png', alt: 'CISCO Accreditation' },
    { name: "IUCUEE", imgSrc:  '/images/accreditations/headiucuee.png', alt: 'IUCUEE Accreditation' }
];

// --- Main Center of Excellence Page Component ---
const CenterOfExcellencePage = () => {
    return (
        <>
            <style>{`
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .coe-section-focused {
                    background-color: #f8fafc;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .coe-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    padding-top: 20px;
                }

                .coe-container-focused {
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

                .coe-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 3rem;
                    justify-items: center;
                }
                .coe-item {
                    text-align: center;
                    opacity: 0;
                    animation: contentFadeInUp 0.6s ease-out forwards;
                    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .coe-item:hover {
                    transform: translateY(-15px);
                }

                .coe-image-wrapper {
                    width: 180px;
                    height: 180px;
                    margin: 0 auto 1.5rem;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    background-color: #ffffff;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 10px 20px -10px rgba(0, 51, 102, 0.15);
                    transition: all 0.4s ease;
                }
                .coe-item:hover .coe-image-wrapper {
                    box-shadow: 0 20px 40px -15px rgba(0, 51, 102, 0.3);
                    border-color: #dbeafe;
                }
                .coe-image-wrapper img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }
                .coe-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #334155;
                    line-height: 1.4;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
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
                    .coe-section-focused { padding: 1rem; }
                    .coe-main-wrapper { padding-top: 70px; }
                    .coe-container-focused { margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }
                }
            `}</style>
            <section className="coe-section-focused">
                <div className="coe-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="coe-container-focused">
                        <div className="title-wrapper">
                            <h2 className="main-content-title">CENTER OF EXCELLENCE</h2>
                        </div>
                        <div className="coe-grid">
                            {coeData.map((item, index) => (
                                <div key={item.name} className="coe-item" style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
                                    <div className="coe-image-wrapper">
                                        <img src={item.imgSrc} alt={item.name} />
                                    </div>
                                    <p className="coe-name">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CenterOfExcellencePage;