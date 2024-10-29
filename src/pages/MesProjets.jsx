import React, { useEffect, useState } from 'react';
import './../assets/Css/pagesCss/MesProjets.css';
import { FaSearch, FaEdit, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Importez votre instance Axios
import dayjs from 'dayjs'; // Pour gérer les dates

const MesProjets = () => {
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]); // État pour stocker les projets
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Fonction pour récupérer les projets
    // Vérifier si l'utilisateur est connecté (vérification de l'accessToken)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLogin(true);
      const fetchProjects = async () => {
        try {
          const projectsResponse = await api.get('projets/');
          if (Array.isArray(projectsResponse.data)) {
            const updatedProjects = await Promise.all(projectsResponse.data.map(async (project) => {
              const tasksResponse = await api.get(`projets/${project.id}/taches`);
              return {
                ...project,
                taches: tasksResponse.data || [], // Associe les tâches au projet
                statut: getProjectStatus({ ...project, taches: tasksResponse.data }),
                progression: getProjectProgress({ ...project, taches: tasksResponse.data })
              };
            }));
            setProjects(updatedProjects); // Met à jour l'état avec les projets récupérés
          } else {
            console.error('La réponse n\'est pas un tableau:', projectsResponse.data);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des projets:', error);
        }
      };
  
  
      fetchProjects();
    }

  }, []);

  const getProjectProgress = (project) => {
    console.log('Project:', project);
    if (!project.taches || project.taches.length === 0) return 0;
    console.log('Taches:', project.taches);
    const totalProgress = project.taches.reduce((sum, task) => {
      return sum + (task.progression >= 0 ? task.progression : 0);
    }, 0);
    const progress = totalProgress / project.taches.length;
    console.log(`Total Progress: ${totalProgress}, Progression: ${progress}`);
    return progress;
  };

  const getProjectStatus = (project) => {
    const progress = getProjectProgress(project);
    console.log(`Progress for project ${project.id}: ${progress}`);

    const currentDate = dayjs();
    const endDate = dayjs(project.date_fin);

    if (progress === 100) return 'Terminé';
    if (progress === 0) return 'Non commencé';
    if (currentDate.isAfter(endDate)) return 'En retard';
    return 'En cours';
  };


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

  const handleAddProject = () => {
    if (!isLogin) {
      navigate('/signin');
      return;
    }
    navigate('/services/projects/add-project');
  };

  const filteredProjects = projects.filter(project => (
    (filter === 'Tous' || project.statut === filter) &&
    (searchTerm === '' || project.titre.toLowerCase().includes(searchTerm.toLowerCase()))
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
          onClick={() => handleAddProject()}
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
              <MenuItem value="En retard">En retard</MenuItem>
              <MenuItem value="Non commencé">Non commencé</MenuItem>
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
            <TextField
              label="Titre du Projet"
              variant="outlined"
              size="small"
              fullWidth
              value={currentProject ? currentProject.titre : ''}
              onChange={(e) => setCurrentProject({ ...currentProject, titre: e.target.value })}
              required
            />
            <TextField
              label="Date de Début"
              variant="outlined"
              size="small"
              type="date"
              fullWidth
              value={currentProject ? dayjs(currentProject.date_debut).format('YYYY-MM-DD') : ''}
              onChange={(e) => setCurrentProject({ ...currentProject, date_debut: e.target.value })}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Date de Fin"
              variant="outlined"
              size="small"
              type="date"
              fullWidth
              value={currentProject ? dayjs(currentProject.date_fin).format('YYYY-MM-DD') : ''}
              onChange={(e) => setCurrentProject({ ...currentProject, date_fin: e.target.value })}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#000000', color: '#ffffff', marginTop: '20px' }}
            >
              Enregistrer les modifications
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: '10px' }}
              onClick={() => setShowForm(false)}
            >
              Annuler
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MesProjets;


