import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { LinearProgress } from '@mui/material';
import './../assets/Css/pagesCss/TaskDetailPage.css';
import AddTaskPage from './AddTaskPage'; // Assurez-vous que le chemin du fichier est correct

const simulatedTasks = [
    {
        id: '1',
        name: 'Task Alpha',
        progress: 60,
        deadline: '2024-08-25',
        responsible: 'Alice Johnson',
        description: 'Complete the initial setup of the project. Ensure all team members are onboarded.',
        assignedDate: '2024-07-15',
        priority: 'High',
        status: 'In Progress',
    },
    {
        id: '2',
        name: 'Task Beta',
        progress: 100,
        deadline: '2024-08-20',
        responsible: 'Bob Smith',
        description: 'Finalize the project deliverables and prepare the final report.',
        assignedDate: '2024-06-30',
        priority: 'Medium',
        status: 'Completed',
    },
    {
        id: '3',
        name: 'Task Gamma',
        progress: 30,
        deadline: '2024-09-10',
        responsible: 'Charlie Brown',
        description: 'Conduct a mid-project review and adjust the timeline as needed.',
        assignedDate: '2024-07-20',
        priority: 'Low',
        status: 'Not Started',
    }
];

const TaskDetailPage = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState(simulatedTasks.find(t => t.id === taskId) || simulatedTasks[0]);

    const handleModify = () => {
        setShowForm(true);
    };

    const handleDelete = () => {
        // Logique pour supprimer la tâche (peut être un appel API ou autre)
        console.log(`Deleting task with id: ${task.id}`);
        // Après suppression, naviguer vers une autre page ou mettre à jour l'état
        navigate('/tasks'); // Par exemple, revenir à la liste des tâches
    };

    const handleSave = (updatedTask) => {
        // Logique pour mettre à jour la tâche (peut être un appel API ou autre)
        setTask(updatedTask);
        setShowForm(false);
    };

    return (
        <div className="task-detail-page">
            <div className="task-detail-container">
                {showForm ? (
                    <AddTaskPage onSave={handleSave} task={task} />
                ) : (
                    <>
                        <div className="task-header">
                            <Typography variant="h1" component="h1" className="task-title">{task.name}</Typography>
                            <Typography variant="body1" className="task-status">{task.status}</Typography>
                        </div>
                        <div className="task-detail">
                            <div className="task-detail-item">
                                <label>Responsable:</label>
                                <span>{task.responsible}</span>
                            </div>
                            <div className="task-detail-item">
                                <label>Date d'attribution:</label>
                                <span>{task.assignedDate}</span>
                            </div>
                            <div className="task-detail-item">
                                <label>Échéance:</label>
                                <span>{task.deadline}</span>
                            </div>
                            <div className="task-detail-item">
                                <label>Priorité:</label>
                                <span>{task.priority}</span>
                            </div>
                            <div className="task-detail-item">
                                <label>Description:</label>
                                <span>{task.description}</span>
                            </div>
                        </div>
                        <Box className="task-progress">
                            <LinearProgress variant="determinate" value={task.progress} />
                        </Box>
                        <Box className="button-container">
                            <Button 
                                variant="contained" 
                                className="modify-button"
                                onClick={handleModify}
                            >
                                Modifier
                            </Button>
                            <Button 
                                variant="contained" 
                                className="delete-button"
                                onClick={handleDelete}
                            >
                                Supprimer
                            </Button>
                        </Box>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskDetailPage;
