import React, { useEffect } from 'react';

// --- Data for Admission Lists Page (Exactly as provided) ---
const admissionListsData = [
    {
        title: "ADMISSIONS LISTS",
        items: [
            { name: "Admission List 2022-23", link: "/path/to/pdf.pdf" },
            { name: "Admission List 2021-22", link: "/path/to/pdf.pdf" },
            { name: "Admission List 2020-21", link: "/path/to/pdf.pdf" },
            { name: "Admission List 2019-20", link: "/path/to/pdf.pdf" },
            { name: "Admission List 2018-19", link: "/path/to/pdf.pdf" },
        ]
    },
    {
        title: "CATEGORY WISE ADMISSIONS LISTS",
        items: [
            { name: "Category wise Admission List 2022-23", link: "/path/to/pdf.pdf" },
            { name: "Category wise Admission List 2021-22", link: "/path/to/pdf.pdf" },
            { name: "Category wise Admission List 2020-21", link: "/path/to/pdf.pdf" },
            { name: "Category wise Admission List 2019-20", link: "/path/to/pdf.pdf" },
            { name: "Category wise Admission List 2018-19", link: "/path/to/pdf.pdf" },
        ]
    },
    {
        title: "NO OF SEATS EARMARKED FOR RESERVED CATEGORIES",
        items: [
            { name: "Academic Year 2022-23", link: "/path/to/pdf.pdf" },
            { name: "Academic Year 2021-22", link: "/path/to/pdf.pdf" },
            { name: "Academic Year 2020-21", link: "/path/to/pdf.pdf" },
            { name: "Academic Year 2019-20", link: "/path/to/pdf.pdf" },
            { name: "Academic Year 2018-19", link: "/path/to/pdf.pdf" },
        ]
    },
    {
        title: "ADMISSION EXTRACT",
        items: [
            { name: "Academic Year 2022-23", link: "/path/to/pdf.pdf" },
            { name: "Academic Year 2021-22", link: "/path/to/pdf.pdf" },
            { name: "Academic Year 2020-21", link: "/path/to/pdf.pdf" },
            { name: "Academic Year 2019-20", link: "/path/to/pdf.pdf" },
            { name: "Academic Year 2018-19", link: "/path/to/pdf.pdf" },
        ]
    }
];

// --- Helper component for the PDF icon ---
const PdfIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-4V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>);


// --- Main Admission Lists Page Component ---
const AdmissionListsPage = () => {

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
                @keyframes contentFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .admission-lists-section {
                    background-color: #f1f5f9;
                    padding: 2rem;
                    font-family: 'Georgia', 'Times New Roman', serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .admission-lists-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1000px;
                    padding-top: 20px;
                }

                .admission-lists-container {
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

                .list-category {
                    margin-bottom: 3rem;
                }
                .list-category:last-child {
                    margin-bottom: 0;
                }

                .list-category-title {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #1e3a8a;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid #e2e8f0;
                }
                
                .pdf-list {
                    list-style: none;
                    padding-left: 0;
                    margin: 0;
                }
                .pdf-list-item {
                    margin-bottom: 0.75rem;
                }

                .pdf-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #334155;
                    text-decoration: none;
                    font-size: 1.1rem;
                    position: relative;
                    transition: color 0.3s ease;
                }
                .pdf-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    left: 0;
                    background-color: #2563eb;
                    transition: width 0.3s ease;
                }
                .pdf-link:hover {
                    color: #1e3a8a;
                }
                .pdf-link:hover::after {
                    width: 100%;
                }
                .pdf-link .pdf-icon {
                    color: #ef4444;
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
                    .admission-lists-section { padding: 1rem; }
                    .admission-lists-main-wrapper { padding-top: 70px; }
                    .admission-lists-container { padding: 2rem; margin-top: 0; }
                    .back-button-exact { top: 10px; right: 10px; padding: 12px 24px; font-size: 15px; }
                    .list-category-title { font-size: 1.5rem; }
                }
            `}</style>
            <section className="admission-lists-section">
                <div className="admission-lists-main-wrapper">
                    
                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="admission-lists-container">
                        {admissionListsData.map((category, index) => (
                            <div key={category.title} className="list-category animated-item" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                                <h2 className="list-category-title">{category.title}</h2>
                                <ul className="pdf-list">
                                    {category.items.map(item => (
                                        <li key={item.name} className="pdf-list-item">
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="pdf-link">
                                                <span className="pdf-icon"><PdfIcon /></span>
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdmissionListsPage;