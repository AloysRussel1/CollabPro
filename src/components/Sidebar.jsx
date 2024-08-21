import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaUsers, FaEnvelope, FaCalendar, FaChartLine, FaQuestionCircle, FaTachometerAlt, FaProjectDiagram } from 'react-icons/fa';
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
            <span>Gestion des Projets</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/projects/overview" className="sidebar-link">Vue d'Ensemble</Link></li>
            <li><Link to="/services/projects/add" className="sidebar-link">Ajouter un Projet</Link></li>
            <li><Link to="/services/projects/list" className="sidebar-link">Liste des Projets</Link></li>
          </ul>
        </div>

        {/* Gestion des Équipes */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaUsers className="sidebar-icon" />
            <span>Gestion des Équipes</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/teams/overview" className="sidebar-link">Vue d'Ensemble</Link></li>
            <li><Link to="/services/teams/add" className="sidebar-link">Ajouter une Équipe</Link></li>
            <li><Link to="/services/teams/list" className="sidebar-link">Liste des Équipes</Link></li>
          </ul>
        </div>

        {/* Boîte de Réception */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaEnvelope className="sidebar-icon" />
            <Link to="/services/inbox" className="sidebar-link"><span>Boîte de Réception</span></Link>
          </div>
        </div>

        {/* Gestion des Réservations */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaCalendar className="sidebar-icon" />
            <span>Gestion des Réservations</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/reservations/current" className="sidebar-link">Réservations Actuelles</Link></li>
            <li><Link to="/services/reservations/history" className="sidebar-link">Historique des Réservations</Link></li>
          </ul>
        </div>

        {/* Rapports et Statistiques */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaChartLine className="sidebar-icon" />
            <span>Rapports et Statistiques</span>
          </div>
          <ul className="sidebar-submenu">
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
            <li><Link to="/services/settings/configuration" className="sidebar-link">Configuration des Services</Link></li>
            <li><Link to="/services/settings/preferences" className="sidebar-link">Préférences d'Affichage</Link></li>
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
