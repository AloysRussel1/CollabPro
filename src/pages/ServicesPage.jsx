// src/pages/ServicesPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './../components/Sidebar';
import './../assets/Css/pagesCss/ServicesPage.css'; 
import Dashboard from './Dashboard';
import MesProjets from './MesProjets';
import AddProjectPage from './AddProjectPage';
import AddTaskPage from './AddTaskPage';
import ProjectDetailPage from './ProjectDetailPage';
import MesTaches from './MesTaches';
import TaskDetailPage from './TaskDetailPage';
import BoiteDeReception from './BoiteDeReception';
import PerformanceReports from './PerformanceReports';
import UserStatistics from './UserStatistics';

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
        <Route path="/tasks/add-task" element={<AddTaskPage/>} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/tasks/mytasks" element={<MesTaches />} />
        <Route path="/tasks/:taskId" element={<TaskDetailPage/>} />
        <Route path="/inbox" element={<BoiteDeReception />} />
        <Route path="/reports/performance" element={<PerformanceReports />} />
        <Route path="/reports/users" element={<UserStatistics />} />
        

        </Routes>
      </div>
    </div>
  );
};

export default ServicesPage;
