import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/animations.css'; // Import our animations CSS

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
