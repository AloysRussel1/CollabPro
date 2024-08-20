// src/components/Dashboard.jsx
import React from 'react';
import './../assets/Css/pagesCss/Dashboard.css';
import { FaProjectDiagram, FaTasks, FaBell, FaPlusCircle } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tableau de Bord</h1>
      </header>

      <section className="dashboard-overview">
        <div className="overview-item">
          <FaProjectDiagram className="overview-icon" />
          <div className="overview-content">
            <h2>Total Projets</h2>
            <p>34</p>
          </div>
        </div>
        <div className="overview-item">
          <FaTasks className="overview-icon" />
          <div className="overview-content">
            <h2>Total Tâches</h2>
            <p>120</p>
          </div>
        </div>
        <div className="overview-item">
          <FaBell className="overview-icon" />
          <div className="overview-content">
            <h2>Alertes</h2>
            <p>3 nouvelles alertes</p>
          </div>
        </div>
      </section>

      <section className="dashboard-projects">
        <h2>Projets Récents</h2>
        <ul>
          <li>Projet Alpha - En cours</li>
          <li>Projet Beta - Complété</li>
          <li>Projet Gamma - En attente</li>
        </ul>
      </section>

      <section className="dashboard-shortcuts">
        <h2>Raccourcis</h2>
        <div className="shortcut-item">
          <FaPlusCircle className="shortcut-icon" />
          <a href="/services/projects/add">Ajouter un Projet</a>
        </div>
        <div className="shortcut-item">
          <FaPlusCircle className="shortcut-icon" />
          <a href="/services/tasks/add">Ajouter une Tâche</a>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
