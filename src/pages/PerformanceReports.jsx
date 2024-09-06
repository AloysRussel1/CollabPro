import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './../assets/Css/pagesCss/PerformanceReports.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceReports = () => {
  // Exemple de données pour les graphiques
  const taskCompletionData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'], // Mois de l'année
    datasets: [
      {
        label: 'Tâches complétées',
        data: [50, 100, 80, 120, 150, 130], 
        backgroundColor: 'rgba(255, 0, 0, 0.6)', // Rouge
        borderColor: 'rgba(255, 0, 0, 1)', // Rouge foncé
        borderWidth: 1,
      },
    ],
  };

  const projectProgressData = {
    labels: ['Projet 1', 'Projet 2', 'Projet 3', 'Projet 4', 'Projet 5'],
    datasets: [
      {
        label: 'Progression (%)',
        data: [85, 70, 95, 50, 80], // Progression en pourcentage
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Noir
        borderColor: 'rgba(0, 0, 0, 1)', // Noir foncé
        borderWidth: 1,
      },
    ],
  };

  const overdueTasksData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'], 
    datasets: [
      {
        label: 'Tâches en retard',
        data: [5, 10, 8, 15, 5, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Rose/Rouge clair
        borderColor: 'rgba(255, 99, 132, 1)', // Rouge
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="performance-reports">
      <h1>Rapports de Performance</h1>

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

      {/* Graphique des Tâches Complétées */}
      <div className="chart-container">
        <h2>Tâches Complétées par Mois</h2>
        <Bar data={taskCompletionData} options={{ responsive: true }} />
      </div>

      {/* Graphique de la Progression des Projets */}
      <div className="chart-container">
        <h2>Progression des Projets</h2>
        <Bar data={projectProgressData} options={{ responsive: true }} />
      </div>

      {/* Graphique des Tâches en Retard */}
      <div className="chart-container">
        <h2>Tâches en Retard</h2>
        <Line data={overdueTasksData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default PerformanceReports;
