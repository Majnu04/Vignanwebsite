
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';

// // Import the animation configuration
// import { setAnimationVariables } from './config/animationConfig';

// // Set animation CSS variables
// if (typeof document !== 'undefined') {
//   setAnimationVariables();
// }

// const rootElement = document.getElementById('root');
// if (!rootElement) {
//   throw new Error("Could not find root element to mount to");
// }

// const root = ReactDOM.createRoot(rootElement);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/animations.css'; // Import our animations CSS
import StoreContextProvider from './storeContext/StoreContext';

// Import the animation configuration
import { setAnimationVariables } from './config/animationConfig';

// Set animation CSS variables
if (typeof document !== 'undefined') {
  setAnimationVariables();
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <StoreContextProvider>
    <App />
    </StoreContextProvider>
  </React.StrictMode>
);
