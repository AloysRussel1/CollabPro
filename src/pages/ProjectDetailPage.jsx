import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message'; // Importer l'icône de message
import InfoIcon from '@mui/icons-material/Info'; // Importer l'icône de détails
import './../assets/Css/pagesCss/ProjectDetailPage.css'; 

const tasks = [
    { id: '1', name: 'Task Alpha', progress: 60, deadline: '2024-08-25', responsible: 'Alice Johnson' },
    { id: '2', name: 'Task Beta', progress: 100, deadline: '2024-08-20', responsible: 'Bob Smith' },
    { id: '3', name: 'Task Gamma', progress: 30, deadline: '2024-09-10', responsible: 'Charlie Brown' },
];

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const themeColor = '#ff5733'; // Remplacez cette couleur par la couleur de votre thème

    // Exemple de données du projet, à remplacer par une requête API
    const project = {
        name: 'Projet Alpha',
        description: 'Description du projet Alpha.',
        progress: 70,
        deadline: '2024-08-30',
    };

    return (
        <div className="project-detail-page">
            <header className="project-header">
                <Typography variant="h4">{project.name}</Typography>
                <Typography variant="body1">{project.description}</Typography>
                <div className="project-progress">
                    <Typography variant="body2">Progress: {project.progress}%</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: project.progress === 100 ? '#4caf50' : '#ff9800',
                            },
                        }}
                    />
                </div>
                <Typography variant="body2">Deadline: {project.deadline}</Typography>
            </header>

            <section className="tasks-section">
                <Typography variant="h6">Tâches</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tâche</TableCell>
                                <TableCell>État d'avancement</TableCell>
                                <TableCell>Responsable</TableCell>
                                <TableCell>Échéance</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.name}</TableCell>
                                    <TableCell>
                                        <LinearProgress
                                            variant="determinate"
                                            value={task.progress}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: task.progress === 100 ? '#4caf50' : '#ff9800',
                                                },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{task.responsible}</TableCell>
                                    <TableCell>{task.deadline}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/tasks/${task.id}`)} // Navigate to task details
                                            sx={{ color: themeColor }}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                        <IconButton color="primary" sx={{ color: themeColor }}>
                                            <MessageIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </div>
    );
};

export default ProjectDetailPage;
