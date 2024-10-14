// src/pages/AnnonceDetailPage.jsx
import React from 'react';
import './../assets/Css/pagesCss/AnnonceDetailPage.css';
import { useParams } from 'react-router-dom';

const AnnonceDetailPage = () => {
  // Récupérer l'ID de l'annonce à partir des paramètres de l'URL
  const { id } = useParams();

  // Exemple de données d'annonce (vous pourriez les récupérer d'une API)
  const annonces = [
    {
      id: '1',
      title: 'Besoin de Collaboration sur un Projet de Développement Web',
      description: 'Nous cherchons un développeur web pour un projet de refonte de site. Expertise en React requise. Contactez-nous si intéressé.',
      image: 'path/to/your/image1.png',
    },
    {
      id: '2',
      title: 'Offre de Service de Gestion d\'Événements',
      description: 'Nous offrons des services de gestion pour vos conférences et ateliers. Contactez-nous pour en discuter.',
      image: 'path/to/your/image2.png',
    },
    {
      id: '3',
      title: 'Opportunité de Partenariat pour Startups',
      description: 'Recherchons des startups pour des partenariats stratégiques. Si intéressé, contactez-nous pour plus d\'infos.',
      image: 'path/to/your/image3.png',
    },
  ];

  // Trouver l'annonce correspondante par ID
  const annonce = annonces.find((a) => a.id === id);

  return (
    <div className="annonce-detail-page">
      {annonce ? (
        <>
          <header className="detail-header">
            <h1>{annonce.title}</h1>
          </header>

          <section className="detail-content">
            <img src={annonce.image} alt={annonce.title} />
            <p>{annonce.description}</p>
          </section>

          <section className="cta">
            <h2>Contactez-nous</h2>
            <p>Intéressé par cette annonce? Contactez-nous pour plus d'informations.</p>
            <button className="contact-button">Contactez</button>
          </section>
        </>
      ) : (
        <p>Aucune annonce trouvée.</p>
      )}
    </div>
  );
};

export default AnnonceDetailPage;
