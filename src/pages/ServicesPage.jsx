// src/pages/ServicesPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './../components/Sidebar';
import './../assets/Css/pagesCss/ServicesPage.css'; 
import Dashboard from './Dashboard';
import ProjectDetailPage from './ProjectDetailPage';

// import ProjectDetailPage from './ProjectDetailPage';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Sidebar />
      <div className="services-content">
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="projects/${project.id}" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default ServicesPage;
