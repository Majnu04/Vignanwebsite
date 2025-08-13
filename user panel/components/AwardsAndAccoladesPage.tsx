import React, { useEffect } from 'react';

// --- Data for Awards and Accolades (Exactly as provided) ---
const accoladesData = [
    "Vignan's Institute of Information Technology (VIIT) was established in the year 2002 in the City of Destiny and is promoted by Visionary Dr. Lavu Rathaiah, Chairman of LES, Guntur, Andhra Pradesh.",
    "Approved by AICTE and affiliated with JNTU-GV, VIIT began with 4 UG programs in 2002 and now offers 11 UG and 10 PG programs with 2346 annual intake.",
    "Accredited by NAAC with 'A' Grade CGPA 3.41/4.00 and by NBA for FIVE UG programs such as CSE, ECE, IT, EEE, MECH.",
    "Conferred UGC-Autonomous Status by UGC, New Delhi in the year 2017 and Granted Recognition under section 2(f), & 12(B) of the UGC Act, 1956 in the year 2014.",
    "DIST-FIST funded institute and Recognised by UGC Paramarsh and MHRD-Unnat Bharat Abhiyan Schemes.",
    "Established recognised Research centres by JNTU-GV and VFSTR for Advance Research activity.",
    "Established AICTE-sponsored Idea Lab costing Rs 194 lakhs, research laboratories worth over 500 lakhs, and Ekalavya remote center supported by IIT Mumbai.",
    "Established APSSDC recognised CM's SKILL Center and Dassault skill center, MSME, the govt. of India identified host institute to promote entrepreneurship, CISCO certified Network academy, Register for PMKVY registered for enhancing skills.",
    "VIIT bags the State Energy Conservation Award (SECA-2023) and recognised with 'A' Grade in terms of of kPi in Engineering Education by the Govt. of Andhra Pradesh. Recognised as best consortium leaders by IUCEE in AP and Telangana.",
    "Strong collaboration with premier institutions like Ramon Llull University, New York-USA, HUAWEI Services-Hong Kong, IDS-USA, IIT Madras, TIE Grad Hyd, NRDC, MSME, NRDC, SEMS, AMTZ, Brandix etc,.",
    "MHRD IIC recognised with 4-star rating for Innovation and ARIIA recognised as Brand Performer in the year 2022. Recognised with Industry Center of excellence by EDU Skill and ISTE. Won the I Prize in AICTE-Fit India 2021-22.",
    "Recognised as Valuable chapter with Grade “A” by NPTEL-Swayam, Govt. of India and OBE-Diamond Brand with “A+” Grade by R-World Institutional Ranking 2023",
    "The Institution conforms to quality standards such as ISO 9001:2017, ISO 14001:2018 and OHSAS 18001:2017.",
    "23rd Rank in “Research Rankings” and overall 79th Rank by All India Times Engineering Rankings 2023 and Ranked by Career 360 with AAA+ Grade",
    "Consistently maintained a 90%+ admission rate and More than 90% of students are successfully graduated every year.",
    "More than 85% placements with the highest annual package of Rs. 36 LPA and placed in the reputed MNCs like Amazon, Microsoft, TCS, Accenture, JUSPAY, Infosys, Tech Mahindra, IBM",
    "Bagged 27 gold, 18 silver, and 12 bronze medals at the National level and The International level sports competitions.",
    "Eco-friendly campus with green spaces recognised as Green Institute in Platinum Ranking by Green Mentors, New York, USA.",
    "The institute boasts the State-of-the-art infrastructure, including a central computing center, digital library, and serene learning environment. Its central library spans 15451 sq.m., housing 50000+ volumes, 6500+ e-journals, and 6000+ e-books.",
    "All classrooms and laboratories are equipped with ICT facilities. Amenities include common rooms, a health center, lifts, parking, ATM, cafeterias, security, and restrooms.",
    "Highly qualified faculty with over 30% from premier institutions such as IITs, NITs, and Central Universities ensure excellent performance.",
    "Published 1200+ papers in reputed Sci and Scopus journals, 1727 book chapters, 54 patents, 103 research projects worth 300+ Lakh; h-index improved from 17 to 32 in five years."
];

// --- Main Awards and Accolades Page Component ---
const AwardsAndAccoladesPage = () => {
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.timeline-item');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <>
            <style>{`
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .accolades-section {
                    background-color: #f1f5f9;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .accolades-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    padding-top: 20px;
                }

                .accolades-container {
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
                    opacity: 0;
                    animation: contentFadeInUp 0.6s 0.1s ease-out forwards;
                }
                
                /* Timeline Styles */
                .timeline {
                    position: relative;
                    max-width: 900px;
                    margin: 0 auto;
                }
                .timeline::after {
                    content: '';
                    position: absolute;
                    width: 4px;
                    background-color: #dbeafe;
                    top: 0;
                    bottom: 0;
                    left: 50%;
                    margin-left: -2px;
                    border-radius: 2px;
                    z-index: 1;
                }
                .timeline-item {
                    padding: 10px 40px;
                    position: relative;
                    background-color: inherit;
                    width: 50%;
                    opacity: 0;
                    transform: translateX(-50px);
                    transition: all 0.6s ease-out;
                }
                .timeline-item.is-visible {
                    opacity: 1;
                    transform: translateX(0);
                }
                .timeline-item:nth-child(odd) {
                    left: 0;
                }
                .timeline-item:nth-child(even) {
                    left: 50%;
                    transform: translateX(50px);
                }
                .timeline-item.is-visible:nth-child(even) {
                    transform: translateX(0);
                }

                /* --- CRITICAL FIX FOR NUMBER ALIGNMENT --- */
                .timeline-item::after {
                    content: attr(data-step);
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    background-color: white;
                    border: 4px solid #2563eb;
                    top: 15px;
                    border-radius: 50%;
                    z-index: 2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    color: #2563eb;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }
                .timeline-item:nth-child(odd)::after {
                    left: -20px; /* Position on the left side of the content */
                }
                .timeline-item:nth-child(even)::after {
                    right: -20px; /* Position on the right side of the content */
                }

                .timeline-content {
                    padding: 20px 30px;
                    background-color: #f8fafc;
                    position: relative;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                }
                .timeline-item:hover .timeline-content {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px -5px rgba(0, 51, 102, 0.15);
                }
                .timeline-content p {
                    font-size: 1.05rem;
                    line-height: 1.8;
                    color: #334155;
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
                    .accolades-section { padding: 1rem; }
                    .accolades-main-wrapper { padding-top: 70px; }
                    .accolades-container { padding: 1.5rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 1.75rem; }

                    .timeline::after { left: 20px; }
                    .timeline-item { width: 100%; padding-left: 70px; padding-right: 15px; transform: translateX(50px); }
                    .timeline-item:nth-child(even) { left: 0; }
                    .timeline-item.is-visible { transform: translateX(0); }
                    
                    .timeline-item:nth-child(odd)::after,
                    .timeline-item:nth-child(even)::after {
                        left: 20px;
                        transform: translateX(-50%);
                    }
                }
            `}</style>
            <section className="accolades-section">
                <div className="accolades-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="accolades-container">
                        <h2 className="main-content-title">AWARDS AND ACCOLADES</h2>
                        <div className="timeline">
                            {accoladesData.map((accolade, index) => (
                                <div key={index} className="timeline-item" data-step={index + 1}>
                                    <div className="timeline-content">
                                        <p>{accolade}</p>
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

export default AwardsAndAccoladesPage;