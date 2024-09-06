import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../assets/Css/pagesCss/MesProjets.css';
import { FaSearch, FaEdit, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, LinearProgress } from '@mui/material';
import AddProjectPage from './AddProjectPage'; 

const projects = [
  { id: '1', name: 'Projet Alpha', status: 'En cours', progress: 70, startDate: '2024-08-01', endDate: '2024-08-30' },
  { id: '2', name: 'Projet Beta', status: 'Terminé', progress: 100, startDate: '2024-06-01', endDate: '2024-07-15' },
  { id: '3', name: 'Projet Gamma', status: 'En cours', progress: 50, startDate: '2024-07-01', endDate: '2024-09-05' },
  // Ajoutez plus de projets ici
];

const MesProjets = () => {
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (projectId) => {
    navigate(`/services/projects/${projectId}`);
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleDeleteClick = (projectId) => {
    // Implémentez la logique de suppression ici
    console.log(`Supprimer le projet avec l'ID: ${projectId}`);
  };

  const handleSave = (projectData) => {
    console.log('Données du projet sauvegardées:', projectData);
    setIsEditing(false);
    setSelectedProject(null);
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsEditing(true);
  };

  const filteredProjects = projects.filter(project => {
    return (filter === 'Tous' || project.status === filter) &&
           (searchTerm === '' || project.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="mes-projets">
      <header className="mes-projets-header">
        <h1>Mes Projets</h1>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<FaPlus />}
          style={{ backgroundColor: '#000000', color: '#ffffff', marginBottom: '20px' }}
          onClick={handleAddProject}
        >
          Ajouter un projet
        </Button>
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
                <TableCell className="table-header-cell">Date de Debut</TableCell>
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
                      style={{ backgroundColor: '#000000', color: '#ffffff', width: '100%' }}
                      onClick={() => handleViewDetails(project.id)}
                    >
                      Détails
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<FaEdit />}
                      style={{ backgroundColor: '#000000', color: '#ffffff', width: '100%' }}
                      onClick={() => handleEditClick(project)}
                    >
                      Modifier
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      color="secondary"
                      startIcon={<FaTrash />}
                      style={{ backgroundColor: '#cc0000', color: '#ffffff', width: '100%' }}
                      onClick={() => handleDeleteClick(project.id)}
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

      {isEditing && <AddProjectPage onSave={handleSave} initialData={selectedProject} />}
    </div>
  );
};

export default MesProjets;
