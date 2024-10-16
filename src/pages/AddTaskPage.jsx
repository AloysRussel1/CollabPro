import React, { useState, useEffect } from 'react';
import api from './../api/api'; // Importez l'instance Axios
import './../assets/Css/pagesCss/AddTaskPage.css';

const AddTaskPage = ({ task }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        titre: task.titre,
        description: task.description,
        dateDebut: task.date_debut,
        dateEcheance: task.date_fin
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
      return formData.dateDebut && formData.dateEcheance;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const taskData = {
        ...task,
        titre: formData.titre,
        description: formData.description,
        date_debut: formData.dateDebut,
        date_fin: formData.dateEcheance,
        statut: 'Non commencé',
        projet: null,
        collaborateur: null,
        priorite: null
      };

      try {
        // Envoi des données au backend
        const response = await api.post('/taches/', taskData);

        // Message de succès
        setSuccessMessage('Tâche enregistrée avec succès.');
        setErrorMessage(''); // Effacer le message d'erreur

        // Réinitialiser le formulaire
        setFormData({
          titre: '',
          description: '',
          dateDebut: '',
          dateEcheance: ''
        });
        setCurrentStep(1); // Retour à la première étape
      } catch (error) {
        // En cas d'erreur
        setErrorMessage("Erreur lors de l'enregistrement de la tâche : " + (error.response ? error.response.data : error.message));
        setSuccessMessage(''); // Effacer le message de succès
      }
    }
  };

  return (
    <div className="add-task-page">
      <div className="page-content">
        <h2>{task ? 'Modifier la Tâche' : 'Ajouter une Tâche'}</h2>

        {/* Affichage des messages */}
        {successMessage && <div className="message success-message">{successMessage}</div>}
        {errorMessage && <div className="message error-message">{errorMessage}</div>}

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
