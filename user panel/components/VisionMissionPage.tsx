import React, { useState, MouseEvent } from 'react';

// --- Professional SVG Icons (Unchanged) ---
const VisionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const MissionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- Reusable Card Component (Unchanged) ---
type VmCardProps = {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    animationDelay: string;
};

const VmCard = ({ title, icon, children, animationDelay }: VmCardProps) => {
    const [transformStyle, setTransformStyle] = useState({});

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - 0.5) * -12;
        const rotateY = (x / rect.width - 0.5) * 12;
        setTransformStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`
        });
    };

    const handleMouseLeave = () => {
        setTransformStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
    };

    return (
        <div
            className="vm-card-final"
            style={{ animationDelay }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-content-final" style={transformStyle}>
                <div className="card-inner-content-final">
                    <div className="icon-container-final">
                        {icon}
                    </div>
                    <h2>{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
};


// --- Main Vision & Mission Page Component ---
const VisionMissionPage = () => {
    const visionText = "We envision to be a recognized leader in technical education and shall aim at national excellence by creating competent & socially conscious technical manpower for the current and the future industrial requirements and development of the nation.";

    const missionPoints = [
        "Introducing innovative practices of teaching & learning.",
        "Undertaking Research & Development in thrust areas.",
        "Continuously collaborating with industry.",
        "Promoting strong set of ethical values.",
        "Serving the surrounding region and the nation at large."
    ];

    return (
        <>
            <style>{`
                @keyframes cardFadeInFinal {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .vm-section-final {
                    background-color: #ffffff;
                    padding: 2rem 2rem 5rem; 
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                .vm-main-wrapper {
                    width: 100%;
                    max-width: 1400px;
                    position: relative;
                    /* --- FINAL FIX: Reduced padding to bring content closer to the header --- */
                    padding-top: 20px; 
                }
                
                .vm-container-final {
                    display: flex;
                    justify-content: center;
                    align-items: stretch;
                    gap: 3rem;
                    flex-wrap: wrap;
                    width: 100%;
                    margin-top: 2.5rem; /* Add some space below the button */
                }
                
                .vm-card-final {
                    flex: 1 1 500px;
                    opacity: 0;
                    animation: cardFadeInFinal 1s ease-out forwards;
                    border-radius: 22px;
                    box-shadow: 0 20px 45px -12px rgba(0, 51, 102, 0.25);
                }
                .vm-card-final.mission {
                    animation-delay: 0.2s;
                }
                .vm-card-final:hover {
                    box-shadow: 0 30px 55px -15px rgba(0, 51, 102, 0.3);
                }

                .card-content-final {
                    background: linear-gradient(135deg, #003366 0%, #004080 100%);
                    color: white;
                    border-radius: inherit;
                    padding: 3rem;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.2s ease-out;
                }
                .card-inner-content-final {
                    position: relative;
                }
                .icon-container-final {
                    width: 60px; height: 60px;
                    border-radius: 16px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 1.75rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .vm-card-final h2 {
                    font-size: 2.5rem; font-weight: 800;
                    letter-spacing: 1px; margin-bottom: 1.75rem;
                    text-transform: uppercase;
                    text-shadow: 0 2px 5px rgba(0,0,0,0.4);
                }
                .vision-text-final {
                    font-size: 1.15rem; line-height: 1.7;
                    color: #e2e8f0;
                }
                .mission-list-final {
                    list-style: none; padding: 0; margin: 0;
                    font-size: 1.05rem; line-height: 1.8;
                }
                .mission-list-final li {
                    display: flex; align-items: center;
                    gap: 1rem; margin-bottom: 1rem;
                    color: #cbd5e1;
                }
                .mission-list-final .mission-icon-bullet {
                    flex-shrink: 0; font-weight: bold; font-size: 1.4rem;
                }

                .back-button-exact {
                    position: absolute;
                    top: 0; /* Positioned relative to the top of vm-main-wrapper */
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
                    .vm-section-final { padding: 1rem; }
                    .vm-main-wrapper { padding-top: 70px; } /* Space for button on mobile */
                    .back-button-exact {
                        top: 10px;
                        right: 10px;
                        padding: 12px 24px;
                        font-size: 15px;
                    }
                    .vm-container-final { gap: 2.5rem; margin-top: 0; }
                    .card-content-final { padding: 2.5rem; }
                    .vm-card-final h2 { font-size: 2.25rem; }
                    .vision-text-final, .mission-list-final { font-size: 1rem; }
                }
            `}</style>

            <section className="vm-section-final">
                <div className="vm-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>

                    <div className="vm-container-final">
                        <VmCard title="Vision" icon={<VisionIcon />} animationDelay="0s">
                            <p className="vision-text-final">{visionText}</p>
                        </VmCard>
                        <VmCard title="Mission" icon={<MissionIcon />} animationDelay="0.2s">
                            <ul className="mission-list-final">
                                {missionPoints.map((point, index) => (
                                    <li key={index}>
                                        <div className="mission-icon-bullet">»</div>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </VmCard>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VisionMissionPage;