import React, { useState, useEffect } from 'react';
import api from '../api/api';  // Votre fichier axios config
import './../assets/Css/pagesCss/TeamsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TeamsPage = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [newMember, setNewMember] = useState({ nom: '', email: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [selectedMember, setSelectedMember] = useState(null);
  const [file, setFile] = useState(null); // État pour le fichier sélectionné

  // Récupérer les projets depuis le backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projets/');
        const projects = response.data;

        // Pour chaque projet, récupérer ses membres
        const projectsWithMembers = await Promise.all(
          projects.map(async (project) => {
            const membersResponse = await api.get(`/projets/${project.id}/membres`);
            console.log('Membres pour le projet', project.id, membersResponse.data); 
            return {
              ...project,
              membres: membersResponse.data
            };
          })
        );

        setProjectsData(projectsWithMembers);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddMember = async (projectId) => {
    try {
        console.log('Nouveau membre:', newMember); // Afficher l'objet pour le débogage
        await api.post(`/projets/${projectId}/membres`, newMember);
        setNewMember({ nom: '', email: '' }); // Réinitialiser le formulaire
        fetchProjects(); // Rafraîchir la liste des projets
    } catch (error) {
        console.error('Erreur lors de l\'ajout du membre:', error);
    }
};


  const handleAssignTask = async (memberId, projectId) => {
    try {
      await api.post(`/projets/${projectId}/membres/${memberId}/taches`, newTask);
      setNewTask({ title: '', description: '', dueDate: '' }); // Réinitialiser le formulaire
      setShowAssignTask(false); // Fermer le modal d'assignation de tâche
    } catch (error) {
      console.error('Erreur lors de l\'assignation de la tâche:', error);
    }
  };

  const handleUploadFile = async (projectId) => {
    const formData = new FormData();
    formData.append('file', file); // Ajoutez le fichier sélectionné

    try {
      await api.post(`/projets/${projectId}/fichiers`, formData);
      setFile(null); // Réinitialiser l'état du fichier
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
    }
  };

  return (
    <div className="projects-page">
      <h1 className="projects-page-title">Gestion des équipes de projet</h1>
      <div className="projects-container">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h2 className="project-name">{project.titre}</h2>
              <div className="project-actions">
                <button onClick={() => setShowAddMember(!showAddMember)} className="add-member-btn">
                  Ajouter un membre
                </button>
                <button onClick={() => setActiveProject(project.id)} className="upload-file-btn">
                  Ajouter des fichiers
                </button>
              </div>
            </div>

            {/* Afficher les membres du projet */}
            <table className="team-members-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {project.membres && project.membres.length > 0 ? (
                  project.membres.map((member) => (
                    <tr key={member.id}>
                      <td>{member.name || 'Nom non disponible'}</td>
                      <td>{member.email}</td>
                      <td>{member.role}</td>
                      <td className="action-icons">
                        <FontAwesomeIcon
                          icon={faTasks}
                          onClick={() => { setSelectedMember(member.id); setShowAssignTask(true); }}
                          className="action-icon"
                          title="Assigner une tâche"
                        />
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => handleEditMember(member.id)}
                          className="action-icon"
                          title="Éditer"
                        />
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => handleDeleteMember(member.id)}
                          className="action-icon"
                          title="Supprimer"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Aucun membre dans ce projet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
