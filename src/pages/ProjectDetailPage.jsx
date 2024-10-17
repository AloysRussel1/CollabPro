import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Button, MenuItem, Select, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './../assets/Css/pagesCss/MesTaches.css'; // Import du fichier CSS
import api from '../api/api';  // Import de votre fichier API

const ProjectDetailPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterDateDebut, setFilterDateDebut] = useState('');
  const [filterDateEcheance, setFilterDateEcheance] = useState('');
  const [taches, setTaches] = useState([]); // Initialisé comme un tableau
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [progression, setProgression] = useState(0);
  const [projectDetails, setProjectDetails] = useState({ titre: '', description: '' }); // Initialise avec des valeurs par défaut

  const navigate = useNavigate();
  const { projectId } = useParams(); // Récupérer l'ID du projet depuis les paramètres de l'URL

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await api.get(`/projets/${projectId}/`); // Remplacer avec votre endpoint pour récupérer le projet
        setProjectDetails(response.data); // Stocker les détails du projet
      } catch (error) {
        console.error('Erreur lors du chargement des détails du projet:', error);
      }
    };

    const fetchTaches = async () => {
      try {
        const response = await api.get(`/taches/?projet=${projectId}`); // Filtrer les tâches par l'ID du projet
        setTaches(response.data); // On récupère les tâches depuis l'API
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    };

    fetchProjectDetails();
    fetchTaches();
  }, [projectId]); // Dépendance sur projectId

  const handleAdd = () => {
    navigate(`/services/tasks/add-task?projectId=${projectId}`); // Passer l'ID du projet pour l'ajout
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
    navigate('/services/tasks/add-task', { state: { task: tache } });
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
        return '#FF5722'; // Couleur pour les tâches en retard
      default:
        return '#9E9E9E';
    }
  };

  const handleProgressClick = (tache) => {
    setSelectedTask(tache);
    setProgression(tache.progression); // Mettre le pourcentage de progression actuel
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getUpdatedStatus = (progression, dateFin) => {
    const now = new Date();
    if (progression === 100) {
      return 'Terminé';
    } else if (progression > 0) {
      return 'En progression';
    } else if (now > new Date(dateFin)) {
      return 'En retard';
    }
    return 'À commencer';
  };

  const handleProgressionChange = async () => {
    if (progression < 0 || progression > 100) {
      alert("La progression doit être un nombre entre 0 et 100.");
      return; // Ne pas continuer si la progression est invalide
    }

    try {
      const newStatus = getUpdatedStatus(progression, selectedTask.dateFin);

      // Effectuer la requête PUT ou PATCH pour mettre à jour la progression et le statut
      await api.patch(`/taches/${selectedTask.id}/`, { progression, statut: newStatus });

      // Mettre à jour l'état local
      setTaches(taches.map(tache =>
        tache.id === selectedTask.id ? { ...tache, progression, statut: newStatus } : tache
      ));
      setOpenModal(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la progression:', error);
    }
  };

  // Filtrage des tâches
  const filteredTasks = taches.filter((tache) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = tache.titre.toLowerCase().includes(searchLower) ||
      tache.description.toLowerCase().includes(searchLower);

    const matchesStatus = !filterStatut || tache.statut === filterStatut;
    const matchesDateDebut = !filterDateDebut || new Date(tache.dateDebut) >= new Date(filterDateDebut);
    const matchesDateEcheance = !filterDateEcheance || new Date(tache.dateEcheance) <= new Date(filterDateEcheance);

    return matchesSearch && matchesStatus && matchesDateDebut && matchesDateEcheance;
  });

  return (
    <TableContainer component={Paper} className="table-container">
      <h2 className="table-title">Détails du projet: {projectDetails.titre}</h2>
      <p className="project-description">{projectDetails.description}</p>

      <Button
        variant="contained"
        sx={{ backgroundColor: '#D32F2F', color: '#fff', margin: '20px' }} // Changement de couleur
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAdd}
        className="add-task-button"
        style={{ color: '#fff', padding: '10px 20px', fontWeight: 'bold' }} // Style modifié
      >
        Ajouter une tâche
      </Button>

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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titre</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Date Début</TableCell>
            <TableCell>Date Échéance</TableCell>
            <TableCell>Progression (%)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((tache) => (
            <TableRow key={tache.id} style={{ backgroundColor: getStatusColor(tache.statut) }}>
              <TableCell>{tache.titre}</TableCell>
              <TableCell>{tache.description}</TableCell>
              <TableCell>{tache.statut}</TableCell>
              <TableCell>{new Date(tache.dateDebut).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(tache.dateEcheance).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleProgressClick(tache)}>
                 
                <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(tache)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(tache.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Progression Update */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Mettre à jour la progression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifiez le pourcentage de progression pour la tâche: {selectedTask?.titre}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Progression (%)"
            type="number"
            fullWidth
            value={progression}
            onChange={(e) => setProgression(Number(e.target.value))}
            inputProps={{ min: 0, max: 100 }} // Restriction pour les valeurs entre 0 et 100
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Annuler</Button>
          <Button onClick={handleProgressionChange}>Mettre à jour</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ProjectDetailPage;
