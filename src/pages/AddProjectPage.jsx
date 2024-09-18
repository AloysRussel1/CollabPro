import React, { useState, useEffect } from 'react';
import './../assets/Css/pagesCss/AddProjectPage.css';

// Simuler les données des membres enregistrés (exemple)
const membersData = [
  { id: 1, name: 'Alice Smith' },
  { id: 2, name: 'Bob Johnson' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'David Wilson' },
  { id: 5, name: 'Eve Davis' },
];

const AddProjectPage = ({ onSave, initialData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: '',
    titre: '',
    description: '',
    dateDebut: '',
    dateEcheance: '',
    priorite: '',
    membres: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        membres: initialData.membres || [], // Assurez-vous que membres est défini comme un tableau
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
      membres: [
        ...formData.membres,
        { membreId: '', tache: '', dateEcheanceTache: '', descriptionTache: '' },
      ],
    });
  };

  const handleMembreChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembres = formData.membres.map((membre, i) =>
      i === index ? { ...membre, [name]: value } : membre
    );
    setFormData({ ...formData, membres: updatedMembres });
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
            </>
          )}

          {step === 3 && (
            <>
              <h3>Constitution de l'équipe</h3>
              {formData.membres.map((membre, index) => (
                <div key={index} className="membre-section">
                  <div className="form-group">
                    <label htmlFor={`membreId-${index}`}>Sélectionner le membre</label>
                    <select
                      id={`membreId-${index}`}
                      name="membreId"
                      value={membre.membreId}
                      onChange={(e) => handleMembreChange(index, e)}
                      required
                    >
                      <option value="">Choisir un membre</option>
                      {membersData.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor={`tache-${index}`}>Titre de la tâche</label>
                    <input
                      type="text"
                      id={`tache-${index}`}
                      name="tache"
                      value={membre.tache}
                      onChange={(e) => handleMembreChange(index, e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`descriptionTache-${index}`}>
                      Description de la tâche
                    </label>
                    <textarea
                      id={`descriptionTache-${index}`}
                      name="descriptionTache"
                      value={membre.descriptionTache}
                      onChange={(e) => handleMembreChange(index, e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`dateEcheanceTache-${index}`}>
                      Date d'Échéance de la tâche
                    </label>
                    <input
                      type="date"
                      id={`dateEcheanceTache-${index}`}
                      name="dateEcheanceTache"
                      value={membre.dateEcheanceTache}
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
              <button type="submit" className="btn-save">
                {initialData ? 'Modifier' : 'Enregistrer'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectPage;
