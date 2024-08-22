import React, { useState, useEffect } from 'react';
import './../assets/Css/pagesCss/AddTaskModal.css';

const AddTaskModal = ({ showModal, onClose, onSave, projects, teamMembers }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: '',
    priorite: '',
    projetId: '',
    responsableId: ''
  });

  useEffect(() => {
    if (showModal) {
      // Réinitialiser le formulaire lorsque la modal est affichée
      setFormData({
        titre: '',
        description: '',
        dateDebut: '',
        dateEcheance: '',
        priorite: '',
        projetId: '',
        responsableId: ''
      });
    }
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!showModal) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Ajouter une Tâche</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input type="text" id="titre" name="titre" value={formData.titre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dateDebut">Date de Début</label>
            <input type="date" id="dateDebut" name="dateDebut" value={formData.dateDebut} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dateEcheance">Date d'Échéance</label>
            <input type="date" id="dateEcheance" name="dateEcheance" value={formData.dateEcheance} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="priorite">Priorité</label>
            <select id="priorite" name="priorite" value={formData.priorite} onChange={handleChange} required>
              <option value="">Choisir</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="eleve">Élevé</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="projetId">Projet</label>
            <select id="projetId" name="projetId" value={formData.projetId} onChange={handleChange} required>
              <option value="">Choisir un projet</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="responsableId">Responsable</label>
            <select id="responsableId" name="responsableId" value={formData.responsableId} onChange={handleChange} required>
              <option value="">Choisir un responsable</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
