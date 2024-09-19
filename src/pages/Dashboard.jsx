import React from 'react';
import './../assets/Css/pagesCss/Dashboard.css';
import { FaProjectDiagram, FaTasks, FaBell } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Données pour les graphiques
const barData = {
  labels: ['Projet Alpha', 'Projet Beta', 'Projet Gamma'],
  datasets: [
    {
      label: 'Progression',
      data: [70, 50, 90],
      backgroundColor: '#ff0000',
    },
  ],
};

const pieData = {
  labels: ['Projets Alpha', 'Projets Beta', 'Projets Gamma'],
  datasets: [
    {
      data: [70, 50, 90],
      backgroundColor: ['#ff0000', '#00ff00', '#0000ff'],
    },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();
  const buttonColor = '#000'; // Rouge vif pour les boutons

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tableau de Bord</h1>
      </header>

      <section className="dashboard-overview">
        <div className="overview-item">
          <FaProjectDiagram className="overview-icon" style={{ color: '#ff0000' }} /> {/* Rouge vif */}
          <div className="overview-content">
            <h2>Total Projets</h2>
            <p>34</p>
          </div>
        </div>
        <div className="overview-item">
          <FaTasks className="overview-icon" style={{ color: '#ff0000' }} /> {/* Rouge vif */}
          <div className="overview-content">
            <h2>Total Tâches</h2>
            <p>120</p>
          </div>
        </div>
        <div className="overview-item">
          <FaBell className="overview-icon" style={{ color: '#ff0000' }} /> {/* Rouge vif */}
          <div className="overview-content">
            <h2>Alertes</h2>
            <p>3 nouvelles alertes</p>
          </div>
        </div>
      </section>

      <section className="dashboard-charts">
        <h2>Statistiques des Projets</h2>
        <div className="chart-container">
          <div className="chart-item">
            <h3>Progression des Projets</h3>
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="chart-item">
            <h3>Répartition des Projets</h3>
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
