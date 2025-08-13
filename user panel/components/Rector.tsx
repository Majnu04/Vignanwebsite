import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Main Rector's Message Page Component ---
const Rector = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isImageHovered, setIsImageHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleBackClick = () => navigate('/');

    // --- STYLES OBJECT WITH PROFESSIONAL REDESIGN ---
    const styles: { [key: string]: React.CSSProperties } = {
        pageWrapper: {
            backgroundColor: '#f1f5f9',
            padding: '2rem',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            fontFamily: 'Georgia, "Times New Roman", serif',
        },
        mainContainer: {
            width: '100%',
            maxWidth: '1200px',
            position: 'relative',
            paddingTop: '20px',
        },
        container: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            backgroundColor: '#ffffff',
            padding: isMobile ? '2rem' : '3rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            marginTop: '3rem',
            animation: 'contentFadeInUp 0.8s ease-out forwards',
            opacity: 0,
        },
        sidebar: {
            flex: '0 0 250px',
            textAlign: 'center',
            marginRight: isMobile ? 0 : '3rem',
            marginBottom: isMobile ? '2rem' : 0,
        },
        imageContainer: {
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 15px 30px -10px rgba(0, 51, 102, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            transform: isImageHovered ? 'scale(1.05)' : 'scale(1)',
        },
        principalImage: {
            width: '100%',
            height: 'auto',
            display: 'block',
        },
        principalInfo: {
            marginTop: '1.5rem',
        },
        principalName: {
            fontWeight: 'bold',
            fontSize: '1.25rem',
            margin: '0 0 0.5rem 0',
            color: '#1e3a8a',
        },
        principalTitle: {
            margin: '0.25rem 0',
            color: '#475569',
            fontSize: '1rem',
            lineHeight: 1.4,
        },
        mainContent: {
            flex: 1,
        },
        header: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1e3a8a',
            marginBottom: '1rem',
        },
        accentLine: {
            height: '4px',
            width: '80px',
            backgroundColor: '#0056b3',
            borderRadius: '2px',
            marginBottom: '2rem',
        },
        quote: {
            borderLeft: '4px solid #dbeafe',
            paddingLeft: '1.5rem',
            margin: '2rem 0',
            fontStyle: 'italic',
            color: '#1e3a8a',
            fontSize: '1.1rem',
            letterSpacing: '0.5px',
        },
        paragraph: {
            lineHeight: 1.8,
            color: '#334155',
            textAlign: 'justify',
            marginBottom: '1.25rem',
            fontSize: '1.1rem',
        },
        signature: {
            marginTop: '2.5rem',
            textAlign: 'right',
        },
        signatureName: {
            fontWeight: 'bold',
            fontSize: '1.1rem',
            margin: '0',
        },
        backButtonExact: {
            position: 'absolute',
            top: isMobile ? '10px' : 0,
            right: isMobile ? '10px' : 0,
            backgroundColor: '#1e3a8a',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            padding: isMobile ? '12px 24px' : '14px 28px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px -5px rgba(30, 58, 138, 0.5)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            fontFamily: 'Inter, Segoe UI, sans-serif',
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        },
        backButtonExactHover: {
            backgroundColor: '#1e40af',
            boxShadow: '0 8px 25px -8px rgba(30, 58, 138, 0.6)',
        },
    };

    const buttonStyle = {
        ...styles.backButtonExact,
        ...(isHovered ? styles.backButtonExactHover : {}),
    };

    return (
        <>
            <style>{`
                @keyframes contentFadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div style={styles.pageWrapper}>
                <div style={styles.mainContainer}>

                    <button
                        style={buttonStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleBackClick}
                    >
                        Back
                    </button>

                    <div style={styles.container}>
                        <div style={styles.sidebar}>
                            <div 
                                style={styles.imageContainer}
                                onMouseEnter={() => setIsImageHovered(true)}
                                onMouseLeave={() => setIsImageHovered(false)}
                            >
                                <img
                                    src="https://vignaniit.edu.in/images/RECTOR%20SIR.jpg"
                                    alt="Dr. Madhusudhan Rao"
                                    style={styles.principalImage}
                                />
                            </div>
                            <div style={styles.principalInfo}>
                                <p style={styles.principalName}>Dr. Madhusudhan Rao</p>
                                <p style={styles.principalTitle}>Rector,</p>
                                <p style={styles.principalTitle}>Vignan's Institute of Information Technology</p>
                                <p style={styles.principalTitle}>Visakhapatnam</p>
                            </div>
                        </div>
                        <div style={styles.mainContent}>
                            <h1 style={styles.header}>Rector's Message</h1>
                            <div style={styles.accentLine}></div>
                            <blockquote style={styles.quote}>
                                EDUCATION IS A SHARED COMMITMENT BETWEEN DEDICATED TEACHERS, STUDENTS AND PARENTS
                            </blockquote>
                            <p style={styles.paragraph}>
                                Yashwant English Medium School feels it a privilege to welcome you all to our website.
                                We are pledge bound to offer an atmosphere more homelier than their original homes to
                                all our children. The most important part of education as a process of information is
                                transformation. The transformation means change of vision. The change of behavior
                                and the change of character that is the object of education. We encourage the students
                                to involve in all activities to build up leadership qualities and the spirit of social
                                service.
                            </p>
                            <p style={styles.paragraph}>
                                The main purpose of our school is to ensure that the young people we serve are well
                                prepared for the challenges, they face in a rapidly changing world. To prepare the
                                children to face a competitive world, take an intellectual risk and turn their ideas and
                                passion in something valuable.
                            </p>
                            <p style={styles.paragraph}>
                                Our theme is "Committed citizens rebuilding a fragile world."
                            </p>
                            <p style={styles.paragraph}>
                                I desire that each child will leave our campus not just as a passionate thinker, but a
                                thinker with passion. I welcome you to our school and at the same time thank you for
                                entrusting your child with us. Our door is open to you always as we join hands is
                                pursing excellence in education.
                            </p>
                            <div style={styles.signature}>
                                <p style={styles.signatureName}>Dr. Madhusudhan Rao (PhD)</p>
                                <p style={styles.principalTitle}>Rector,</p>
                                <p style={styles.principalTitle}>Vignan's Institute of Information Technology, Visakhapatnam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rector;