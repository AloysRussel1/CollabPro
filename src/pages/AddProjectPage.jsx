import React, { useState, useEffect } from 'react';
import api from './../api/api.js'; 
import './../assets/Css/pagesCss/AddProjectPage.css';

const AddProjectPage = ({ onSave, initialData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: '',
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: '',
    membres: [],
    chefEquipe: '', 
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        titre: initialData.titre || '',
        description: initialData.description || '',
        dateDebut: initialData.date_debut || '',
        dateEcheance: initialData.date_fin || '',
        membres: initialData.membres || [],
        chefEquipe: initialData.chef_equipe || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addMembre = () => {
    setFormData({
      ...formData,
      membres: [...formData.membres, { email: '', roleProjet: '' }],
    });
  };

  const handleMembreChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembres = formData.membres.map((membre, i) =>
      i === index ? { ...membre, [name]: value } : membre
    );
    setFormData({ ...formData, membres: updatedMembres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const membres = await Promise.all(
          formData.membres.map(async (membre) => {
            const response = await api.get(`users?email=${membre.email}`);
            if (response.length === 0) {
              throw new Error(`L'utilisateur avec l'email ${membre.email} n'existe pas.`);
            }
            const userId = response[0].id;
            return {
              userId: userId,
              roleProjet: membre.roleProjet,
            };
          })
        );

        const projetData = {
          titre: formData.titre,
          description: formData.description,
          date_debut: formData.dateDebut,
          date_fin: formData.dateEcheance,
          membres: membres,
          chef_equipe: formData.chefEquipe,
        };

        if (formData.id) {
          await api.put(`projets/${formData.id}/`, projetData);
        } else {
          await api.post('projets/', projetData);
        }
        onSave(); // Appeler la fonction de rappel pour indiquer que l'enregistrement a réussi
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error.message);
      }
    } else {
      console.error('Formulaire non valide.');
    }
  };

  const validateForm = () => {
    const { titre, description, dateDebut, dateEcheance, chefEquipe, membres } = formData;
    const allRolesDefined = membres.every(membre => membre.roleProjet); // Vérifier que tous les rôles sont définis
    return titre && description && dateDebut && dateEcheance && chefEquipe && allRolesDefined;
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="add-project-page">
      <div className="page-content">
        <h2>{initialData ? 'Modifier le Projet' : 'Ajouter un Projet'}</h2>

        {/* Barre de progression */}
        <div className="progress-bar">
          <div className="progress-step" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
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
            </>
          )}

          {step === 2 && (
            <>
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
            </>
          )}

          {step === 3 && (
            <>
              <h3>Constitution de l'équipe</h3>
              <div className="form-group">
                <label htmlFor="chefEquipe">Chef d'équipe</label>
                <select
                  id="chefEquipe"
                  name="chefEquipe"
                  value={formData.chefEquipe}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir un chef d'équipe</option>
                  {formData.membres.map((membre, index) => (
                    <option key={index} value={membre.email}>
                      {membre.email}
                    </option>
                  ))}
                </select>
              </div>
              {formData.membres.map((membre, index) => (
                <div key={index} className="membre-section">
                  <div className="form-group">
                    <label htmlFor={`email-${index}`}>Email du membre</label>
                    <input
                      type="email"
                      id={`email-${index}`}
                      name="email"
                      value={membre.email}
                      onChange={(e) => handleMembreChange(index, e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`role-${index}`}>Rôle du membre</label>
                    <input
                      type="text"
                      id={`role-${index}`}
                      name="roleProjet" 
                      value={membre.roleProjet} // Utiliser membre.roleProjet
                      onChange={(e) => handleMembreChange(index, e)} // Utiliser le même gestionnaire de changement
                      required
                    />
                  </div>
                </div>
              ))}
              <button type="button" className="btn-add-membre" onClick={addMembre}>
                Ajouter un membre
              </button>
            </>
          )}

          <div className="page-actions">
            {step > 1 && (
              <button type="button" className="btn-previous" onClick={prevStep}>
                Précédent
              </button>
            )}
            {step < 3 ? (
              <button type="button" className="btn-next" onClick={nextStep}>
                Suivant
              </button>
            ) : (
              <button type="submit" className="btn-submit">
                {initialData ? 'Mettre à jour le projet' : 'Créer le projet'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
