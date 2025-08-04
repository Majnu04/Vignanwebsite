
// --- Data for the Policy Links (Exactly as provided, with placeholders) ---
const policyLinksData = [
    { name: "HR Policies & Procedures", link: "/path/to/your/pdf.pdf" }, { name: "Financial Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Anti-Ragging Policy", link: "/path/to/your/pdf.pdf" }, { name: "Code of Ethics Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Discipline Policy", link: "/path/to/your/pdf.pdf" }, { name: "e-Governance Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Green Campus Policy", link: "/path/to/your/pdf.pdf" }, { name: "Grievance Redressal Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Internal Complaint Policy", link: "/path/to/your/pdf.pdf" }, { name: "Internship manual and student diary", link: "/path/to/your/pdf.pdf" },
    { name: "NISP-Policy", link: "/path/to/your/pdf.pdf" }, { name: "Policy on Divyangjan Facilities", link: "/path/to/your/pdf.pdf" },
    { name: "IT Policy", link: "/path/to/your/pdf.pdf" }, { name: "Faculty development Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Job induction policy", link: "/path/to/your/pdf.pdf" }, { name: "Admission Policy & Procedures", link: "/path/to/your/pdf.pdf" },
    { name: "Infrastructure Maintenance Policy", link: "/path/to/your/pdf.pdf" }, { name: "Environment & Sustainable policy", link: "/path/to/your/pdf.pdf" },
    { name: "Gender Policy", link: "/path/to/your/pdf.pdf" }, { name: "Industrial training Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Research Development Policy", link: "/path/to/your/pdf.pdf" }, { name: "Promotion Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Means and Merits Scholarship Policy", link: "/path/to/your/pdf.pdf" }, { name: "Physical Education Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Funds Mobilisation Policy", link: "/path/to/your/pdf.pdf" }, { name: "Scribe Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Adjunct Faculty Policy", link: "/path/to/your/pdf.pdf" }, { name: "Placements Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Stakeholder Feedback Policy", link: "/path/to/your/pdf.pdf" }, { name: "Value Added Courses Policy", link: "/path/to/your/pdf.pdf" },
    { name: "Add-on Courses Policy", link: "/path/to/your/pdf.pdf" }, { name: "Course Code Policy", link: "/path/to/your/pdf.pdf" }
];

// --- Helper component for the PDF icon ---
const PdfIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-4V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
);


