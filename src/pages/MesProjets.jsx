import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import './../assets/Css/pagesCss/MesProjets.css';
import { FaSearch, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, LinearProgress } from '@mui/material';

const projects = [
  { id: '1', name: 'Projet Alpha', status: 'En cours', progress: 70, startDate: '2024-08-01', endDate: '2024-08-30' },
  { id: '2', name: 'Projet Beta', status: 'Terminé', progress: 100, startDate: '2024-06-01', endDate: '2024-07-15' },
  { id: '3', name: 'Projet Gamma', status: 'En cours', progress: 50, startDate: '2024-07-01', endDate: '2024-09-05' },
  // Ajoutez plus de projets ici
];

const MesProjets = () => {
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Utilisez useNavigate

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (projectId) => {
    navigate(`/services/projects/${projectId}`); // Naviguer vers la page des détails
  };

  const filteredProjects = projects.filter(project => {
    return (filter === 'Tous' || project.status === filter) &&
           (searchTerm === '' || project.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="mes-projets">
      <header className="mes-projets-header">
        <h1>Mes Projets</h1>
      </header>

      <section className="mes-projets-filters">
        <TextField 
          label="Rechercher un projet" 
          variant="outlined" 
          size="small" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <Select
          value={filter}
          onChange={handleFilterChange}
          displayEmpty
          variant="outlined"
          size="small"
        >
          <MenuItem value="Tous">Tous</MenuItem>
          <MenuItem value="En cours">En cours</MenuItem>
          <MenuItem value="Terminé">Terminé</MenuItem>
        </Select>
      </section>

      <section className="mes-projets-list">
        <TableContainer component={Paper}>
          <Table aria-label="mes projets">
            <TableHead>
              <TableRow>
                <TableCell className="table-header-cell">Nom du Projet</TableCell>
                <TableCell className="table-header-cell">Statut</TableCell>
                <TableCell className="table-header-cell">État d'avancement</TableCell>
                <TableCell className="table-header-cell">Date de D'attribution</TableCell>
                <TableCell className="table-header-cell">Date de Fin</TableCell>
                <TableCell className="table-header-cell" align="center">Détails</TableCell>
                <TableCell className="table-header-cell" align="center">Modifier</TableCell>
                <TableCell className="table-header-cell" align="center">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.progress} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5, 
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { 
                          backgroundColor: project.progress === 100 ? '#4caf50' : '#cc0000' 
                        } 
                      }} 
                    />
                  </TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      color="info"
                      startIcon={<FaInfoCircle />}
                      style={{ width: '100%' }}
                      onClick={() => handleViewDetails(project.id)} // Appel de la fonction handleViewDetails
                    >
                      Détails
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<FaEdit />}
                      style={{ width: '100%' }}
                    >
                      Modifier
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      color="secondary"
                      startIcon={<FaTrash />}
                      style={{ width: '100%' }}
                    >
                      Supprimer
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

export default MesProjets;
