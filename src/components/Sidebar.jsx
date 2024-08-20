// src/components/Sidebar.jsx
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
            <li><Link to="/services/dashboard"> <span>Tableau de Bord</span></Link></li>
           
          </div>
        </div>

        {/* Gestion des Projets */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaProjectDiagram className="sidebar-icon" />
            <span>Gestion des Projets</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/projects/overview">Vue d'Ensemble</Link></li>
            <li><Link to="/services/projects/add">Ajouter un Projet</Link></li>
            <li><Link to="/services/projects/list">Liste des Projets</Link></li>
          </ul>
        </div>

        {/* Gestion des Équipes */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaUsers className="sidebar-icon" />
            <span>Gestion des Équipes</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/teams/overview">Vue d'Ensemble</Link></li>
            <li><Link to="/services/teams/add">Ajouter une Équipe</Link></li>
            <li><Link to="/services/teams/list">Liste des Équipes</Link></li>
          </ul>
        </div>

        {/* Boîte de Réception */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaEnvelope className="sidebar-icon" />
            <span>Boîte de Réception</span>
          </div>
        </div>

        {/* Gestion des Réservations */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaCalendar className="sidebar-icon" />
            <span>Gestion des Réservations</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/reservations/current">Réservations Actuelles</Link></li>
            <li><Link to="/services/reservations/history">Historique des Réservations</Link></li>
          </ul>
        </div>

        {/* Rapports et Statistiques */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaChartLine className="sidebar-icon" />
            <span>Rapports et Statistiques</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/reports/performance">Rapports de Performance</Link></li>
            <li><Link to="/services/reports/users">Statistiques des Utilisateurs</Link></li>
          </ul>
        </div>

        {/* Paramètres */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaCog className="sidebar-icon" />
            <span>Paramètres</span>
          </div>
          <ul className="sidebar-submenu">
            <li><Link to="/services/settings/configuration">Configuration des Services</Link></li>
            <li><Link to="/services/settings/preferences">Préférences d'Affichage</Link></li>
          </ul>
        </div>

        {/* Aide et Support */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <FaQuestionCircle className="sidebar-icon" />
            <span>Aide et Support</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
