import React, { useState } from 'react';
import './../assets/Css/pagesCss/AddTaskPage.css'; // Assurez-vous que le chemin du fichier CSS est correct

const AddTaskPage = ({ projects = [], users = [], onSave }) => {
  // Initialisation du state pour les données du formulaire
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: '',
    priorite: '',
    idProjet: '',
    idResponsable: ''
  });

  // Gestion du changement de valeur des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData); // Appel de la fonction de sauvegarde passée en prop
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const { titre, description, dateDebut, dateEcheance, priorite, idProjet, idResponsable } = formData;
    return titre && description && dateDebut && dateEcheance && priorite && idProjet && idResponsable;
  };

  return (
    <div className="add-task-page">
      <div className="page-content">
        <h2>Ajouter une Tâche</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="idProjet">Projet</label>
            <select
              id="idProjet"
              name="idProjet"
              value={formData.idProjet}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner un projet</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.titre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idResponsable">Responsable</label>
            <select
              id="idResponsable"
              name="idResponsable"
              value={formData.idResponsable}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner un responsable</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateDebut">Date de D'attribution</label>
            <input
              type="date"
              id="dateDebut"
              name="dateDebut"
              value={formData.dateDebut}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateEcheance">Date d'Échéance</label>
            <input
              type="date"
              id="dateEcheance"
              name="dateEcheance"
              value={formData.dateEcheance}
              onChange={handleChange}
              required
            />
          </div>
          <div className="page-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
