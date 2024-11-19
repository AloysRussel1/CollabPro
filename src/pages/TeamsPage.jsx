import React, { useState, useEffect } from 'react';
import api from '../api/api'; // Votre fichier axios config
import './../assets/Css/pagesCss/TeamsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faEdit, faTrashAlt, faFileDownload, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import  BackButton from '../components/BackButton.jsx';

const TeamsPage = () => {
  const navigate = useNavigate();
  const [projectsData, setProjectsData] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showFiles, setShowFiles] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projets/');
        const projects = response.data;
  
        // Filtrer uniquement les projets où l'utilisateur est chef d'équipe
        const userProjects = projects.filter(project => project.chef_equipe === parseInt(userId));
  
        const projectsWithDetails = await Promise.all(
          userProjects.map(async (project) => {
            const membersResponse = await api.get(`/projets/${project.id}/membres`);
            const members = membersResponse.data;
            const filesResponse = await api.get(`/projets/${project.id}/fichiers`);
            const files = filesResponse.data;
  
            return {
              ...project,
              membres: members,
              fichiers: files,
            };
          })
        );
  
        setProjectsData(projectsWithDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    };
  
    fetchProjects();
  }, [userId]);
  

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

  const handleOrganizeMeeting = (projectId) => {
    navigate(`/services/projects/${projectId}/organiser-reunion`); // Navigation vers la page de réunion
  };
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUploadFile = async (projectId) => {
    if (!file) {
      alert('Veuillez sélectionner un fichier avant de soumettre.');
      return;
    }

    const formData = new FormData();
    formData.append('fichier', file);
    formData.append('projet', projectId);
    formData.append('nom', fileName);  // Ajout du nom du fichier

    try {
      await api.post(`/projets/${projectId}/fichiers`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Réinitialiser l'état
      setFile(null);
      setFileName('');

      const updatedFilesResponse = await api.get(`/projets/${projectId}/fichiers`);
      setProjectsData((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, fichiers: updatedFilesResponse.data } : project
        )
      );
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
    }
  };


  const toggleShowFiles = (projectId) => {
    setShowFiles(prev => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const handleDeleteFile = async (fileId, projectId) => {
    try {
      await api.delete(`/projets/${projectId}/fichiers/${fileId}/`);

      setProjectsData((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, fichiers: project.fichiers.filter(file => file.id !== fileId) } : project
        )
      );
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier:', error);
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
      <BackButton/>
      <h1 className="projects-page-title"> Mes équipes </h1>
      <div className="projects-container">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h2 className="project-name">{project.titre}</h2>
              <div className="project-actions">
                <button onClick={() => handleAddMember(project.id)} className="add-member-btn">
                  Ajouter un membre
                </button>
                <button
                  className="upload-file-btn"
                  onClick={() => handleUploadFile(project.id)}
                  disabled={!file}
                >
                  <label style={{ cursor: 'pointer' }}>
                    Ajouter des fichiers
                    <input
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </button>
                <button
                  onClick={() => handleOrganizeMeeting(project.id)}
                  className="add-member-btn"
                >
                  Organiser une réunion
                </button>
              </div>

            </div>

            {/* Affichage des fichiers */}
            <div className="files-section">
              <h3 onClick={() => toggleShowFiles(project.id)} style={{ cursor: 'pointer' }}>
                Fichiers du projet <FontAwesomeIcon icon={faChevronDown} />
              </h3>
              {showFiles[project.id] && (
                <ul className="files-list">
                  {project.fichiers && project.fichiers.length > 0 ? (
                    project.fichiers.map((file, index) => (
                      <li key={file.id}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" download>
                          {`Fichier ${index + 1}`}  {/* Affichage dynamique basé sur l'index */}
                          <FontAwesomeIcon icon={faFileDownload} className="download-icon" />
                        </a>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeleteFile(file.id, project.id)}
                          className="delete-icon"
                          title="Supprimer"
                        />
                      </li>
                    ))
                  ) : (
                    <li>Aucun fichier disponible.</li>
                  )}

                </ul>
              )}
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
                            handleAssignTask(member.id, project.id)
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
