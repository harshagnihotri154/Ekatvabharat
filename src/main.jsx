import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './mobile.css';

const root = document.getElementById('root');
const app = <React.StrictMode><App /></React.StrictMode>;
// Contribution query parameters are browser-specific; render that page fresh.
if (root.hasChildNodes() && location.pathname.replace(/\/+$/, '') !== '/donate') {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}

import "./upgrade.css";

import "./homepage.css";
