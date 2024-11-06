// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import './../assets/Css/pagesCss/UserProfile.css';
import api from '../api/api';
import BackButton from '../components/BackButton';


import defaultProfileImage from '../assets/images/profil.jpg';

const UserProfile = () => {
    const [userData, setUserData] = useState(null); // État pour stocker les données de l'utilisateur
    const [userProjects, setUserProjects] = useState([]); // État pour stocker les projets de l'utilisateur
    const [loading, setLoading] = useState(true); // État de chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    useEffect(() => {
        // Fonction pour récupérer les informations de l'utilisateur
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('user/profile/'); // Requête vers l'API pour le profil
                setUserData(response.data); // Mise à jour de l'état avec les données de l'utilisateur

                // Récupérer les projets de l'utilisateur
                const projectsResponse = await api.get(`user/${response.data.id}/projets/`); // Requête vers l'API pour les projets
                setUserProjects(projectsResponse.data); // Mise à jour de l'état avec les projets
            } catch (error) {
                setError("Impossible de récupérer les informations de l'utilisateur.");
                console.error("Erreur lors de la récupération du profil utilisateur :", error);
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchUserProfile();
    }, []);

    // Affichage de chargement
    if (loading) return <p>Chargement des informations...</p>;

    // Affichage d'erreur
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            <BackButton />
            <h2> Mon Profil</h2>
            {userData && (
                <div className="user-details">
                    <div className="profile-image">
                        <img src={userData.profileImage || defaultProfileImage} alt="Profile" />
                    </div>
                    <p><strong>Nom :</strong> {userData.nom}</p>
                    <p><strong>Email :</strong> {userData.email}</p>
                    <p><strong>Rôle :</strong> {userData.role}</p>
                    <p><strong>Adresse :</strong> {userData.adresse || 'Non spécifiée'}</p>
                    <p><strong>Téléphone :</strong> {userData.telephone || 'Non spécifié'}</p>
                </div>
            )}
            <div className="profile-actions">
                <button className="profile-button">Modifier le Profil</button>
                <button className="profile-button">Déconnexion</button>
            </div>
            <div className="user-history">
                <h3>Projets Récents</h3>
                <ul>
                    {userProjects.length > 0 ? (
                        userProjects.map((project) => (
                            <li key={project.id} className="project-item">
                            <span className="project-title">{project.titre}</span>
                            <span className="project-status">{project.statut}</span>
                        </li>
                        ))
                    ) : (
                        <li>Aucun projet récent.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserProfile;
