
// You can define styles as objects for better organization
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
      display: 'flex',
      fontFamily: 'Georgia, serif',
      backgroundColor: '#f0f8ff',
      padding: '40px',
      paddingTop: '60px', // Added more padding to the top to accommodate the button
      maxWidth: '1000px',
      margin: 'auto',
      position: 'relative' as const,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    },
    sidebar: {
      flex: '0 0 200px',
      textAlign: 'center' as const,
      marginRight: '30px',
    },
    principalImage: {
      width: '180px',
      height: 'auto',
      border: '4px solid #fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    principalInfo: {
      marginTop: '10px',
    },
    principalName: {
      fontWeight: 'bold' as const,
      margin: '5px 0',
    },
    principalTitle: {
      margin: '5px 0',
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
      textAlign: 'justify' as const,
    },
    signature: {
      marginTop: '30px',
    },
    signatureName: {
      fontWeight: 'bold' as const,
      margin: '5px 0',
    },
    backButton: {
      position: 'absolute' as const,
      top: '15px',
      right: '15px',
      backgroundColor: '#0056b3',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '10px 20px',
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: 'bold' as const,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      textAlign: 'center' as const
    },
  };
  
  const Chairman = () => {
    const navigate = useNavigate();
    
    const handleBackClick = () => {
      navigate('/');
    };
    
    return (
      <div style={styles.container}>
        <button 
          style={styles.backButton} 
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#003d80';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          }}
          onClick={handleBackClick}
          aria-label="Back to homepage"
        >
          Back
        </button>
        <div style={styles.sidebar}>
          {/* 
            In a real project, you would import the image or use a URL.
            e.g., import principalImage from './assets/principal.png';
          */}
          <img 
            src="https://vignaniit.edu.in/images/CHAIRMAN%20SIR.jpg" // Using a placeholder URL for the principal's image
            alt="Dr.Lavu Rathaiah" 
            style={styles.principalImage} 
          />
          <div style={styles.principalInfo}>
            <p style={styles.principalName}>Dr.Lavu Rathaiah</p>
            <p style={styles.principalTitle}>Chairman,</p>
            <p style={styles.principalTitle}>Vignan's Institute of Information Technology</p>
            <p style={styles.principalTitle}>Visakhapatnam</p>
          </div>
        </div>
        <div style={styles.mainContent}>
          <h1 style={styles.header}>Chairman's Message</h1>
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
            <p style={styles.signatureName}>Dr.Lavu Rathaih (PHD)</p>
            <p style={styles.principalTitle}>Chairman,</p>
            <p style={styles.principalTitle}>Vignan's Institute of Informational Technology,Visakhapatnam</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Chairman;