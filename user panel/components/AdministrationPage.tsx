import React from 'react';

// --- Data for the Administration Team (Exactly as provided) ---
const adminTeamData = [
    { sNo: 1, name: "Mr. N.Srikant", designation: "Cheif Executive Officer", contact: "(+91) 891-2755444" },
    { sNo: 2, name: "Dr.V.Madhusudhan Rao", designation: "Rector", contact: "(+91) 891-2755333" },
    { sNo: 3, name: "Dr.J.Sudhakar", designation: "Principal", contact: "9052066699 / (+91) 891-2517111" },
    { sNo: 4, name: "Dr.Ch.Hari Govinda Rao", designation: "Dean Administration", contact: "9866399930" },
    { sNo: 5, name: "Dr.Ch.Ramesh Babu", designation: "Dean-IQAC", contact: "9581807822" },
    { sNo: 6, name: "Dr.A Naga jyothi", designation: "Dean Academics", contact: "9398121200" },
    { sNo: 7, name: "Dr.B Sateesh", designation: "Dean Evaluation", contact: "9550293989" },
    { sNo: 8, name: "Dr.K.Madhusudan Rao", designation: "Dean Admissions", contact: "9618356061" },
    { sNo: 9, name: "Dr.B.Prasad", designation: "Dean Placement & Training", contact: "7093098775" },
    { sNo: 10, name: "Dr.R.Sundara Ramam", designation: "Dean Faculty Affairs", contact: "9440031140" },
    { sNo: 11, name: "Dr.G. Kranthi Kumar", designation: "Dean Research & Development", contact: "9966600092" },
    { sNo: 12, name: "Dr.Susant Kumar Sahu", designation: "Dean International Student Affairs", contact: "9642190851" },
    { sNo: 13, name: "Dr.Ch. Rohini Kumar", designation: "Dean-Industry Relations", contact: "8008606053" },
    { sNo: 14, name: "Mr.Ch. Siva Rama Krishna", designation: "Dean--Student Affairs", contact: "9989921032" },
    { sNo: 15, name: "Mr.B.Bramhaiah", designation: "Associate Dean - Infrastructure", contact: "7989494729" }
];

// --- Helper function to create clickable telephone links ---
const ClickableContact: React.FC<{ contact: string }> = ({ contact }) => {
    const parts = contact.split(/(\s*\/\s*)/);
    return (
        <>
            {parts.map((part, index) => {
                const numericOnly = part.replace(/\D/g, '');
                if (numericOnly.length >= 10) {
                    const telLink = numericOnly.length > 10 ? `+${numericOnly}` : `+91${numericOnly}`;
                    return (
                        <a key={index} href={`tel:${telLink}`} className="contact-link">
                            {part.trim()}
                        </a>
                    );
                }
                return <span key={index}>{part}</span>;
            })}
        </>
    );
};


// --- Main Administration Page Component (No Overlap) ---
const AdministrationPage = () => {
    return (
        <>
            <style>{`
                @keyframes rowSlideIn {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .admin-section-focused {
                    background-color: #f8fafc;
                    padding: 2rem 2rem 4rem; 
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    min-height: 100vh;
                }
                
                .admin-main-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1200px;
                    /* --- FINAL FIX: Reduced padding to bring content closer to the header --- */
                    padding-top: 20px;
                }

                .admin-container-focused {
                    width: 100%;
                    background-color: #ffffff;
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
                    margin-top: 2.5rem; /* Space below the button */
                }
                
                .section-title-focused {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #003366;
                    padding-bottom: 0.75rem;
                    margin-bottom: 2.5rem;
                    border-bottom: 3px solid #003366;
                    display: inline-block;
                }
                .admin-table-wrapper-focused {
                    overflow-x: auto;
                }
                .admin-table-focused {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }
                .admin-table-focused th, .admin-table-focused td {
                    padding: 1rem 1.25rem;
                    border-bottom: 1px solid #e2e8f0;
                }
                .admin-table-focused thead {
                    background-color: #003366;
                }
                .admin-table-focused th {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #ffffff;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .admin-table-focused tbody tr {
                    opacity: 0;
                    animation: rowSlideIn 0.5s ease-out forwards;
                    transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                ${adminTeamData.map((_, i) => `.admin-table-focused tbody tr:nth-child(${i + 1}) { animation-delay: ${i * 0.05}s; }`).join('')}
                
                .admin-table-focused tbody tr:nth-child(even) {
                    background-color: #f8fafc;
                }
                .admin-table-focused tbody tr:hover {
                    transform: translateY(-4px) scale(1.01);
                    box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.2);
                    background-color: #ffffff;
                    z-index: 10;
                    position: relative;
                }
                .admin-table-focused td {
                    color: #334155;
                    font-weight: 500;
                }
                .admin-table-focused td:first-child {
                    font-weight: 600;
                    color: #003366;
                }

                .contact-link {
                    color: inherit;
                    text-decoration: none;
                    cursor: pointer;
                }
                .contact-link:hover {
                    color: #2563eb;
                    text-decoration: underline;
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
                    .admin-section-focused { padding: 1rem; }
                    .admin-main-wrapper { padding-top: 70px; }
                    .admin-container-focused { padding: 1.5rem; margin-top: 0; }
                    .back-button-exact {
                        top: 10px;
                        right: 10px;
                        padding: 12px 24px;
                        font-size: 15px;
                    }
                    .admin-table-focused th, .admin-table-focused td { padding: 0.75rem; }
                    .section-title-focused { font-size: 1.5rem; }
                }
            `}</style>
            <section className="admin-section-focused">
                <div className="admin-main-wrapper">

                    <a href="/" className="back-button-exact">
                        Back
                    </a>
                    
                    <div className="admin-container-focused">
                        <h2 className="section-title-focused">ADMINISTRATION TEAM</h2>
                        <div className="admin-table-wrapper-focused">
                            <table className="admin-table-focused">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Contact No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminTeamData.map((member) => (
                                        <tr key={member.sNo}>
                                            <td>{member.sNo}</td>
                                            <td>{member.name}</td>
                                            <td>{member.designation}</td>
                                            <td>
                                                <ClickableContact contact={member.contact} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default AdministrationPage;