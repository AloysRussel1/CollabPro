import React from 'react';
import './../assets/Css/pagesCss/Dashboard.css';
import { FaProjectDiagram, FaTasks, FaBell } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const projects = [
  { id: '1', name: 'Projet Alpha', progress: 70, deadline: '2024-08-30' },
  { id: '2', name: 'Projet Beta', progress: 50, deadline: '2024-09-15' },
  { id: '3', name: 'Projet Gamma', progress: 90, deadline: '2024-10-05' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const buttonColor = '#ff5733';

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
        <TableContainer component={Paper}>
          <Table aria-label="recent projects">
            <TableHead>
              <TableRow>
                <TableCell>Projets</TableCell>
                <TableCell>État d'avancement</TableCell>
                <TableCell>Échéance</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: project.progress === 100 ? '#4caf50' : '#ff9800'
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{project.deadline}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: buttonColor,
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#ff5733', // Slightly darker on hover
                        },
                      }}
                      onClick={() => navigate(`/services/projects/${project.id}`)}
                    >
                      Détails
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
};

export default Dashboard;
