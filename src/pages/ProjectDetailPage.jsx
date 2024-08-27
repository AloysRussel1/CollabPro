import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/PlaylistAdd';
import './../assets/Css/pagesCss/ProjectDetailPage.css';

const tasks = [
    { id: '1', name: 'Task Alpha', progress: 60, deadline: '2024-08-25', responsible: 'Alice Johnson' },
    { id: '2', name: 'Task Beta', progress: 100, deadline: '2024-08-20', responsible: 'Bob Smith' },
    { id: '3', name: 'Task Gamma', progress: 30, deadline: '2024-09-10', responsible: 'Charlie Brown' },
];

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const themeColor = '#ff0000';
    const progressColor = '#000'; 

    const project = {
        name: 'Projet Alpha',
        description: 'Description du projet Alpha.',
        progress: 70,
        deadline: '2024-08-30',
    };

    const handleViewDetails = (taskId) => {
        navigate(`/tasks/${taskId}`);
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
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: project.progress === 100 ? '#4caf50' : progressColor,
                            },
                        }}
                    />
                </div>
                <Typography variant="body2" color="textSecondary">Échéance: {project.deadline}</Typography>
                <div className="project-actions">
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{ backgroundColor: '#000000', color: '#ffffff', width: '100%', hover: { backgroundColor: '#cc0000' } }}
                        onClick={() => alert('Modifier le projet')}
                    >
                        Modifier
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{ backgroundColor: '#cc0000', color: '#ffffff', width: '100%', hover: { backgroundColor: '#cc0000' } }}
                        onClick={() => alert('Supprimer le projet')}
                    >
                        Supprimer
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<AddTaskIcon />}
                        sx={{ backgroundColor: '#000000', color: '#ffffff', width: '100%',hover: { backgroundColor: '#cc0000' } }}
                        onClick={() => alert('Ajouter une tâche')}
                    >
                        Ajouter Tâche
                    </Button>
                </div>
            </header>

            <section className="tasks-section">
                <Typography variant="h6" color="textPrimary">Tâches</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-header-cell">Tâche</TableCell>
                                <TableCell className="table-header-cell">État d'avancement</TableCell>
                                <TableCell className="table-header-cell">Responsable</TableCell>
                                <TableCell className="table-header-cell">Échéance</TableCell>
                                <TableCell className="table-header-cell" align="center">Détails</TableCell>
                                <TableCell className="table-header-cell" align="center">Message</TableCell>
                                <TableCell className="table-header-cell" align="center">Supprimer</TableCell>
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
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#000000', color: '#ffffff', width: '100%',hover:{ backgroundColor: '#cc0000' } }}
                                            startIcon={<InfoIcon />}
                                            onClick={() => handleViewDetails(task.id)}
                                        >
                                            Détails
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#000000', color: '#ffffff', width: '100%',hover: { backgroundColor: '#cc0000' } }}
                                            startIcon={<MessageIcon />}
                                        >
                                            Message
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#cc0000', color: '#ffffff', width: '100%',hover: { backgroundColor: '#000000' } }}
                                            startIcon={<DeleteIcon />}
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
        </div>
    );
};

export default ProjectDetailPage;
