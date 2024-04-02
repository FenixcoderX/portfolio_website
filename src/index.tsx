import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Entry point of the application. Renders the App component into the root element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

