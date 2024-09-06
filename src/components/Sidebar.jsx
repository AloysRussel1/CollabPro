import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaUsers, FaEnvelope, FaCalendar, FaChartLine, FaQuestionCircle, FaTachometerAlt, FaProjectDiagram, FaTasks, FaComments } from 'react-icons/fa';
import './../assets/Css/componentsCss/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {/* Dashboard */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaTachometerAlt className="sidebar-icon" />
            <Link to="/services/dashboard" className="sidebar-link">Tableau de Bord</Link>
          </div>
        </div>

        {/* Gestion des Projets */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaProjectDiagram className="sidebar-icon" />
            Projets
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/projects/myprojects" className="sidebar-link">Mes Projets</Link></li>
            <li><Link to="/services/projects/add-project" className="sidebar-link">Ajouter un Projet</Link></li>
            <li><Link to="/services/documents" className="sidebar-link">Documents Partagés</Link></li>
          </ul>
        </div>

        {/* Gestion des Tâches */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaTasks className="sidebar-icon" />
            Tâches
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/tasks/mytasks" className="sidebar-link">Mes Tâches</Link></li>
            <li><Link to="/services/tasks/add-task" className="sidebar-link">Ajouter une Tâche</Link></li>
          </ul>
        </div>

        {/* Collaboration et Communication */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaComments className="sidebar-icon" />
            Collaboration
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/inbox" className="sidebar-link">Boîte de Réception</Link></li>
          </ul>
        </div>

        {/* Suivi des Projets et Reporting */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaChartLine className="sidebar-icon" />
            Suivi et Reporting
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/reports/overview" className="sidebar-link">Vue d'Ensemble</Link></li>
            <li><Link to="/services/reports/performance" className="sidebar-link">Rapports de Performance</Link></li>
            <li><Link to="/services/reports/users" className="sidebar-link">Statistiques des Utilisateurs</Link></li>
          </ul>
        </div>

        {/* Paramètres */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaCog className="sidebar-icon" />
            Paramètres
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/settings/configuration" className="sidebar-link">Configuration</Link></li>
            <li><Link to="/services/settings/preferences" className="sidebar-link">Préférences</Link></li>
            <li><Link to="/services/settings/integrations" className="sidebar-link">Intégrations</Link></li>
          </ul>
        </div>

        {/* Aide et Support */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaQuestionCircle className="sidebar-icon" />
            <Link to="/services/help" className="sidebar-link">Aide et Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
