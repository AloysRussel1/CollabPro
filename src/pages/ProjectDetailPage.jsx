import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import './../assets/Css/pagesCss/ProjectDetailPage.css';

const tasks = [
    { id: '1', name: 'Task Alpha', progress: 60, deadline: '2024-08-25', responsible: 'Alice Johnson' },
    { id: '2', name: 'Task Beta', progress: 100, deadline: '2024-08-20', responsible: 'Bob Smith' },
    { id: '3', name: 'Task Gamma', progress: 30, deadline: '2024-09-10', responsible: 'Charlie Brown' },
];

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const themeColor = '#ff0000'; // Rouge vif

    const project = {
        name: 'Projet Alpha',
        description: 'Description du projet Alpha.',
        progress: 70,
        deadline: '2024-08-30',
    };

    return (
        <div className="project-detail-page">
            <header className="project-header">
                <Typography variant="h4" color="textPrimary">{project.name}</Typography>
                <Typography variant="body1" color="textSecondary">{project.description}</Typography>
                <div className="project-progress">
                    <Typography variant="body2">Progression: {project.progress}%</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0', /* Fond gris clair */
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: project.progress === 100 ? '#4caf50' : themeColor, /* Vert pour 100% ou rouge pour les autres */
                            },
                        }}
                    />
                </div>
                <Typography variant="body2" color="textSecondary">Échéance: {project.deadline}</Typography>
            </header>

            <section className="tasks-section">
                <Typography variant="h6" color="textPrimary">Tâches</Typography>
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
                                                    backgroundColor: task.progress === 100 ? '#4caf50' : themeColor,
                                                },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{task.responsible}</TableCell>
                                    <TableCell>{task.deadline}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => navigate(`/tasks/${task.id}`)}
                                            sx={{ color: themeColor }}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                        <IconButton sx={{ color: themeColor }}>
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
