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
import Configuration from './Configuration';
import SupportPage from './SupportPage';
import TeamsPage from './TeamsPage';
import AddMemberPage from './AddMemberPage';
import AssignTaskPage from './AssignTaskPage';

import ChatPage from '../components/ChatPage';
import OrganizeMeetingPage from './OrganizeMeetingPage';


const ServicesPage = () => {
  return (
    <div className="services-page">
      <Sidebar />
      <div className="services-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/myprojects" element={<MesProjets />} />
          <Route path="/projects/add-project" element={<AddProjectPage />} />
          <Route path="/tasks/add-task" element={<AddTaskPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/projects/equipes" element={<TeamsPage />} />
          <Route path="/tasks/mytasks" element={<MesTaches />} />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          {/* <Route path="/inbox" element={<BoiteDeReception />} /> */}
          <Route path="/inbox" element={<ChatPage />} />
          <Route path="/reports/performance" element={<PerformanceReports />} />
          <Route path="/reports/users" element={<UserStatistics />} />
          <Route path="/settings/configuration" element={<Configuration />} />
          <Route path="/help" element={<SupportPage />} />
          <Route path="/projects/:projectId/ajouter-membre/:memberId?" element={<AddMemberPage />} />
          <Route path="/projets/:projectId/assigner-taches/:memberId" element={<AssignTaskPage />} />
          <Route path="/projects/:projectId/organiser-reunion" element={<OrganizeMeetingPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default ServicesPage;
