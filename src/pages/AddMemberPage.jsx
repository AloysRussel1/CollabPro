import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api'; // Votre configuration axios
import './../assets/Css/pagesCss/AddMemberPage.css';

const AddMemberPage = () => {
    console.log('AddMemberPage rendu');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { projectId } = useParams(); 
    console.log('projectId:', projectId);

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            if (!email || !role) {
                setError('Veuillez remplir tous les champs.');
                return;
            }

            const response = await api.post(`/projets/${projectId}/ajouter-membre`, { email, role });
            if (response.status === 201) {
                navigate(`/teams`); // Redirection vers la page Teams après l'ajout
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du membre:', error);
            setError('Erreur lors de l\'ajout du membre.');
        }
    };

    return (
        <div className="add-member-container">
            <h1 className="add-member-title">Ajouter un membre</h1>

            {error && <p className="error-message">{error}</p>}

            <form className="add-member-form" onSubmit={handleAddMember}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez l'email du membre"
                        className="input-field"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Rôle</label>
                    <input
                        type="text"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Entrez le rôle du membre"
                        className="input-field"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Ajouter le membre</button>
            </form>
        </div>
    );
};

export default AddMemberPage;
