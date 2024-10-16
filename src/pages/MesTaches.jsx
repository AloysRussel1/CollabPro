import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Button
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MesTaches = () => {
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: ''
  });
  const [taches, setTaches] = useState([
    {
      id: 1,
      titre: 'Remplir le formulaire',
      description: 'Compléter toutes les sections du formulaire',
      dateDebut: '2023-01-10',
      dateEcheance: '2023-01-25',
      statut: 'En pause',
      progression: 50,
      sousTaches: [
        { id: 1, titre: 'Récupérer le formulaire', statut: 'Terminé' },
        { id: 2, titre: 'L\'envoyer', statut: 'À commencer' }
      ]
    },
    {
      id: 2,
      titre: 'Changer le fournisseur internet',
      description: 'Rechercher et choisir un nouveau fournisseur',
      dateDebut: '2023-01-20',
      dateEcheance: '2023-01-28',
      statut: 'En progression',
      progression: 66.7,
      sousTaches: []
    }
  ]);

  const toggleExpand = (id) => {
    setExpandedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: taches.length + 1,
      titre: formData.titre,
      description: formData.description,
      dateDebut: formData.dateDebut,
      dateEcheance: formData.dateEcheance,
      statut: 'À commencer',
      progression: 0,
      sousTaches: []
    };
    setTaches([...taches, newTask]);
    setFormData({ titre: '', description: '', dateDebut: '', dateEcheance: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé':
        return '#4CAF50'; // Green
      case 'En progression':
        return '#FFC107'; // Amber
      case 'À commencer':
        return '#D32F2F'; // Red
      default:
        return '#9E9E9E'; // Grey
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '90%',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
      }}
    >
      <h2 style={{
        paddingLeft: '16px',
        color: '#D32F2F',
        borderBottom: '2px solid #D32F2F',
        marginBottom: '10px',
      }}>Ma liste de tâches</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#000', fontWeight: 'bold', borderBottom: '2px solid #D32F2F' }}>Tâche</TableCell>
            <TableCell sx={{ color: '#000', fontWeight: 'bold', borderBottom: '2px solid #D32F2F' }}>Description</TableCell>
            <TableCell sx={{ color: '#000', fontWeight: 'bold', borderBottom: '2px solid #D32F2F' }}>Date de début</TableCell>
            <TableCell sx={{ color: '#000', fontWeight: 'bold', borderBottom: '2px solid #D32F2F' }}>Date d'échéance</TableCell>
            <TableCell sx={{ color: '#000', fontWeight: 'bold', borderBottom: '2px solid #D32F2F' }}>Statut</TableCell>
            <TableCell sx={{ color: '#000', fontWeight: 'bold', borderBottom: '2px solid #D32F2F' }}>Progression</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taches.map((tache) => (
            <React.Fragment key={tache.id}>
              <TableRow
                sx={{
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: '#F5F5F5' },
                  transition: 'background-color 0.3s ease',
                }}
              >
                <TableCell>
                  <IconButton onClick={() => toggleExpand(tache.id)}>
                    {expandedTasks.includes(tache.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  {tache.titre}
                </TableCell>
                <TableCell>{tache.description}</TableCell>
                <TableCell>{tache.dateDebut}</TableCell>
                <TableCell>{tache.dateEcheance}</TableCell>
                <TableCell style={{ color: getStatusColor(tache.statut) }}>
                  <strong>{tache.statut}</strong>
                </TableCell>
                <TableCell>
                  <div style={{ width: '100px', backgroundColor: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${tache.progression}%`,
                        backgroundColor: tache.progression < 50 ? '#D32F2F' : '#1976d2',
                        height: '10px',
                      }}
                    ></div>
                  </div>
                  {tache.progression}%
                </TableCell>
              </TableRow>

              {expandedTasks.includes(tache.id) &&
                tache.sousTaches.map((sousTache) => (
                  <TableRow key={sousTache.id}>
                    <TableCell colSpan={6} style={{ paddingLeft: '40px', backgroundColor: '#f9f9f9', borderLeft: '5px solid #D32F2F' }}>
                      ↳ <strong>{sousTache.titre}</strong> - <span style={{ color: getStatusColor(sousTache.statut) }}><strong>{sousTache.statut}</strong></span>
                    </TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
          <TableRow>
            <TableCell colSpan={6}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', padding: '20px 0' }}>
                <TextField
                  label="Nouvelle tâche"
                  name="titre"
                  value={formData.titre}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  type="date"
                  name="dateDebut"
                  value={formData.dateDebut}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  type="date"
                  name="dateEcheance"
                  value={formData.dateEcheance}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#D32F2F',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#A00000' },
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Ajouter
                </Button>
              </form>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MesTaches;
