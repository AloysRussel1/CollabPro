// src/pages/AnnoncePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './../assets/Css/pagesCss/AnnoncePage.css';
import annonce1 from './../assets/images/collaboration.png'; 
import annonce2 from './../assets/images/conference.png';
import annonce3 from './../assets/images/partenariat.png'; 

const AnnoncePage = () => {
  const navigate = useNavigate(); // Initialiser useNavigate

  // Fonction pour gérer la navigation
  const handleViewDetails = (id) => {
    navigate(`/annonce/${id}`); 
  };

  return (
    <div className="annonce-page">
      <header className="annonce-header">
        <h1>Annonces</h1>
        <p>Explorez nos annonces pour trouver des opportunités de collaboration, des offres de service et plus encore.</p>
      </header>

      <section className="search-filters">
        <input type="text" placeholder="Rechercher des annonces..." />
        <button className="search-button">Rechercher</button>
      </section>

      <section className="annonce-list">
        <div className="annonce-item">
          <img src={annonce1} alt="Annonce de Collaboration" />
          <h2>Besoin de Collaboration sur un Projet de Développement Web</h2>
          <p>Nous cherchons un développeur web pour un projet de refonte de site. Expertise en React requise. Contactez-nous si intéressé.</p>
          <button className="view-details-button" onClick={() => handleViewDetails(1)}>Voir Détails</button>
        </div>
        <div className="annonce-item">
          <img src={annonce2} alt="Annonce de Service" />
          <h2>Offre de Service de Gestion d'Événements</h2>
          <p>Nous offrons des services de gestion pour vos conférences et ateliers. Contactez-nous pour en discuter.</p>
          <button className="view-details-button" onClick={() => handleViewDetails(2)}>Voir Détails</button>
        </div>
        <div className="annonce-item">
          <img src={annonce3} alt="Annonce de Partenariat" />
          <h2>Opportunité de Partenariat pour Startups</h2>
          <p>Recherchons des startups pour des partenariats stratégiques. Si intéressé, contactez-nous pour plus d'infos.</p>
          <button className="view-details-button" onClick={() => handleViewDetails(3)}>Voir Détails</button>
        </div>
      </section>

      <section className="cta2">
        <h2>Publiez Votre Annonce</h2>
        <p>Vous avez quelque chose à offrir ou une opportunité de collaboration? Publiez une annonce dès maintenant!</p>
        <a href="/post-annonce" className="cta2-button">Publier une Annonce</a>
      </section>
    </div>
  );
};

export default AnnoncePage;
