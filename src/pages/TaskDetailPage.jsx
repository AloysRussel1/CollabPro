import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Paper, Box } from '@mui/material';
import { LinearProgress } from '@mui/material';
import './../assets/Css/pagesCss/TaskDetailPage.css'; // Assurez-vous que le chemin est correct

// Simuler des données de tâches
const simulatedTasks = [
    {
        id: '1',
        name: 'Task Alpha',
        progress: 60,
        deadline: '2024-08-25',
        responsible: 'Alice Johnson',
        description: 'Complete the initial setup of the project. Ensure all team members are onboarded.',
        assignedDate: '2024-07-15'
    },
    {
        id: '2',
        name: 'Task Beta',
        progress: 100,
        deadline: '2024-08-20',
        responsible: 'Bob Smith',
        description: 'Finalize the project deliverables and prepare the final report.',
        assignedDate: '2024-06-30'
    },
    {
        id: '3',
        name: 'Task Gamma',
        progress: 30,
        deadline: '2024-09-10',
        responsible: 'Charlie Brown',
        description: 'Conduct a mid-project review and adjust the timeline as needed.',
        assignedDate: '2024-07-20'
    }
];

const TaskDetailPage = () => {
    const { taskId } = useParams();
    
    // Trouver la tâche correspondant à taskId ou utiliser une tâche par défaut
    const task = simulatedTasks.find(t => t.id === taskId) || simulatedTasks[0];

    return (
        <div className="task-detail-page">
            <Paper elevation={3} className="task-detail-paper">
                <Typography variant="h4" component="h1" className="task-title">{task.name}</Typography>
                <Typography variant="body1" className="task-responsible">Responsable: {task.responsible}</Typography>
                <Typography variant="body2" className="task-assigned-date">Date d'attribution: {task.assignedDate}</Typography>
                <Typography variant="body2" className="task-deadline">Échéance: {task.deadline}</Typography>
                <Typography variant="body2" className="task-description">Description: {task.description}</Typography>
                <div className="task-progress">
                    <Typography variant="body2">Progression: {task.progress}%</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={task.progress}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: task.progress === 100 ? '#4caf50' : '#000',
                            },
                        }}
                    />
                </div>
                <Box mt={2} className="button-container">
                    <Button variant="contained" className="modify-button">
                        Modifier
                    </Button>
                    <Button variant="contained" className="delete-button">
                        Supprimer
                    </Button>
                </Box>
            </Paper>
        </div>
    );
};

export default TaskDetailPage;
