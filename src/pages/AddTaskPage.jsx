import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Ajoutez useNavigate ici
import api from './../api/api'; // Importez l'instance Axios
import './../assets/Css/pagesCss/AddTaskPage.css';

const AddTaskPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialisation du hook useNavigate
  const task = location.state?.task; // Accéder à l'objet de tâche si disponible
  const projectId = location.state?.projet;

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: '',
    projet: projectId || null,
    collaborateur: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté (vérification de l'accessToken)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLogin(true);
    }

    if (task) {
      setFormData({
        titre: task.titre,
        description: task.description,
        dateDebut: task.date_debut,
        dateEcheance: task.date_fin,
        projet: task.projet, // Conservez la valeur du projet
        collaborateur: task.collaborateur // Conservez la valeur du collaborateur
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
    if (!isLogin) {
      navigate('/signin');
      return;
    }
    e.preventDefault();
    if (validateStep()) {
      // Inclure les valeurs du projet et du collaborateur lors de la soumission
      const taskData = {
        titre: formData.titre,
        description: formData.description,
        date_debut: formData.dateDebut,
        date_fin: formData.dateEcheance,
        statut: 'Non commencé',
        projet: projectId, // Conserver la valeur du projet
        collaborateur: formData.collaborateur, // Conserver la valeur du collaborateur
        priorite: null
      };

      try {
        if (task?.id) {
          // Si la tâche existe, mettre à jour la tâche
          await api.put(`/taches/${task.id}/`, taskData);
          setSuccessMessage('Tâche mise à jour avec succès.');
        } else {
          // Si la tâche n'existe pas, créer une nouvelle tâche
          await api.post('/taches/', taskData);
          setSuccessMessage('Tâche ajoutée avec succès.');
        }

        setErrorMessage(''); // Effacer le message d'erreur

        // Réinitialiser le formulaire (si nécessaire)
        setFormData({
          titre: '',
          description: '',
          dateDebut: '',
          dateEcheance: '',
          projet: null, 
          collaborateur: null, 
        });
        setCurrentStep(1); 

        // Rediriger vers la page des tâches après un ajout/mise à jour réussi(e)
        navigate('/services/projects/${project.id}'); 

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
                <button type="submit" className="btn-submit">Soumettre</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
