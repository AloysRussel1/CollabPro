import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaUsers, FaEnvelope, FaCalendar, FaChartLine, FaQuestionCircle, FaTachometerAlt, FaProjectDiagram, FaTasks, FaComments, FaFileAlt, FaSlidersH } from 'react-icons/fa';
import './../assets/Css/componentsCss/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-menu">
        {/* Dashboard */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaTachometerAlt className="sidebar-icon" />
            <Link to="/services/dashboard" className="sidebar-link"><span>Tableau de Bord</span></Link>
          </div>
        </div>

        {/* Gestion des Projets */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaProjectDiagram className="sidebar-icon" />
            <span>Projets</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/projects/myprojects" className="sidebar-link">Mes Projets</Link></li>
            <li><Link to="/services/tasks/kanban" className="sidebar-link">Tableau Kanban</Link></li>
            <li><Link to="/services/projects/add-project" className="sidebar-link">Ajouter un Projet</Link></li>
            <li><Link to="/services/projects/templates" className="sidebar-link">Templates de Projets</Link></li>
          </ul>
        </div>

        {/* Gestion des Tâches */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaTasks className="sidebar-icon" />
            <span>Tâches</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/tasks/overview" className="sidebar-link">Mes Tâches</Link></li>
            <li><Link to="/services/tasks/add-task" className="sidebar-link">Ajouter une Tâche</Link></li>
            <li><Link to="/services/tasks/calendar" className="sidebar-link">Calendrier</Link></li>
          </ul>
        </div>

        {/* Collaboration et Communication */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaComments className="sidebar-icon" />
            <span>Collaboration</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/inbox" className="sidebar-link">Boîte de Réception</Link></li>
            <li><Link to="/services/chat" className="sidebar-link">Chat en Temps Réel</Link></li>
            <li><Link to="/services/documents" className="sidebar-link">Documents Partagés</Link></li>
          </ul>
        </div>

        {/* Suivi des Projets et Reporting */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaChartLine className="sidebar-icon" />
            <span>Suivi et Reporting</span>
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
            <span>Paramètres</span>
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
            <Link to="/services/help" className="sidebar-link"><span>Aide et Support</span></Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
