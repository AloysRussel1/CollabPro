import React, { useState } from 'react';
import Modal from 'react-modal';
import './../assets/Css/componentsCss/AddTaskModal.css'; 

Modal.setAppElement('#root');

const AddTaskModal = ({ isOpen, onRequestClose, onSave }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: '',
    priorite: ''
  });
  const [currentStep, setCurrentStep] = useState(1);

  // Gestion du changement de valeur des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de la navigation entre les étapes
  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Validation des données en fonction de l'étape
  const validateStep = () => {
    if (currentStep === 1) {
      return formData.titre && formData.description;
    }
    if (currentStep === 2) {
      return formData.dateDebut && formData.dateEcheance && formData.priorite;
    }
    return true;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      onSave(formData); // Appel de la fonction de sauvegarde passée en prop
      onRequestClose(); // Fermer la modale après la soumission
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="add-task-modal"
      overlayClassName="add-task-overlay"
    >
      <div className="page-content">
        <h2>Ajouter une Tâche</h2>
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
    </Modal>
  );
};

export default AddTaskModal;
