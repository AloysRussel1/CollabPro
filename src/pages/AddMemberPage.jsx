import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api'; // Votre configuration axios
import './../assets/Css/pagesCss/AddMemberPage.css';

const AddMemberPage = () => {
    const [members, setMembers] = useState([]); // Liste des membres ajoutés
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { projectId } = useParams(); 

    // Fonction pour ajouter un membre dans la liste
    const addMember = () => {
        setMembers([...members, { email: '', roleProjet: '' }]);
    };

    // Fonction pour gérer le changement des champs de membre
    const handleMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMembers = members.map((membre, i) =>
            i === index ? { ...membre, [name]: value } : membre
        );
        setMembers(updatedMembers);
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
    
        // Filtrer les membres avec des champs non vides
        const validMembers = members.filter(
            (membre) => membre.email.trim() !== '' && membre.roleProjet.trim() !== ''
        );
    
        if (validMembers.length === 0) {
            setError('Veuillez remplir les champs pour au moins un membre.');
            return;
        }
    
        try {
            // Envoi de la requête avec tous les membres valides en une seule fois
            const response = await api.post(`/projets/${projectId}/ajouter-membre/`, {
                membres: validMembers // Envoie le tableau de membres
            });
    
            if (response.status !== 201) {
                throw new Error('Erreur lors de l\'ajout des membres.');
            }
    
            // Redirection après succès
            navigate(`/services/projects/equipes`);
        } catch (error) {
            console.error('Erreur lors de l\'ajout des membres:', error);
            setError('Erreur lors de l\'ajout des membres.');
        }
    };
    
    return (
        <div className="add-member-container">
            <h1 className="add-member-title">Ajouter un membre</h1>

            {error && <p className="error-message">{error}</p>}

            <form className="add-member-form" onSubmit={handleAddMember}>
                {members.map((membre, index) => (
                    <div key={index} className="membre-section">
                        <div className="form-group">
                            <label htmlFor={`email-${index}`}>Email du membre</label>
                            <input
                                type="email"
                                id={`email-${index}`}
                                name="email"
                                value={membre.email}
                                onChange={(e) => handleMemberChange(index, e)}
                                placeholder="Entrez l'email du membre"
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
                                onChange={(e) => handleMemberChange(index, e)}
                                placeholder="Entrez le rôle du membre"
                                required
                            />
                        </div>
                    </div>
                ))}

                <button type="button" className="btn-add-membre" onClick={addMember}>
                    Ajouter un autre membre
                </button>

                <button type="submit" className="btn-submit">
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default AddMemberPage;
