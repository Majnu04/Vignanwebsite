import React, { useState, useEffect } from 'react';

// --- Data for the Carousel Images ---
const carouselImages = [
    "https://i.ibb.co/yV7p8yP/nirf-banner.jpg",
    "https://i.ibb.co/wJ2yD42/naac-banner.jpg",
    "https://i.ibb.co/g9qR2fP/awards-banner.jpg"
];

// --- *** COMPLETE AND CORRECTED Data for all 16 PDF Categories *** ---
const certificationsData = [
    { category: "International Standard Organisation", items: [{ name: "ISO 45001:2018 (2022-25)", link: "#" }, { name: "ISO 9001:2015 (2022-25)", link: "#" }, { name: "ISO 14001:2015 (2022-25)", link: "#" }, { name: "ISO 9001:2015 (2017-18)", link: "#" }, { name: "OHSAS 18001:2007 (2017-18)", link: "#" }] },
    { category: "Safety Certificates", items: [{ name: "Fire Safety Certificate", link: "#" }, { name: "Food Safety Certificate", link: "#" }, { name: "UV RO Plant Certificate", link: "#" }] },
    { category: "All India Survey on Higher Education", items: [{ name: "AISHE 2024-25", link: "#" }, { name: "AISHE 2023-24", link: "#" }, { name: "AISHE 2022-23", link: "#" }] },
    { category: "Atal Ranking of Institutions on Innovation Achievements", items: [{ name: "ARIIA-2022", link: "#" }] },
    { category: "Andhra Pradesh Information Technology Academy", items: [{ name: "APITA 2019-2020", link: "#" }] },
    { category: "CISCO", items: [{ name: "Women Rock IT", link: "#" }] },
    { category: "NATIONAL WOMEN'S PARLIAMENT", items: [{ name: "National Womens Parliament", link: "#" }] },
    { category: "NPTEL", items: [{ name: "NPTEL - 2019", link: "#" }, { name: "NPTEL - 2022", link: "#" }] },
    { category: "CAMBRIDGE", items: [{ name: "Cambridge Assessment English", link: "#" }] },
    { category: "GREEN AWARDS", items: [{ name: "Green Waves Environmental Solutions", link: "#" }, { name: "State Energy Conservation Mission", link: "#" }, { name: "Green Institute", link: "#" }, { name: "Others", link: "#" }] },
    { category: "CII", items: [{ name: "Young Indians - CII", link: "#" }, { name: "AICTE - CII", link: "#" }] },
    { category: "Center for Education Growth and Research", items: [{ name: "CEGR", link: "#" }] },
    { category: "TIMES", items: [{ name: "TIMES Ranking 2017", link: "#" }, { name: "TIMES Magazine - VIIT", link: "#" }, { name: "All India Times Ranking-2023", link: "#" }, { name: "Times Engineering Institute Ranking 2023", link: "#" }, { name: "Times Engineering Survey Institutes-2025", link: "#" }] },
    { category: "ACADEMIC INSIGHTS", items: [{ name: "INDIA'S TOP 50 ENGINEERING COLLEGES SURVEY - 2025", link: "#" }] },
    { category: "R World Institutional Ranking", items: [{ name: "R World - 2023", link: "#" }, { name: "OBE-2023", link: "#" }] },
    { category: "AMBITIOUS AWARD", items: [{ name: "Education Excellence 20-21", link: "#" }] },
    { category: "PRIME TIME", items: [{ name: "Global Education Excellence 2017", link: "#" }] },
    { category: "SERVICE AWARDS", items: [{ name: "Helping Hearts", link: "#" }, { name: "Vijaya Sri Blood Bank", link: "#" }, { name: "Amma Teresa Foundation", link: "#" }, { name: "For the People Charitable Trust", link: "#" }, { name: "NTR Memorial Trust", link: "#" }] },
    { category: "OTHERS", items: [{ name: "Dewang Mehta National Education Awards", link: "#" }] }
];

// --- Helper component for the PDF icon ---
const PdfIcon = () => (<svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-4V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>);

// --- Main Ranking & Certifications Page Component ---
const RankingsPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prev => (prev === carouselImages.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(slideInterval);
    }, []);

    return (
        <>
            <style>{`
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes kenBurnsEffect {
                    0%, 100% { transform: scale(1) translateX(0); }
                    50% { transform: scale(1.1) translateX(-5px); }
                }
                
                .rankings-section { background-color: #f8fafc; padding: 2rem; font-family: 'Georgia', 'Times New Roman', serif; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; }
                .rankings-main-wrapper { position: relative; width: 100%; max-width: 1200px; padding-top: 20px; }
                .rankings-container { width: 100%; background-color: #ffffff; padding: 3rem; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); margin-top: 3rem; }
                
                .main-content-title { font-size: 2.25rem; font-weight: 700; color: #1e3a8a; text-align: center; margin-bottom: 2.5rem; display: inline-block; opacity: 0; animation: contentFadeInUp 0.6s 0.1s ease-out forwards; }
                .title-wrapper { text-align: center; }

                .carousel-container {
                    width: 100%;
                    height: 400px;
                    border-radius: 16px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 15px 30px -10px rgba(0,0,0,0.2);
                    opacity: 0;
                    animation: contentFadeInUp 0.6s 0.2s ease-out forwards;
                }
                .carousel-slide {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transition: opacity 1.5s ease-in-out;
                }
                .carousel-slide img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    animation: kenBurnsEffect 10s ease-in-out infinite alternate;
                }
                .carousel-slide:nth-child(odd) img {
                    animation-direction: alternate-reverse;
                }

                .certifications-grid {
                    margin-top: 3.5rem;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                }
                .certification-card {
                    opacity: 0;
                    animation: contentFadeInUp 0.6s ease-out forwards;
                }
                .certification-category {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1e3a8a;
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 2px solid #e2e8f0;
                }
                .certification-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                }
                .certification-link {
                    display: block;
                    padding: 0.75rem 1rem;
                    background-color: #f8fafc;
                    border-radius: 8px;
                    text-decoration: none;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .certification-link:hover {
                    transform: translateY(-5px) scale(1.03);
                    box-shadow: 0 10px 20px -8px rgba(59, 130, 246, 0.3);
                    border-color: #bfdbfe;
                    background-color: #eff6ff;
                }
                .certification-link-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #1e3a8a;
                    font-weight: 500;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }
                .certification-link-content .pdf-icon { color: #ef4444; }

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
                    .rankings-section { padding: 1rem; }
                    .rankings-main-wrapper { padding-top: 70px; }
                    .rankings-container { padding: 1.5rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }
                }
            `}</style>
            <section className="rankings-section">
                <div className="rankings-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="rankings-container">
                        <div className="title-wrapper">
                            <h2 className="main-content-title">RANKING & CERTIFICATIONS</h2>
                        </div>
                        
                        <div className="carousel-container">
                            {carouselImages.map((src, index) => (
                                <div key={index} className="carousel-slide" style={{ opacity: currentSlide === index ? 1 : 0 }}>
                                    <img src={src} alt={`Slide ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        <div className="certifications-grid">
                            {certificationsData.map((category, index) => (
                                <div key={category.category} className="certification-card" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                                    <h3 className="certification-category">{category.category}</h3>
                                    <div className="certification-list">
                                        {category.items.map(item => (
                                            <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" className="certification-link">
                                                <div className="certification-link-content">
                                                    <span className="pdf-icon"><PdfIcon /></span>
                                                    <span>{item.name}</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RankingsPage;