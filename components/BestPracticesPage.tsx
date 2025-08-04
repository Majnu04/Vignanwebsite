import React, { useEffect } from 'react';

// --- Data for Best Practices (Exactly as provided) ---
const practicesData = [
    {
        title: "Best Practice-I",
        subtitle: "Felicitation of Parents",
        description: "VIIT has introduced a distinct initiative to honour and appreciate parents for their invaluable support. Their contributions have not only stimulated programme success but also propelled the other students to be more active and serious about their careers. A carefully crafted curriculum with supplementary courses and structured training from the first semester onwards contributed to student success. In addition, parent involvement in the Mentor-Mentee program significantly supported the achievements of students.",
        imageSrc: "https://i.ibb.co/XZ7MMF7g/Bestp-1.jpg"
    },
    {
        title: "Best Practice-II",
        subtitle: "Empowerment of Faculty for Effective Teaching-Learning and Research",
        description: "The main objective of this initiative is to extend the intellectual horizons of faculty members, improve their teaching skills and research capabilities, and thereby foster career enhancement. To train faculty with diverse teaching methods, ICT tools, e-content creation, and to engage in Inter-Disciplinary and Trans-Disciplinary research aligned with NEP 2020 and sustainable goals. Orientation programs for new faculty members emphasize institute vision and mission, work culture, effective teaching, and qualities such as empathy, emotional balance, transparency in evaluation, and the significance of research for career advancement.",
        imageSrc: "https://i.ibb.co/kVsdqPDk/Bestp-2.jpg"
    }
];

// --- Main Best Practices Page Component (with Back Button) ---
const BestPracticesPage = () => {
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { 
            threshold: 0.2,
        });

        const elements = document.querySelectorAll('.practice-row-final');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <>
            <style>{`
                .practices-page-final {
                    background-color: #f8f9fa;
                    padding: 2rem 2rem 6rem;
                    font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                    display: flex;
                    justify-content: center;
                    overflow-x: hidden;
                    min-height: 100vh;
                }
                
                .practices-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    /* --- FINAL FIX: Reduced padding to bring content closer to the header --- */
                    padding-top: 20px;
                }
                
                .practices-container-final {
                    display: flex;
                    flex-direction: column;
                    gap: 8rem;
                    margin-top: 2.5rem; /* Space below the button */
                }
                
                .practice-row-final {
                    display: flex;
                    align-items: center;
                    gap: 4rem;
                    opacity: 0;
                    transition: opacity 0.8s ease-out;
                }
                .practice-row-final.is-visible {
                    opacity: 1;
                }
                .practice-row-final:nth-child(even) {
                    flex-direction: row-reverse;
                }
                .practice-text-content, .practice-image-content {
                    flex: 1;
                    transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                    opacity: 0;
                    transform: translateY(40px);
                }
                .practice-row-final.is-visible .practice-text-content {
                    transform: translateY(0);
                    opacity: 1;
                    transition-delay: 0.1s;
                }
                .practice-row-final.is-visible .practice-image-content {
                    transform: translateY(0);
                    opacity: 1;
                    transition-delay: 0.3s;
                }
                .practice-title-tag {
                    display: inline-block;
                    padding: 0.5rem 1.5rem;
                    background-color: #0d2c5a;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                }
                .practice-subtitle {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #212529;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                }
                .practice-description {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #6c757d;
                }
                .practice-image-content {
                    text-align: center;
                    transition: transform 0.4s ease;
                }
                 .practice-row-final:hover .practice-image-content {
                    transform: scale(1.03);
                }
                .practice-image-content img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2);
                }

                /* --- FINAL Back Button Styles --- */
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

                @media (max-width: 992px) {
                    .practices-page-final { padding: 1rem; }
                    .practices-main-wrapper { padding-top: 70px; }
                    .practices-container-final { margin-top: 0; }
                    .practice-row-final, .practice-row-final:nth-child(even) {
                        flex-direction: column;
                        gap: 3rem;
                    }
                    .back-button-exact {
                        top: 10px;
                        right: 10px;
                    }
                }
                
                @media (max-width: 768px) {
                     .practice-subtitle {
                        font-size: 2rem;
                    }
                    .back-button-exact {
                        padding: 12px 24px;
                        font-size: 15px;
                    }
                }
            `}</style>
            <div className="practices-page-final">
                <div className="practices-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="practices-container-final">
                        {practicesData.map((practice, index) => (
                            <div key={index} className="practice-row-final">
                                <div className="practice-text-content">
                                    <h3 className="practice-title-tag">{practice.title}</h3>
                                    <h2 className="practice-subtitle">{practice.subtitle}</h2>
                                    <p className="practice-description">{practice.description}</p>
                                </div>
                                <div className="practice-image-content">
                                    <img src={practice.imageSrc} alt={practice.subtitle} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default BestPracticesPage;