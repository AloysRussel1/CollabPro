import React, { useEffect, useState } from 'react';
import './../assets/Css/pagesCss/Dashboard.css';
import { FaProjectDiagram, FaTasks, FaBell } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [totalProjets, setTotalProjets] = useState(0);
  const [totalTaches, setTotalTaches] = useState(0);
  const [projetProgression, setProjetProgression] = useState([]);
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffa500', '#800080', '#00ced1'],
      },
    ],
  });

  const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur connecté

  useEffect(() => {
    // Récupérer le total des projets et leurs progressions
    const fetchProjets = async () => {
      try {
        const response = await api.get(`/user/${userId}/projets/`);
        const projets = response.data;
        setTotalProjets(projets.length);

        // Vérification des données reçues
        console.log("Projets récupérés :", projets);

        // Calculer la progression totale des projets
        const progressions = projets.map(projet => {
          const progression = typeof projet.progression === 'number' ? projet.progression : 0; // Défaut à 0 si pas de progression
          return progression;
        });

        // Vérification des valeurs de progression
        console.log("Progression des projets :", progressions);

        setProjetProgression(progressions);

        // Mettre à jour les données pour le graphique circulaire
        setPieData({
          labels: projets.map(projet => projet.titre || 'Projet sans titre'), // Ajout d'un titre par défaut
          datasets: [
            {
              data: progressions,
              backgroundColor: ['#ff0000', '#000000', '#b22222', '#8b0000', '#d3d3d3'],

            },
          ],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    };

    fetchProjets();

    // Récupérer le total des tâches
    const fetchTaches = async () => {
      try {
        const response = await api.get(`/user/${userId}/taches/`);
        setTotalTaches(response.data.length);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };

    fetchTaches();
  }, [userId]); // Ajouter userId comme dépendance pour garantir qu'il est utilisé à chaque rendu

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tableau de Bord</h1>
      </header>

      <section className="dashboard-overview">
        <div className="overview-item">
          <FaProjectDiagram className="overview-icon" style={{ color: '#ff0000' }} />
          <div className="overview-content">
            <h2>Total Projets</h2>
            <p>{totalProjets}</p>
          </div>
        </div>
        <div className="overview-item">
          <FaTasks className="overview-icon" style={{ color: '#ff0000' }} />
          <div className="overview-content">
            <h2>Total Tâches</h2>
            <p>{totalTaches}</p>
          </div>
        </div>
        <div className="overview-item">
          <FaBell className="overview-icon" style={{ color: '#ff0000' }} />
          <div className="overview-content">
            <h2>Alertes</h2>
            <p>3 nouvelles alertes</p>
          </div>
        </div>
      </section>

      <section className="dashboard-charts">
        <h2>Statistiques des Projets</h2>
        <div className="chart-container">
          {pieData.labels.length > 0 && projetProgression.length > 0 ? (
            <>
              <div className="chart-item">
                <h3>Progression des Projets</h3>
                <Bar data={{
                  labels: pieData.labels,
                  datasets: [
                    {
                      label: 'Progression',
                      data: projetProgression,
                      backgroundColor: '#ff0000',
                    },
                  ],
                }} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div className="chart-item">
                <h3>Répartition des Projets</h3>
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </>
          ) : (
            <p>Chargement des données des graphiques...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
