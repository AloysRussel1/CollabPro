// src/pages/ServicesPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './../components/Sidebar';
import './../assets/Css/pagesCss/ServicesPage.css'; 
import Dashboard from './Dashboard';
import MesProjets from './MesProjets';
import AddProjectPage from './AddProjectPage';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Sidebar />
      <div className="services-content">
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/myprojects" element={<MesProjets />} />
        <Route path="/projects/add-project" element={<AddProjectPage/>} />

        </Routes>
      </div>
    </div>
  );
};

export default ServicesPage;
