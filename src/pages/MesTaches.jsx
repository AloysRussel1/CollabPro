import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const MesTaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterDateDebut, setFilterDateDebut] = useState('');
  const [filterDateEcheance, setFilterDateEcheance] = useState('');
  const [taches, setTaches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [progression, setProgression] = useState(0);

  const navigate = useNavigate(); // Correction : placer useNavigate dans le composant

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const response = await api.get('/taches/');
        setTaches(response); // On récupère les tâches depuis l'API
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    };

    fetchTaches();
  }, []); // Ce useEffect sera exécuté au montage du composant

  const handleAdd = () => {
    navigate('/services/tasks/add-task');
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
      return 'En cours';
    } else if (now > new Date(dateFin)) {
      return 'En retard';
    }
    return 'À commencer';
  };
  
  const handleProgressionChange = async () => {
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
      <h2 className="table-title">Ma liste de tâches</h2>

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

      <Table className="table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell className="table-head-cell">Tâche</TableCell>
            <TableCell className="table-head-cell">Description</TableCell>
            <TableCell className="table-head-cell">Date de début</TableCell>
            <TableCell className="table-head-cell">Date d'échéance</TableCell>
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

              <TableCell className="table-cell" style={{ color: getStatusColor(tache.statut) }}>
                <strong>{tache.statut}</strong>
              </TableCell>
              <TableCell className="table-cell" onClick={() => handleProgressClick(tache)} style={{ cursor: 'pointer' }}>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${tache.progression}%` }}></div>
                </div>
                {tache.progression}%
              </TableCell>
              <TableCell className="table-cell">
                <div className="action-buttons">
                  <IconButton onClick={() => handleEdit(tache)} className="icon-button">
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(tache.id)} className="icon-button">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Modifier la progression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifiez la progression de la tâche : {selectedTask ? selectedTask.titre : ''}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Progression (%)"
            type="number"
            fullWidth
            value={progression}
            onChange={(e) => setProgression(Number(e.target.value))}
            inputProps={{ min: 0, max: 100 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Annuler
          </Button>
          <Button onClick={handleProgressionChange} color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default MesTaches;

