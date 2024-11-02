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

  const fetchProjectTasks = async (projectId) => {
    try {
      const response = await api.get(`/projets/${projectId}/taches/`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des tâches pour le projet ${projectId}:`, error);
      return [];
    }
  };


  useEffect(() => {
    
    const fetchUserProjectsWithTasks = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await api.get(`/user/${userId}/projets/`);
        const projects = response.data;
    
        const projectsWithTasks = await Promise.all(
          projects.map(async (project) => {
            const taches = await fetchProjectTasks(project.id);
            const progress = getProjectProgress({ ...project, taches });
            const status = getProjectStatus({ ...project, taches });
            
            // Enregistrez la progression et le statut dans la base de données
            await updateProjectStatus(project.id, progress, status);
            
            return { ...project, taches, progression: progress, statut: status };
          })
        );
    
        setProjects(projectsWithTasks);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets et des tâches:', error);
      }
    };
    
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLogin(true);
      fetchUserProjectsWithTasks();
    }
  }, []);

  const getProjectProgress = (project) => {
    const tasks = project.taches;
    console.log('Tasks for project', project.id, tasks);
    if (!tasks || tasks.length === 0) {
      return 0;
    }

    const totalProgress = tasks.reduce((sum, task) => {
      return sum + (task.progression || 0);
    }, 0);

    return totalProgress / tasks.length;
  };



  const getProjectStatus = (project) => {
    const progress = getProjectProgress(project);
    console.log(`Progress for project ${project.id}: ${progress}`);

    const currentDate = dayjs();
    const endDate = dayjs(project.date_fin);

    if (progress === 100) return 'Terminé';
    if (progress === 0) return 'À commencer';
    if (currentDate.isAfter(endDate)) return 'En retard';
    return 'En cours';
  };

  const updateProjectStatus = async (projectId, progress, status) => {
    try {
      await api.put(`/projets/${projectId}/`, { progression: progress, statut: status });
      console.log(`Projet ${projectId} mis à jour avec succès.`);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du projet ${projectId}:`, error);
    }
  };

  // const updateProjectStatus = async (projectId, progress, status) => {
  //   try {
  //     // Récupérer les détails actuels du projet
  //     const response = await api.get(`/projets/${projectId}/`);
  //     const existingProject = response.data;
  
  //     // Créer un nouvel objet avec les valeurs existantes
  //     const updatedProject = {
  //       ...existingProject,
  //       progression: progress,
  //       statut: status,
  //     };
  
  //     // Envoyer la mise à jour avec toutes les valeurs
  //     await api.put(`/projets/${projectId}/`, updatedProject);
  //     console.log(`Projet ${projectId} mis à jour avec succès.`);
  //   } catch (error) {
  //     console.error(`Erreur lors de la mise à jour du projet ${projectId}:`, error);
  //   }
  // };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé':
        return '#4CAF50';
      case 'En cours':
        return '#FFC107';
      case 'À commencer':
        return '#D32F2F';
      case 'En retard':
        return '#FF5722';
      default:
        return '#9E9E9E';
    }
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

  const handleDeleteClick = async (projectId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await api.delete(`projets/${projectId}/`);
        console.log(`Projet avec l'ID ${projectId} supprimé avec succès`);
        // Mettre à jour la liste des projets après suppression
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
      } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
      }
    }
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

  const handleModify = async (event) => {
    event.preventDefault();
    try {
      const response = await api.put(`projets/${currentProject.id}/`, currentProject);
      console.log('Projet modifié avec succès:', response.data);
      // Mettre à jour la liste des projets après modification
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === currentProject.id ? { ...project, ...currentProject } : project
        )
      );
    } catch (error) {
      console.error('Erreur lors de la modification du projet:', error);
    }
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
                      <TableCell className='status-badge' style={{ color: getStatusColor(getProjectStatus(project)) }}>
                        {getProjectStatus(project)}
                      </TableCell>


                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={getProjectProgress(project)}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getProjectProgress(project) === 100 ? '#4caf50' : '#cc0000'
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>{dayjs(project.date_debut).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{dayjs(project.date_fin).format('DD/MM/YYYY')}</TableCell>
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


