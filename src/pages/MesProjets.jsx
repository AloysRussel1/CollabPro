import React, { useEffect, useState } from 'react';
import './../assets/Css/pagesCss/MesProjets.css';
import { FaSearch, FaEdit, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Importez votre instance Axios

const MesProjets = () => {
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]); // État pour stocker les projets
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour récupérer les projets
    const fetchProjects = async () => {
      try {
        const response = await api.get('projets/'); // Requête GET à l'API
        // Vérifiez si la réponse est un tableau
        if (Array.isArray(response.data)) {
          setProjects(response.data); // Met à jour l'état avec les projets récupérés
        } else {
          console.error('La réponse n\'est pas un tableau:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    };

    fetchProjects(); // Appel de la fonction pour récupérer les projets
  }, []); // La dépendance vide signifie que cela ne s'exécute qu'une fois à l'initialisation

  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleViewDetails = (projectId) => {
    navigate(`/services/projects/${projectId}`);
  };

  const handleEditClick = (project) => {
    setCurrentProject(project);
    setShowForm(true);
  };

  const handleDeleteClick = (projectId) => {
    console.log(`Supprimer le projet avec l'ID: ${projectId}`);
  };

  const filteredProjects = projects.filter(project => (
    (filter === 'Tous' || project.status === filter) &&
    (searchTerm === '' || project.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  const handleModify = (event) => {
    event.preventDefault();
    console.log('Données du projet modifiées:', currentProject);
    setShowForm(false);
  };

  return (
    <div className="mes-projets">
      <header className="mes-projets-header">
        <h1>Mes Projets</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          style={{ backgroundColor: '#000000', color: '#ffffff', marginBottom: '20px' }}
          onClick={() => navigate('/services/projects/add-project')}
        >
          Ajouter un projet
        </Button>
      </header>

      {!showForm ? (
        <>
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
                    <TableCell className="table-header-cell">Date de Début</TableCell>
                    <TableCell className="table-header-cell">Date de Fin</TableCell>
                    <TableCell className="table-header-cell" align="center">Détails</TableCell>
                    <TableCell className="table-header-cell" align="center">Modifier</TableCell>
                    <TableCell className="table-header-cell" align="center">Supprimer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.titre}</TableCell>
                      <TableCell>{project.statut}</TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={project.progression}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: project.progression === 100 ? '#4caf50' : '#cc0000'
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>{project.date_debut}</TableCell>
                      <TableCell>{project.date_fin}</TableCell>
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
        </>
      ) : (
        <div className="edit-project-form">
          <h2>Modifier le Projet</h2>
          <form onSubmit={handleModify}>
            <div className="form-group">
              <TextField
                id="name"
                label="Nom du Projet"
                variant="outlined"
                fullWidth
                value={currentProject.name}
                onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <Select
                id="status"
                label="Statut"
                value={currentProject.status}
                onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                fullWidth
                variant="outlined"
                required
              >
                <MenuItem value="En cours">En cours</MenuItem>
                <MenuItem value="Terminé">Terminé</MenuItem>
              </Select>
            </div>
            <div className="form-group">
              <TextField
                id="progress"
                label="État d'avancement"
                type="number"
                variant="outlined"
                fullWidth
                value={currentProject.progression}
                onChange={(e) => setCurrentProject({ ...currentProject, progression: Number(e.target.value) })}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                required
              />
            </div>
            <div className="form-group">
              <TextField
                id="startDate"
                label="Date de Début"
                type="date"
                variant="outlined"
                fullWidth
                value={currentProject.date_debut}
                onChange={(e) => setCurrentProject({ ...currentProject, date_debut: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </div>
            <div className="form-group">
              <TextField
                id="endDate"
                label="Date de Fin"
                type="date"
                variant="outlined"
                fullWidth
                value={currentProject.date_fin}
                onChange={(e) => setCurrentProject({ ...currentProject, date_fin: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="form-actions">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ backgroundColor: '#000000', color: '#ffffff' }}
              >
                Enregistrer
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowForm(false)}
                style={{ marginLeft: '10px' }}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MesProjets;
