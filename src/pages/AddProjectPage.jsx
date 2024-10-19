import React, { useState, useEffect } from 'react';
import api from './../api/api.js'; 
import './../assets/Css/pagesCss/AddProjectPage.css';

const AddProjectPage = ({ initialData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: '',
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    membres: [],
    chef_equipe: '', 
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        titre: initialData.titre || '',
        description: initialData.description || '',
        date_debut: initialData.date_debut || '',
        date_fin: initialData.date_fin || '',
        membres: initialData.membres || [],
        chef_equipe: initialData.chef_equipe || '',
      });
      console.log("Initial data loaded:", initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("Field changed:", name, value);
  };

  const addMembre = () => {
    setFormData({
      ...formData,
      membres: [...formData.membres, { email: '', roleProjet: '' }],
    });
    console.log("Membre added:", formData.membres);
  };

  const handleMembreChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembres = formData.membres.map((membre, i) =>
      i === index ? { ...membre, [name]: value } : membre
    );
    setFormData({ ...formData, membres: updatedMembres });
    console.log("Membre updated:", updatedMembres);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted, validating...");

    if (validateForm()) {
      try {
        console.log("Form is valid, preparing data...");

        // Récupération des IDs des membres
        const membresWithIds = await Promise.all(
          formData.membres.map(async (membre) => {
            console.log("Fetching user by email:", membre.email);
            const response = await api.get(`users?email=${membre.email}`);
            console.log("User fetch response:", response);

            response.forEach(user => {
              user.email === membre.email ? membre.id = user.id : null;
            });
            return membre; // Retourner le membre mis à jour
          })
        );
        console.log("Membres with IDs:", membresWithIds);

        // Récupération de l'ID du chef d'équipe
        console.log("Fetching chef d'équipe by email:", formData.chef_equipe);
        const chefEquipeResponse = await api.get(`users?email=${formData.chef_equipe}`);
        console.log("Chef d'équipe fetch response:", chefEquipeResponse);

        if (chefEquipeResponse.length === 0) {
          throw new Error(`Le chef d'équipe avec l'email ${formData.chef_equipe} n'existe pas.`);
        }
        const chefEquipeId = chefEquipeResponse[0].id;

        // Création de l'objet projet
        const projetData = {
          titre: formData.titre,
          description: formData.description,
          date_debut: formData.date_debut,
          date_fin: formData.date_fin,
          membres: membresWithIds, // Utilisez les membres avec IDs
          chef_equipe: chefEquipeId,
        };

        console.log("Final project data:", projetData);

        // Envoi des données au serveur
        if (formData.id) {
          let containmembernull = false;
          projetData.membres.forEach(membre => {
            if (membre.id === null) {
              containmembernull = true;
            }
          });
          containmembernull ? alert("Veuillez renseigner tous les champs du membre") : await api.put(`projets/${formData.id}/`, projetData);
          console.log("Projet mis à jour:", projetData);
        } else {
          await api.post('projets/', projetData);
          console.log("Projet créé:", projetData);
        }
        onSave(); // Appel de la fonction pour indiquer que l'enregistrement est réussi
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error.message);
        console.error('Détails de l\'erreur:', error);
      }
    } else {
      console.error('Formulaire non valide.');
    }
  };

  const validateForm = () => {
    const { titre, description, date_debut, date_fin, chef_equipe, membres } = formData;
    const allRolesDefined = membres.every(membre => membre.roleProjet);
    const isValid = titre && description && date_debut && date_fin && chef_equipe && allRolesDefined;
    console.log("Form validation result:", isValid);
    return isValid;
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const onSave = () => {
    console.log('Projet sauvegardé avec succès!');
  };

  return (
    <div className="add-project-page">
      <div className="page-content">
        <h2>{initialData ? 'Modifier le Projet' : 'Ajouter un Projet'}</h2>
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
                <label htmlFor="date_debut">Date de Début</label>
                <input
                  type="date"
                  id="date_debut"
                  name="date_debut"
                  value={formData.date_debut}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date_fin">Date d'Échéance</label>
                <input
                  type="date"
                  id="date_fin"
                  name="date_fin"
                  value={formData.date_fin}
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
                <label htmlFor="chef_equipe">Chef d'équipe</label>
                <select
                  id="chef_equipe"
                  name="chef_equipe"
                  value={formData.chef_equipe}
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
                      value={membre.roleProjet}
                      onChange={(e) => handleMembreChange(index, e)}
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
                {initialData ? 'Mettre à jour' : 'Ajouter'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
