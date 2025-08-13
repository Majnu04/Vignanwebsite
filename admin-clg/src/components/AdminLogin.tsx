import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import AdminDashboard from './AdminDashboard';
import { toast } from 'react-toastify';
import axios from 'axios';

const Logo = () => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Vignan_logo.png" 
    alt="Vignan's Logo" 
    style={{ width: '150px', height: '150px' }} 
  />
);

const AdminLogin = () => {
  // This single, clean useEffect block injects all dynamic and responsive styles.
  useEffect(() => {
    const styleId = 'admin-login-final-styles';
    if (document.getElementById(styleId)) return;

    const styleSheet = document.createElement("style");
    styleSheet.id = styleId;
    styleSheet.innerHTML = `
      /* --- 1. CSS Variables for a Clean, Maintainable Theme --- */
      :root {
        --brand-red: #D50000;
        --brand-yellow: #0755ffff;
        --brand-blue: #007bff;
        --text-primary: #212529;
        --text-secondary: #6c757d;
        --background-white: #ffffff;
        --border-color: #dee2e6;
        --gradient-start: #141e30;
        --gradient-end: #243b55;
      }

      /* --- 2. Animated Background Keyframes --- */
      @keyframes gradient-animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* --- 3. Professional Hover & Focus Effects --- */
      .final-input::placeholder {
        color: #9fa6b2;
      }

      .final-input:focus {
        border-color: var(--brand-blue);
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        outline: none;
      }
      
      .final-button {
        transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, background-color 0.2s ease-out, color 0.2s ease-out;
      }
      
      .final-button-primary:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        background-color: #ffca2c;
      }

      .final-button-secondary:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        background-color: var(--brand-blue);
        color: var(--background-white);
        border-color: var(--brand-blue);
      }

      /* --- 4. Flawless Mobile Responsiveness --- */
      @media (max-width: 850px) {
        .final-container {
          flex-direction: column;
          width: 95%;
          max-width: 420px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .final-left-panel {
          border-right: none;
          border-bottom: 1px solid var(--border-color);
          padding: 30px;
        }
        .final-right-panel {
          padding: 35px 30px;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

   const { setToken, url, token, render, setRender } = useContext(StoreContext);
   const navigate = useNavigate(); // Add this inside AdminLogin component

    // const url='http://localhost:5000';
    // const [currState, setCurrState] = useState("Sign Up");
    // const [token, setToken] = useState('');

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(name,value);
        setData(data => ({ ...data, [name]: value }))
    }

    // const onLogin = async (e) => {
    //     e.preventDefault()

    //     const new_url = url+'/api/user/login';
    //     console.log(new_url);
    //     const response = await axios.post(new_url, data);
    //     console.log(response);
    //     if (response.data.success) {
    //         // console.log(response.data.token);
    //         setToken(response.data.token);
    //         localStorage.setItem("token", response.data.token);
    //         console.log(token);
    //     }
    //     else {

    //         toast.error(response.data.message);
    //     }
    // }

    const onLogin = async (e) => {
  e.preventDefault();

  const new_url = url + '/api/user/login';

  try {
    const response = await axios.post(new_url, data);
      console.log("hello");
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setRender(true);
      // { render ? navigate('/admin/dashboard') : null };
      console.log(render);
      navigate('/admin/dashboard');

      console.log(token);
    } else {
      toast.error(response.data.message || "Login failed");
    }

  } catch (error) {
    console.error("Login Error:");
    const msg = error.response?.data?.message || "Something went wrong";
    toast.error(msg);
  }
}


  const goToHome = () => {
    alert("Navigating to the home page!");
  };

  return (
    <>
    <div className="gradient-bg" style={styles.page}>
      <div style={styles.container} className="final-container">
        {/* Left Panel */}
        <div style={styles.leftPanel} className="final-left-panel">
          <Logo />
          <h1 style={styles.title}>Vignan's</h1>
          <p style={styles.subtitle}>Institute of Information Technology</p>
          <p style={styles.autonomous}>(Autonomous)</p>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel} className="final-right-panel">
          <h2 style={styles.loginHeader}>Admin Login</h2>
          <form style={styles.form} onSubmit={onLogin}>
            <div style={styles.inputGroup}>
              <input type="email" id="email" placeholder="Email Address" style={styles.input} className="final-input" name='email' onChange={onChangeHandler} value={data.email} />
            </div>
            <div style={styles.inputGroup}>
              <input type="password" id="password" placeholder="Password" style={styles.input} className="final-input" name='password' onChange={onChangeHandler} value={data.password} />
            </div>
            <button type="submit" style={styles.primaryButton} className="final-button final-button-primary" >
              Login
            </button>
            <button type="button" onClick={goToHome} style={styles.secondaryButton} className="final-button final-button-secondary">
              Go to Home
            </button>
          </form>
        </div>
      </div>
      {/* {render ? <AdminDashboard/> : null} */}
    </div>
  </>
  );
};

const styles = {
  page: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  fontFamily: `'Poppins', 'Segoe UI', 'Roboto', sans-serif'`,
  padding: '20px',
  boxSizing: 'border-box',
} as React.CSSProperties,
  // page: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   minHeight: '100vh',
  //   background: 'linear-gradient(-45deg, var(--gradient-start), var(--gradient-end))',
  //   backgroundSize: '400% 400%',
  //   animation: 'gradient-animation 15s ease infinite',
  //   fontFamily: "'Poppins', 'Segoe UI', 'Roboto', sans-serif",
  //   padding: '20px',
  //   boxSizing: 'border-box',
  // } as React.CSSProperties,

  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '850px',
    minHeight: '500px',
    borderRadius: '12px',
    backgroundColor: 'var(--background-white)',
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  } as React.CSSProperties,
  leftPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    textAlign: 'center',
    borderRight: '1px solid var(--border-color)',
  } as React.CSSProperties,
  title: {
    color: 'var(--brand-red)',
    margin: '15px 0 5px',
    fontSize: 'clamp(2.5rem, 5vw, 2.8rem)',
    fontWeight: 700,
  } as React.CSSProperties,
  subtitle: {
    color: 'var(--text-primary)',
    margin: '0',
    fontSize: 'clamp(1rem, 2vw, 1.05rem)',
    fontWeight: 500,
  } as React.CSSProperties,
  autonomous: {
    color: 'var(--text-secondary)',
    margin: '5px 0 0',
    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
  } as React.CSSProperties,
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 50px',
  } as React.CSSProperties,
  loginHeader: {
    fontSize: 'clamp(1.7rem, 3vw, 1.8rem)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '30px',
    textAlign: 'center',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center', // Center the buttons
  } as React.CSSProperties,
  inputGroup: {
    marginBottom: '18px',
    width: '100%', // Ensure input groups take full width
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#f3f4f6', // A very light gray for input background
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  primaryButton: {
    padding: '10px 45px', // Vertical and horizontal padding
    width: 'auto', // Auto width based on content
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'var(--brand-yellow)',
    // color: 'var(--text-primary)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '12px', // Space between buttons
  } as React.CSSProperties,
  secondaryButton: {
    padding: '9px 35px', // Slightly less padding for secondary action
    width: 'auto',
    backgroundColor: 'transparent',
    color: 'var(--brand-blue)',
    border: '1px solid var(--brand-blue)',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'center',
  } as React.CSSProperties,
};

export default AdminLogin;

