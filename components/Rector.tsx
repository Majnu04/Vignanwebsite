import { useState } from 'react';

// --- STYLES OBJECT WITH ADDITIONS FOR THE BUTTON AND LAYOUT ---
const styles = {
    // A new outer container to manage the overall page layout
    pageWrapper: {
        backgroundColor: '#f0f8ff',
        padding: '120px 40px 40px 40px', // Ample top padding to avoid header overlap
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Georgia, serif',
    },
    // Main container to set the max-width and hold the button and content
    mainContainer: {
        width: '100%',
        maxWidth: '1000px',
    },
    // Container to position the button correctly above the content
    buttonContainerTop: {
        display: 'flex',
        justifyContent: 'flex-end', // Aligns button to the right
        marginBottom: '1.5rem',     // Creates space below the button
    },
    // --- STYLES FOR THE NEW, CONSISTENT BACK BUTTON ---
    backButtonExact: {
        backgroundColor: '#0056b3',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        padding: '14px 28px',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        textAlign: 'center',
        fontFamily: 'Inter, Segoe UI, sans-serif',
    },
    // Hover styles for use with JavaScript events
    backButtonExactHover: {
        backgroundColor: '#003d82',
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
    },
    // --- Original styles below, with minor enhancements ---
    container: {
        display: 'flex',
        backgroundColor: '#ffffff', // Changed to white for a card-like appearance
        padding: '40px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', // Added shadow for depth
        borderRadius: '16px', // Added rounded corners
    },
    sidebar: {
        flex: '0 0 200px',
        textAlign: 'center',
        marginRight: '30px',
    },
    principalImage: {
      width: '180px',
      height: 'auto',
      border: '4px solid #fff',
      boxShadow: '0 4px 8px rgba(0.1)',
    },
    principalInfo: {
        marginTop: '10px',
    },
    principalName: {
        fontWeight: 'bold',
        margin: '5px 0',
        color: '#003366',
    },
    principalTitle: {
        margin: '5px 0',
        color: '#333',
        fontSize: '14px',
    },
    mainContent: {
        flex: 1,
    },
    header: {
        fontSize: '32px',
        color: '#003366',
        marginBottom: '10px',
    },
    wavyLine: {
        height: '3px',
        background: 'linear-gradient(90deg, transparent 50%, #0056b3 50%), linear-gradient(90deg, #0056b3 50%, transparent 50%)',
        backgroundSize: '20px 3px',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 0, 10px 0',
        marginBottom: '20px',
    },
    quote: {
        borderLeft: '4px solid #0056b3',
        paddingLeft: '15px',
        margin: '20px 0',
        fontStyle: 'italic',
        color: '#003366',
        fontSize: '14px',
        letterSpacing: '1px',
    },
    paragraph: {
        lineHeight: '1.6',
        color: '#333',
        textAlign: 'justify',
        marginBottom: '1rem',
    },
    signature: {
        marginTop: '30px',
    },
    signatureName: {
        fontWeight: 'bold',
        margin: '5px 0',
    },
};

const Rector = () => {
    // State to manage button hover effect with inline styles
    const [isHovered, setIsHovered] = useState(false);

    // Combine base and hover styles for the button
    const buttonStyle = {
        ...styles.backButtonExact,
        ...(isHovered ? styles.backButtonExactHover : null),
    };

    return (
        // Use the page wrapper for correct, non-overlapping layout
        <div style={styles.pageWrapper}>
            <div style={styles.mainContainer}>

                {/* --- BACK BUTTON ADDED HERE --- */}
                <div style={styles.buttonContainerTop}>
                    <a
                        href="/"
                        style={buttonStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Back
                    </a>
                </div>

                {/* Original content container */}
                <div style={styles.container}>
                    <div style={styles.sidebar}>
                        <img
                            src="https://vignaniit.edu.in/images/RECTOR%20SIR.jpg"
                            alt="Dr. Madhusudhan Rao"
                            style={styles.principalImage}
                        />
                        <div style={styles.principalInfo}>
                            <p style={styles.principalName}>Dr. Madhusudhan Rao</p>
                            <p style={styles.principalTitle}>Rector,</p>
                            <p style={styles.principalTitle}>Vignan's Institute of Information Technology</p>
                            <p style={styles.principalTitle}>Visakhapatnam</p>
                        </div>
                    </div>
                    <div style={styles.mainContent}>
                        <h1 style={styles.header}>Rector's Message</h1>
                        <div style={styles.wavyLine}></div>
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
    );
};

export default Rector;