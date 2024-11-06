import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams pour récupérer l'ID du projet
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Button, MenuItem, Select, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './../assets/Css/pagesCss/MesTaches.css';
import api from '../api/api';

const ProjectDetailPage = () => {
  const { projectId } = useParams(); // Récupération de l'ID du projet à partir de l'URL
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterDateDebut, setFilterDateDebut] = useState('');
  const [filterDateEcheance, setFilterDateEcheance] = useState('');
  const [taches, setTaches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [progression, setProgression] = useState(0);
  const [projectTitle, setProjectTitle] = useState('');
  const [collaborateurs, setCollaborateurs] = useState([]);
  const userId = localStorage.getItem('userId');
  console.log('User ID:', userId);

  const navigate = useNavigate();

  const [chefEquipeId, setChefEquipeId] = useState(null);

  // Fetch des tâches filtrées par projet
  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const response = await api.get('/taches/');
        if (Array.isArray(response.data)) {
          // Filtrer les tâches en fonction de l'ID du projet
          const filteredTaches = response.data.filter(tache => tache.projet === parseInt(projectId, 10));
          setTaches(filteredTaches);
        } else {
          console.error('Erreur: La réponse n\'est pas un tableau', response.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    };

    const fetchCollaborateurs = async () => {
      try {
        const response = await api.get('/users/');
        setCollaborateurs(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des collaborateurs:', error);
      }
    };

    const fetchProjectTitle = async () => {
      try {
        const response = await api.get(`/projets/${projectId}`);
        console.log('Projet:', response)
        setProjectTitle(response.data.titre);
        const chefId = response.data.chef_equipe;
        console.log("Id", chefId)
        setChefEquipeId(chefId);
        console.log('Chef de l\'equipe:', chefEquipeId)
      } catch (error) {
        console.error('Erreur lors du chargement du titre du projet:', error);
      }
    };

    if (projectId) {
      fetchTaches();
      fetchProjectTitle();
      fetchCollaborateurs();
    }
  }, [projectId, chefEquipeId]);



  const getCollaborateurNom = (id) => {
    const collaborateur = collaborateurs.find(collab => collab.id === id);
    return collaborateur ? collaborateur.nom : 'Non assigné';
  };

  const handleAdd = () => {
    navigate('/services/tasks/add-task', {
      state: { projet: projectId }
    });
  };


  const handleDelete = async (id) => {
    try {
      await api.delete(`/taches/${id}/`);
      setTaches(taches.filter((tache) => tache.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  const handleEdit = (tache) => {
    // Vérifiez la tâche avant de naviguer
    console.log('Tâche à modifier:', tache);


    const projet = tache.projet || null;
    const collaborateur = tache.collaborateur || 'Non assigné';

    navigate('/services/tasks/add-task', {
      state: {
        task: {
          ...tache,
          projet,
          collaborateur
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé':
        return '#4CAF50';
      case 'En progression':
        return '#FFC107';
      case 'À commencer':
        return '#D32F2F';
      case 'En retard':
        return '#FF5722';
      default:
        return '#9E9E9E';
    }
  };

  const handleProgressClick = (tache) => {
    setSelectedTask(tache);
    setProgression(tache.progression);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getUpdatedStatus = (progression, date_fin) => {
    const now = new Date();
    const endDate = new Date(date_fin);

    if (progression >= 100) {
      return 'Terminé';
    }

    if (now > endDate && progression < 100) {
      return 'En retard';
    }

    if (progression > 0 && progression < 100) {
      return 'En cours';
    }

    return 'À commencer';
  };



  const handleProgressionChange = async () => {
    try {
      const newStatus = getUpdatedStatus(progression, selectedTask.dateFin);

      await api.patch(`/taches/${selectedTask.id}/`, { progression, statut: newStatus });

      setTaches(taches.map(tache =>
        tache.id === selectedTask.id ? { ...tache, progression, statut: newStatus } : tache
      ));
      setOpenModal(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la progression:', error);
    }
  };

  const filteredTasks = taches.filter((tache) => {
    const matchesSearch = tache.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tache.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatut ? tache.statut === filterStatut : true;
    const matchesDateDebut = filterDateDebut ? new Date(tache.dateDebut) >= new Date(filterDateDebut) : true;
    const matchesDateEcheance = filterDateEcheance ? new Date(tache.dateEcheance) <= new Date(filterDateEcheance) : true;
    return matchesSearch && matchesStatus && matchesDateDebut && matchesDateEcheance;
  });

  return (
    <TableContainer component={Paper} className="table-container">
      <h2 className="table-title">{projectTitle || "Ma liste de tâches"}</h2>

      <Button
        variant="contained"
        sx={{ backgroundColor: '#D32F2F', color: '#fff', margin: '20px' }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAdd}
        className="add-task-button"
        style={{ color: '#fff', padding: '10px 20px', fontWeight: 'bold' }}
      >
        Ajouter une tâche
      </Button>

      {/* Filtres */}
      <div className="filter-container">
        <TextField
          label="Rechercher une tâche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          className="search-bar"
        />
        <Select
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
          displayEmpty
          className="filter-select"
        >
          <MenuItem value="">Tous les statuts</MenuItem>
          <MenuItem value="À commencer">À commencer</MenuItem>
          <MenuItem value="En progression">En progression</MenuItem>
          <MenuItem value="Terminé">Terminé</MenuItem>
          <MenuItem value="En retard">En retard</MenuItem>
        </Select>
        <TextField
          type="date"
          label="Date début"
          value={filterDateDebut}
          onChange={(e) => setFilterDateDebut(e.target.value)}
          className="date-filter"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="date"
          label="Date échéance"
          value={filterDateEcheance}
          onChange={(e) => setFilterDateEcheance(e.target.value)}
          className="date-filter"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      {/* Table des tâches */}
      <Table className="table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell className="table-head-cell">Tâche</TableCell>
            <TableCell className="table-head-cell">Description</TableCell>
            <TableCell className="table-head-cell">Date de début</TableCell>
            <TableCell className="table-head-cell">Date d'échéance</TableCell>
            <TableCell className="table-head-cell">Responsable</TableCell>
            <TableCell className="table-head-cell">Statut</TableCell>
            <TableCell className="table-head-cell">Progression</TableCell>
            <TableCell className="table-head-cell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((tache) => (
            <TableRow key={tache.id} className="table-row">
              <TableCell className="table-cell" style={{ fontWeight: 'bold' }}>{tache.titre}</TableCell>
              <TableCell className="table-cell">{tache.description}</TableCell>
              <TableCell className="table-cell">{tache.date_debut}</TableCell>
              <TableCell className="table-cell">{tache.date_fin}</TableCell>
              <TableCell className="table-cell">{getCollaborateurNom(tache.collaborateur)}</TableCell>
              <TableCell className="table-cell">
                <span className="status-badge" style={{ backgroundColor: getStatusColor(tache.statut) }}>
                  {tache.statut}
                </span>
              </TableCell>
              <TableCell className="table-cell" onClick={() => handleProgressClick(tache)} style={{ cursor: 'pointer' }}>
                <span>{tache.progression}%</span>
              </TableCell>
              {chefEquipeId === userId && (
                <TableCell className="table-cell">
                  <IconButton onClick={() => handleEdit(tache)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(tache.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )} 
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal pour la progression */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Mise à jour de la progression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifiez le pourcentage de progression de la tâche.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Progression"
            type="number"
            fullWidth
            variant="outlined"
            value={progression}
            onChange={(e) => setProgression(e.target.value)}
            inputProps={{ min: 0, max: 100 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Annuler
          </Button>
          <Button onClick={handleProgressionChange} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ProjectDetailPage;
