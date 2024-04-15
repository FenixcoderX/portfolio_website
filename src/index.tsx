import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './myTailwind.css';

// Entry point of the application. Renders the App component into the root element
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
