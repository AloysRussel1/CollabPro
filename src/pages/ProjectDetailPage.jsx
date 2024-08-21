import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, LinearProgress, TextField, Typography, IconButton } from '@mui/material';
import { Mail as MailIcon } from '@mui/icons-material'; // Import de l'icône de messagerie
import './../assets/Css/pagesCss/ProjectDetailPage.css';

// Données fictives du projet
const fakeProject = {
  id: '1',
  name: 'Projet Alpha',
  description: 'Description du projet Alpha',
  startDate: '2024-07-01',
  endDate: '2024-12-31',
  priority: 'Élevé',
  responsibleName: 'Jean Dupont'
};

// Données fictives des tâches avec responsable
const fakeTasks = [
  { id: '1', title: 'Tâche 1', description: 'Description de la tâche 1', progress: 50, dueDate: '2024-08-15', responsibleName: 'Alice Martin' },
  { id: '2', title: 'Tâche 2', description: 'Description de la tâche 2', progress: 20, dueDate: '2024-09-30', responsibleName: 'Bob Dupuis' },
  { id: '3', title: 'Tâche 3', description: 'Description de la tâche 3', progress: 75, dueDate: '2024-10-10', responsibleName: 'Charlie Bernard' },
  { id: '4', title: 'Tâche 4', description: 'Description de la tâche 4', progress: 90, dueDate: '2024-11-20', responsibleName: 'Diana Lemoine' },
  { id: '5', title: 'Tâche 5', description: 'Description de la tâche 5', progress: 40, dueDate: '2024-12-05', responsibleName: 'Eva Dupont' }
];

const ProjectDetailPage = () => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(fakeTasks);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Utiliser les données fictives ici
    setProject(fakeProject);
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    setSending(true);

    // Simuler l'envoi du message (remplacer par une vraie API si disponible)
    setTimeout(() => {
      setSending(false);
      setMessage('');
      alert('Message envoyé avec succès !');
    }, 1000);
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="project-detail-page">
      <Typography variant="h4" gutterBottom>
        Détails du Projet : {project.name}
      </Typography>
      <div className="project-info">
        <Typography variant="h6">Informations sur le Projet</Typography>
        <p><strong>Description :</strong> {project.description}</p>
        <p><strong>Date de Début :</strong> {project.startDate}</p>
        <p><strong>Date d'Échéance :</strong> {project.endDate}</p>
        <p><strong>Priorité :</strong> {project.priority}</p>
        <p><strong>Responsable :</strong> {project.responsibleName}</p>
      </div>

      <Typography variant="h6" gutterBottom>
        Tâches Associées
      </Typography>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tâche</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Responsable</TableCell> {/* Nouvelle colonne */}
              <TableCell>État d'Avancement</TableCell>
              <TableCell>Date d'Échéance</TableCell>
              <TableCell>Contacter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.responsibleName}</TableCell> {/* Nouvelle cellule */}
                <TableCell>
                  <LinearProgress 
                    variant="determinate" 
                    value={task.progress} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5, 
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': { 
                        backgroundColor: task.progress === 100 ? '#4caf50' : '#ff9800' 
                      } 
                    }} 
                  />
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="contacter">
                    <MailIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="message-section">
        <Typography variant="h6" gutterBottom>
          Laisser un Message au Responsable
        </Typography>
        <TextField
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSendMessage} 
          disabled={sending}
        >
          {sending ? 'Envoi en cours...' : 'Envoyer le Message'}
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
