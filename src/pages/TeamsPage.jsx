import React, { useState } from 'react';
import './../assets/Css/pagesCss/TeamsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import MeetingButton from '../components/MeetingButton';

// Simuler les données des projets et des membres
const projectsData = [
  {
    id: 1,
    projectName: 'Projet Alpha',
    teamMembers: [
      { id: 1, name: 'Alice', role: 'Collaborateur', email: 'alice@example.com', tasks: [] },
      { id: 2, name: 'Bob', role: 'Collaborateur', email: 'bob@example.com', tasks: [] },
      { id: 3, name: 'Charlie', role: 'Collaborateur', email: 'charlie@example.com', tasks: [] },
    ],
    files: [] // Liste des fichiers du projet
  },
  {
    id: 2,
    projectName: 'Projet Beta',
    teamMembers: [
      { id: 4, name: 'Grace', role: 'Collaborateur', email: 'grace@example.com', tasks: [] },
      { id: 5, name: 'Hank', role: 'Collaborateur', email: 'hank@example.com', tasks: [] },
    ],
    files: [] // Liste des fichiers du projet
  },
];

const TeamsPage = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [selectedMember, setSelectedMember] = useState(null);
  const [file, setFile] = useState(null); // État pour le fichier sélectionné

  const handleAddMember = (projectId) => {
    if (newMember.name && newMember.email) {
      const projectIndex = projectsData.findIndex((p) => p.id === projectId);
      const newMemberId = projectsData[projectIndex].teamMembers.length + 1;

      // Ajouter le nouveau membre
      projectsData[projectIndex].teamMembers.push({
        id: newMemberId,
        name: newMember.name,
        role: 'Collaborateur', // Rôle par défaut
        email: newMember.email,
        tasks: [], // Initialise une liste vide de tâches pour le nouveau membre
      });

      // Réinitialiser les champs
      setNewMember({ name: '', email: '' });
      setNewTask({ title: '', description: '', dueDate: '' });
      setShowAddMember(false);
    }
  };

  const handleAssignTask = (memberId, projectId) => {
    if (newTask.title && newTask.description && newTask.dueDate) {
      const projectIndex = projectsData.findIndex((p) => p.id === projectId);
      const memberIndex = projectsData[projectIndex].teamMembers.findIndex((m) => m.id === memberId);
      projectsData[projectIndex].teamMembers[memberIndex].tasks.push({
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
      });

      // Réinitialiser les champs
      setNewTask({ title: '', description: '', dueDate: '' });
      setShowAssignTask(false);
      setSelectedMember(null);
    }
  };

 

  const startMeeting = () => {
    window.open('https://meet.jit.si/NomDeVotreReunion', '_blank');
  };


  

  const handleEditMember = (memberId) => {
    // Logique pour éditer le membre (par exemple, ouvrir un formulaire d'édition)
  };

  const handleDeleteMember = (memberId) => {
    // Logique pour supprimer le membre (par exemple, confirmation et suppression)
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadFile = (projectId) => {
    if (file) {
      const projectIndex = projectsData.findIndex((p) => p.id === projectId);
      const newFileId = projectsData[projectIndex].files.length + 1;
      projectsData[projectIndex].files.push({
        id: newFileId,
        name: file.name,
        url: URL.createObjectURL(file) // Créer une URL temporaire pour le fichier
      });

      // Réinitialiser les champs
      setFile(null);
    }
  };

  return (
    <div className="projects-page">
      <h1 className="projects-page-title">Gestion des équipes de projet</h1>
      <div className="projects-container">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h2 className="project-name">{project.projectName}</h2>
              <div className="project-actions">
                <button onClick={() => setShowAddMember(!showAddMember)} className="add-member-btn">
                  Ajouter un membre
                </button>
                <button onClick={() => setActiveProject(project.id)} className="upload-file-btn">
                  Ajouter des fichiers
                </button>
                <button onClick={startMeeting} className="team-meetings-btn" >
                  Organiser une réunion
                </button>
              </div>
            </div>

            {showAddMember && (
              <div className="add-member-form">
                <input
                  type="text"
                  placeholder="Nom du membre"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email du membre"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
                <button onClick={() => handleAddMember(project.id)} className="submit-member-btn">
                  Ajouter
                </button>
              </div>
            )}

            {showAssignTask && (
              <div className="assign-task-form">
                <input
                  type="text"
                  placeholder="Titre de la tâche"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <textarea
                  placeholder="Description de la tâche"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Date d'échéance"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <button onClick={() => handleAssignTask(selectedMember, project.id)} className="submit-task-btn">
                  Assigner la tâche
                </button>
              </div>
            )}

            {activeProject === project.id && (
              <div className="upload-file-form">
                <input
                  type="file"
                  onChange={handleFileChange}
                />
                <button onClick={() => handleUploadFile(project.id)}>
                  Upload File
                </button>
              </div>
            )}

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
                {project.teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
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
                ))}
              </tbody>
            </table>

            {project.files.length > 0 && (
              <div className="project-files">
                <h3>Fichiers du Projet</h3>
                <ul>
                  {project.files.map((file) => (
                    <li key={file.id}>
                      <a href={file.url} download>{file.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