// --- Main Policies Page Component (with Back Button) ---
const PoliciesPage = () => {
    return (
        <>
            <style>{`
                @keyframes contentFadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .policies-section-focused {
                    background-color: #f8fafc;
                    padding: 2rem 2rem 4rem;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .policies-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    /* --- FINAL FIX: Reduced padding to bring content closer to the header --- */
                    padding-top: 20px;
                }

                .policies-container-focused {
                    width: 100%;
                    background-color: #ffffff;
                    padding: 3rem;
                    border-radius: 16px;
                    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.08);
                    perspective: 1000px;
                    margin-top: 2.5rem; /* Space below the button */
                }
                
                .animated-item {
                    opacity: 0;
                    animation: contentFadeInUp 0.6s ease-out forwards;
                }
                
                .policies-title-focused {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #003366;
                    padding-bottom: 0.75rem;
                    margin-bottom: 2rem;
                    border-bottom: 3px solid #003366;
                    display: inline-block;
                }
                .intro-text-focused, .key-areas-focused p {
                    color: #475569;
                    font-size: 1.1rem;
                    line-height: 1.8;
                    margin-bottom: 1.25rem;
                }
                .key-areas-focused p strong {
                    color: #1e293b;
                    font-weight: 600;
                }
                .policy-grid-focused {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.25rem;
                    margin-top: 2.5rem;
                    padding-top: 2.5rem;
                    border-top: 1px solid #e2e8f0;
                }

                .policy-link-item-focused {
                    display: block;
                    padding: 0.75rem 1rem;
                    background-color: #f8fafc;
                    border-radius: 8px;
                    text-decoration: none;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                
                .policy-link-item-focused:hover {
                    transform: translateY(-6px) scale(1.04) rotateX(5deg) rotateY(-3deg);
                    box-shadow: 0 12px 25px -8px rgba(59, 130, 246, 0.3);
                    border-color: #bfdbfe;
                    background-color: #ffffff;
                }

                .policy-link-content-focused {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #1e3a8a;
                    font-weight: 500;
                }
                .policy-link-content-focused .pdf-icon {
                    color: #ef4444;
                    transition: color 0.3s ease;
                }
                .policy-link-item-focused:hover .pdf-icon {
                    color: #b91c1c;
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

                @media (max-width: 768px) {
                    .policies-section-focused { padding: 1rem; }
                    .policies-main-wrapper { padding-top: 70px; }
                    .policies-container-focused { padding: 1.5rem; margin-top: 0; }
                    .back-button-exact {
                        top: 10px;
                        right: 10px;
                        padding: 12px 24px;
                        font-size: 15px;
                    }
                    .policies-title-focused { font-size: 1.5rem; }
                    .intro-text-focused, .key-areas-focused p { font-size: 1rem; }
                }
            `}</style>
            <section className="policies-section-focused">
                <div className="policies-main-wrapper">

                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="policies-container-focused">
                        <h2 className="policies-title-focused animated-item" style={{ animationDelay: '0.1s' }}>POLICIES AND PERSPECTIVES</h2>
                        <p className="intro-text-focused animated-item" style={{ animationDelay: '0.2s' }}>
                            Policies and Perspectives at VIIT play a pivotal role in the institution's governance and overall functioning. Their importance can be highlighted in several key areas:
                        </p>
                        <div className="key-areas-focused">
                            <p className="animated-item" style={{ animationDelay: '0.3s' }}><strong>1. Unified Framework:</strong> They provide a consistent and unified framework for decision-making and operations, ensuring that all stakeholders are on the same page.</p>
                            <p className="animated-item" style={{ animationDelay: '0.4s' }}><strong>2. Clarity and Transparency:</strong> Clearly defined policies promote transparency, making it easier for everyone to understand the rules and expectations.</p>
                            <p className="animated-item" style={{ animationDelay: '0.5s' }}><strong>3. Accountability:</strong> Policies establish clear roles and responsibilities, holding individuals and groups accountable for their actions.</p>
                            <p className="animated-item" style={{ animationDelay: '0.6s' }}><strong>4. Regulatory Compliance:</strong> Adhering to policies ensures that the institution remains compliant with external and internal regulations and standards.</p>
                            <p className="animated-item" style={{ animationDelay: '0.7s' }}><strong>5. Effective Communication:</strong> Policies act as a communication bridge between management, teachers, students, and parents.</p>
                            <p className="animated-item" style={{ animationDelay: '0.8s' }}><strong>6. Conflict Resolution:</strong> A well-documented set of policies provides a basis for resolving disputes and grievances efficiently and fairly.</p>
                            <p className="animated-item" style={{ animationDelay: '0.9s' }}><strong>7. Continuous Improvement:</strong> Regularly updated policies reflect the institution's commitment to continuous improvement and adaptability.</p>
                            <p className="animated-item" style={{ animationDelay: '1.0s' }}><strong>8. Institutional Integrity:</strong> Upholding strong policies reinforces the integrity and reputation of the institution.</p>
                        </div>
                        <p className="intro-text-focused animated-item" style={{ animationDelay: '1.1s' }}>
                            By implementing and adhering to these policies, VIIT ensures a structured, transparent, and accountable environment conducive to achieving its educational goals.
                        </p>
                        
                        <div className="policy-grid-focused animated-item" style={{ animationDelay: '1.2s' }}>
                            {policyLinksData.map((policy, index) => (
                                <a key={policy.name} href={policy.link} target="_blank" rel="noopener noreferrer" className="policy-link-item-focused animated-item" style={{ animationDelay: `${1.2 + index * 0.03}s` }}>
                                    <div className="policy-link-content-focused">
                                        <span className="pdf-icon"><PdfIcon /></span>
                                        <span>{policy.name}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default PoliciesPage;