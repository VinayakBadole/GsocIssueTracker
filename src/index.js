import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './index.css';
import App from './App';
import RepoPage from './RepoPage'; // Import RepoPage

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Routes> {/* Define all your routes here */}
        <Route path="/" element={<App />} /> {/* Route for App page */}
        <Route path="/repo/:repoId" element={<RepoPage />} /> {/* Route for RepoPage */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
