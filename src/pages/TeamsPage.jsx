import React, { useState, useEffect } from 'react';
import api from '../api/api'; // Votre fichier axios config
import './../assets/Css/pagesCss/TeamsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TeamsPage = () => {
  const navigate = useNavigate();
  const [projectsData, setProjectsData] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
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
              membres: membersResponse.data,
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

  // Naviguer vers la page pour ajouter un membre
  const handleAddMember = (projectId) => {
    navigate(`/services/projects/${projectId}/ajouter-membre`);
    console.log('Naviguer vers la page pour ajouter un membre');
  };

  const handleEditMember = (memberId, projectId) => {
    const member = projectsData
      .find((project) => project.id === projectId)
      .membres.find((m) => m.id === memberId);

    navigate(`/services/projects/${projectId}/ajouter-membre`, { state: { member } });
  };


  const handleAssignTask = async (memberId, projectId) => {
    navigate(`/services/projets/${projectId}/assigner-taches/${memberId}`);
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

  const handleDeleteMember = async (memberId, projectId) => {
    try {
      await api.delete(`/projets/${projectId}/membres/${memberId}/`);

      const updatedProjects = projectsData.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            membres: project.membres.filter((member) => member.id !== memberId),
          };
        }
        return project;
      });

      setProjectsData(updatedProjects);
    } catch (error) {
      console.error('Erreur lors de la suppression du membre:', error);
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
                <button onClick={() => handleAddMember(project.id)} className="add-member-btn">
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
                          onClick={() => {
                            handleAssignTask(project.id, member.id)
                          }}
                          className="action-icon"
                          title="Assigner une tâche"
                        />
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => handleEditMember(member.id, project.id)}
                          className="action-icon"
                          title="Éditer"
                        />

                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => handleDeleteMember(member.id, project.id)}
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
