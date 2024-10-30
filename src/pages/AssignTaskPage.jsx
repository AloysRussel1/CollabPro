import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api'; // Votre configuration axios
import './../assets/Css/pagesCss/AssignTaskPage.css';

const AssignTaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { projectId, memberId } = useParams(); // Récupérer à la fois projectId et memberId

    // Fonction pour récupérer les tâches non assignées
    useEffect(() => {
        const fetchUnassignedTasks = async () => {
            try {
                const response = await api.get(`/projets/${projectId}/taches-non-assignees/`);
                setTasks(response.data); // Mettre à jour les tâches non assignées
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches non assignées:', error);
            }
        };

        // On appelle la fonction pour récupérer les tâches
        fetchUnassignedTasks();
    }, [projectId, memberId]); // On écoute aussi les changements de memberId

    // Gestion de la sélection/désélection des tâches
    const handleTaskSelection = (taskId) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter(id => id !== taskId)); // Désélectionner
        } else {
            setSelectedTasks([...selectedTasks, taskId]); // Sélectionner
        }
    };

    // Gestion de l'assignation des tâches
    const handleAssignTasks = async (e) => {
        e.preventDefault();

        if (selectedTasks.length === 0) {
            setError('Veuillez sélectionner au moins une tâche.');
            return;
        }

        try {
            // Appel à l'API pour assigner les tâches
            await api.post(`/projets/${projectId}/assigner-taches/`, {
                memberId: memberId, // ID du membre récupéré depuis l'URL
                taskIds: selectedTasks // Liste des tâches sélectionnées
            });

            // Rediriger vers la page des équipes après assignation
            navigate(`/services/projects/equipes`);
        } catch (error) {
            console.error('Erreur lors de l\'assignation des tâches:', error);
            setError('Erreur lors de l\'assignation des tâches.');
        }
    };

    return (
        <div className="assign-task-container">
            <h1 className="assign-task-title">Assigner des tâches à un membre</h1>

            {/* Afficher un message d'erreur s'il y a un problème */}
            {error && <p className="error-message">{error}</p>}

            <form className="assign-task-form" onSubmit={handleAssignTasks}>
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Date limite</th>
                            <th>Statut</th>
                            <th>Selectionner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.titre}</td>
                                <td>{task.description}</td>
                                <td>{task.date_fin}</td>
                                <td>{task.statut}</td>
                                <td>
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            value={task.id}
                                            checked={selectedTasks.includes(task.id)}
                                            onChange={() => handleTaskSelection(task.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button type="submit" className="btn-submit">
                    Assigner les tâches
                </button>
            </form>
        </div>
    );
};

export default AssignTaskPage;
