import React, { useEffect } from 'react';

// --- Data for Courses Offered (Exactly as provided, with placeholders for links/images) ---
const coursesData = {
    undergraduate: {
        title: "Undergraduate Programmes (B.Tech)",
        programmes: [
            { name: "Computer Science & Engineering", link: "/departments/cse", imageSrc: "https://via.placeholder.com/400x500/1e3a8a/ffffff?text=CSE" },
            { name: "CSE (AI & ML)", link: "/departments/cse-aiml", imageSrc: "https://via.placeholder.com/400x500/3b82f6/ffffff?text=AI+&+ML" },
            { name: "CSE (Data Science)", link: "/departments/cse-ds", imageSrc: "https://via.placeholder.com/400x500/14b8a6/ffffff?text=Data+Science" },
            { name: "Information Technology", link: "/departments/it", imageSrc: "https://via.placeholder.com/400x500/0891b2/ffffff?text=IT" },
            { name: "Electronics & Communication Engineering", link: "/departments/ece", imageSrc: "https://via.placeholder.com/400x500/f97316/ffffff?text=ECE" },
            { name: "Electrical & Electronics Engineering", link: "/departments/eee", imageSrc: "https://via.placeholder.com/400x500/f59e0b/ffffff?text=EEE" },
            { name: "Mechanical Engineering", link: "/departments/mech", imageSrc: "https://via.placeholder.com/400x500/64748b/ffffff?text=MECH" },
            { name: "Civil Engineering", link: "/departments/civil", imageSrc: "https://via.placeholder.com/400x500/78716c/ffffff?text=Civil" },
        ]
    },
    postgraduate: {
        title: "Postgraduate Programmes",
        programmes: [
            { name: "M.Tech - Computer Science & Engineering", link: "/departments/mtech-cse", imageSrc: "https://via.placeholder.com/400x500/1e3a8a/ffffff?text=M.Tech+CSE" },
            { name: "M.Tech - VLSI", link: "/departments/mtech-vlsi", imageSrc: "https://via.placeholder.com/400x500/f97316/ffffff?text=M.Tech+VLSI" },
            { name: "Master of Business Administration (MBA)", link: "/departments/mba", imageSrc: "https://via.placeholder.com/400x500/6d28d9/ffffff?text=MBA" }
        ]
    }
};

// --- Main Courses Offered Page Component ---
const CoursesOfferedPage = () => {

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
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                
                .courses-section {
                    background-color: #f1f5f9;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .courses-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1400px;
                    padding-top: 20px;
                }

                .courses-container {
                    width: 100%;
                    background-color: #ffffff;
                    padding: 3.5rem;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
                    margin-top: 3rem;
                }

                .animated-item {
                    opacity: 0;
                    animation: contentFadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }

                .main-content-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1e3a8a;
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .programme-section {
                    margin-bottom: 4rem;
                }
                .programme-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #003366;
                    margin-bottom: 2.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid #e2e8f0;
                }

                .courses-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2.5rem;
                }

                .course-card {
                    display: block;
                    position: relative;
                    height: 400px;
                    border-radius: 16px;
                    overflow: hidden;
                    text-decoration: none;
                    box-shadow: 0 15px 30px -10px rgba(0,0,0,0.2);
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .course-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 25px 50px -12px rgba(0, 51, 102, 0.3);
                }

                .card-bg-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 0; left: 0;
                    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .course-card:hover .card-bg-image {
                    transform: scale(1.1);
                }

                .card-overlay {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(to top, rgba(0, 20, 50, 0.9) 0%, rgba(0, 20, 50, 0.2) 60%, transparent 100%);
                    transition: background 0.4s ease;
                }
                .course-card:hover .card-overlay {
                    background: linear-gradient(to top, rgba(0, 10, 30, 0.95) 0%, rgba(0, 10, 30, 0.3) 60%, transparent 100%);
                }

                .card-content {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 1.5rem;
                    color: white;
                }
                .card-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    line-height: 1.3;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
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
                    .courses-section { padding: 1rem; }
                    .courses-main-wrapper { padding-top: 70px; }
                    .courses-container { padding: 1.5rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .main-content-title { font-size: 2rem; }
                    .programme-title { font-size: 1.75rem; }
                }
            `}</style>
            <section className="courses-section">
                <div className="courses-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="courses-container">
                        <div className="title-wrapper animated-item" style={{ animationDelay: '0.1s' }}>
                            <h2 className="main-content-title">Courses Offered</h2>
                        </div>
                        
                        <div className="programme-section animated-item" style={{ animationDelay: '0.2s' }}>
                            <h3 className="programme-title">{coursesData.undergraduate.title}</h3>
                            <div className="courses-grid">
                                {coursesData.undergraduate.programmes.map((prog, index) => (
                                    <a key={prog.name} href={prog.link} className="course-card animated-item" style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
                                        <img src={prog.imageSrc} alt={prog.name} className="card-bg-image" />
                                        <div className="card-overlay"></div>
                                        <div className="card-content">
                                            <h4 className="card-title">{prog.name}</h4>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="programme-section animated-item" style={{ animationDelay: '0.6s' }}>
                            <h3 className="programme-title">{coursesData.postgraduate.title}</h3>
                            <div className="courses-grid">
                                {coursesData.postgraduate.programmes.map((prog, index) => (
                                    <a key={prog.name} href={prog.link} className="course-card animated-item" style={{ animationDelay: `${0.7 + index * 0.05}s` }}>
                                        <img src={prog.imageSrc} alt={prog.name} className="card-bg-image" />
                                        <div className="card-overlay"></div>
                                        <div className="card-content">
                                            <h4 className="card-title">{prog.name}</h4>
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

export default CoursesOfferedPage;