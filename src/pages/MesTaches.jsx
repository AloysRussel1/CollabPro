import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../assets/Css/pagesCss/MesTaches.css';
import { FaSearch, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, LinearProgress, Tabs, Tab } from '@mui/material';

const taches = [
  { id: '1', name: 'Tâche Alpha', status: 'En cours', progress: 70, startDate: '2024-08-01', endDate: '2024-08-30' },
  { id: '2', name: 'Tâche Beta', status: 'Terminé', progress: 100, startDate: '2024-06-01', endDate: '2024-07-15' },
  { id: '3', name: 'Tâche Gamma', status: 'En cours', progress: 50, startDate: '2024-07-01', endDate: '2024-09-05' },
  // Ajoutez plus de tâches ici
];

const MesTaches = () => {
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('table'); // État pour la vue actuelle
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (tacheId) => {
    navigate(`/services/tasks/${tacheId}`);
  };

  const filteredTaches = taches.filter(tache => {
    return (filter === 'Tous' || tache.status === filter) &&
           (searchTerm === '' || tache.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleChangeView = (event, newValue) => {
    setView(newValue);
  };

  return (
    <div className="mes-taches">
      <header className="mes-taches-header">
        <h1>Mes Tâches</h1>
      </header>

      <section className="mes-taches-filters">
        <TextField 
          label="Rechercher une tâche" 
          variant="outlined" 
          size="small" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          InputProps={{
            endAdornment: <FaSearch />
          }}
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

      <Tabs value={view} onChange={handleChangeView} aria-label="task views">
        <Tab label="Tableau" value="table" />
        <Tab label="Kanban" value="kanban" />
        <Tab label="Calendrier" value="calendar" />
        <Tab label="Carte" value="map" />
      </Tabs>

      {view === 'table' && (
        <section className="mes-taches-list">
          <TableContainer component={Paper}>
            <Table aria-label="mes tâches">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header-cell">Nom de la Tâche</TableCell>
                  <TableCell className="table-header-cell">Statut</TableCell>
                  <TableCell className="table-header-cell">État d'avancement</TableCell>
                  <TableCell className="table-header-cell">Date d'Attribution</TableCell>
                  <TableCell className="table-header-cell">Date de Fin</TableCell>
                  <TableCell className="table-header-cell" align="center">Détails</TableCell>
                  <TableCell className="table-header-cell" align="center">Modifier</TableCell>
                  <TableCell className="table-header-cell" align="center">Supprimer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTaches.map((tache) => (
                  <TableRow key={tache.id}>
                    <TableCell>{tache.name}</TableCell>
                    <TableCell>{tache.status}</TableCell>
                    <TableCell>
                      <LinearProgress 
                        variant="determinate" 
                        value={tache.progress} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5, 
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': { 
                            backgroundColor: tache.progress === 100 ? '#4caf50' : '#cc0000' 
                          } 
                        }} 
                      />
                    </TableCell>
                    <TableCell>{tache.startDate}</TableCell>
                    <TableCell>{tache.endDate}</TableCell>
                    <TableCell align="center">
                      <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#000000', color: '#ffffff', width: '100%' }}
                        startIcon={<FaInfoCircle />}
                        onClick={() => handleViewDetails(tache.id)}
                      >
                        Détails
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#000000', color: '#ffffff', width: '100%' }}
                        startIcon={<FaEdit />}
                      >
                        Modifier
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#cc0000', color: '#ffffff', width: '100%' }}
                        startIcon={<FaTrash />}
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
      )}

      {view === 'kanban' && (
        <section className="kanban-section">
          <h2>Vue Kanban</h2>
          {/* Ajoutez ici l'implémentation de la vue Kanban */}
        </section>
      )}

      {view === 'calendar' && (
        <section className="calendar-section">
          <h2>Vue Calendrier</h2>
          {/* Ajoutez ici l'implémentation de la vue Calendrier */}
        </section>
      )}

      {view === 'map' && (
        <section className="map-section">
          <h2>Vue Carte</h2>
          {/* Ajoutez ici l'implémentation de la vue Carte */}
        </section>
      )}
    </div>
  );
};

export default MesTaches;
