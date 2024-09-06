import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './../assets/Css/pagesCss/UserStatistics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const UserStatistics = () => {
  // Exemple de données pour les graphiques
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], 
    datasets: [
      {
        label: 'Activité Mensuelle',
        data: [120, 150, 170, 140, 190, 220],
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const taskCompletionData = {
    labels: ['Tâches Complétées', 'Tâches en Cours', 'Tâches En Retard'],
    datasets: [
      {
        label: 'Statut des Tâches',
        data: [85, 10, 5],
        backgroundColor: ['rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0.6)'],
        borderColor: ['rgba(255, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const projectProgressData = {
    labels: ['Projet 1', 'Projet 2', 'Projet 3', 'Projet 4'],
    datasets: [
      {
        label: 'Progression (%)',
        data: [80, 60, 90, 70],
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="user-statistics">
      <h1>Statistiques Utilisateur</h1>

      {/* Section des Indicateurs Clés de Performance */}
      <div className="kpi-section">
        <div className="kpi-card">
          <h2>Total des Tâches</h2>
          <p>320</p>
        </div>
        <div className="kpi-card">
          <h2>Tâches Terminées</h2>
          <p>280</p>
        </div>
        <div className="kpi-card">
          <h2>Tâches en Retard</h2>
          <p>12</p>
        </div>
        <div className="kpi-card">
          <h2>Projets en Cours</h2>
          <p>5</p>
        </div>
      </div>

      {/* Graphique d'Activité */}
      <div className="chart-container">
        <h2>Activité Mensuelle</h2>
        <Bar data={activityData} options={{ responsive: true }} />
      </div>

      {/* Graphique de Progression des Tâches */}
      <div className="chart-container">
        <h2>Statut des Tâches</h2>
        <Bar data={taskCompletionData} options={{ responsive: true }} />
      </div>

      {/* Graphique de Progression des Projets */}
      <div className="chart-container">
        <h2>Progression des Projets</h2>
        <Line data={projectProgressData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default UserStatistics;
