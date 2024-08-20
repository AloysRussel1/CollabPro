// src/pages/ServicesPage.jsx
import React from 'react';
import Sidebar from './../components/Sidebar';
import './../assets/Css/pagesCss/ServicesPage.css'; // Assurez-vous d'ajouter les styles appropriés

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Sidebar />
      <div className="services-content">
        {/* Contenu spécifique à chaque élément sélectionné dans la sidebar */}
      </div>
    </div>
  );
};

export default ServicesPage;
