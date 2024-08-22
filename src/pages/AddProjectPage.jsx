import React, { useState } from 'react';
import './../assets/Css/pagesCss/AddProjectPage.css';

const AddProjectPage = ({ onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: '',
    priorite: '',
    idUtilisateur: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const validateForm = () => {
    const { titre, description, dateDebut, dateEcheance, priorite } = formData;
    return titre && description && dateDebut && dateEcheance && priorite;
  };

  return (
    <div className="add-project-page">
      <div className="page-content">
        <h2>Ajouter un Projet</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="dateDebut">Date de Début</label>
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
          <div className="form-group">
            <label htmlFor="priorite">Priorité</label>
            <select 
              id="priorite" 
              name="priorite" 
              value={formData.priorite} 
              onChange={handleChange} 
              required
            >
              <option value="">Choisir</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="eleve">Élevé</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="page-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
