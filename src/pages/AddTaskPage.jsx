import React, { useState, useEffect } from 'react';
import './../assets/Css/pagesCss/AddTaskPage.css'; // Assurez-vous que le chemin du fichier CSS est correct

const AddTaskPage = ({ onSave, task }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: '',
    priorite: ''
  });
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (task) {
      setFormData({
        titre: task.name,
        description: task.description,
        dateDebut: task.assignedDate,
        dateEcheance: task.deadline,
        priorite: task.priority
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateStep = () => {
    if (currentStep === 1) {
      return formData.titre && formData.description;
    }
    if (currentStep === 2) {
      return formData.dateDebut && formData.dateEcheance && formData.priorite;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      onSave({
        ...task,
        name: formData.titre,
        description: formData.description,
        assignedDate: formData.dateDebut,
        deadline: formData.dateEcheance,
        priority: formData.priorite
      });
    }
  };

  return (
    <div className="add-task-page">
      <div className="page-content">
        <h2>{task ? 'Modifier la Tâche' : 'Ajouter une Tâche'}</h2>
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="form-step">
              <h3>Étape 1 : Informations de base</h3>
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

              <div className="form-actions">
                <button type="button" className="btn-next" onClick={handleNextStep}>Suivant</button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h3>Étape 2 : Détails supplémentaires</h3>
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
                  <option value="">Sélectionner une priorité</option>
                  <option value="basse">Basse</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="haute">Haute</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-previous" onClick={handlePreviousStep}>Précédent</button>
                <button type="submit" className="btn-save">Enregistrer</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
