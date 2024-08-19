// src/components/FeaturesSection.jsx
import './../assets/Css/componentsCss/FeaturesSection.css';
import { FaCheckCircle, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section className="features">
      <div className="features-content">
        <h2>Nos Fonctionnalités</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <FaCheckCircle className="feature-icon" />
            <h3>Gestion Simplifiée</h3>
            <p>Optimisez la gestion de vos tâches avec notre interface intuitive.</p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Collaboration en Temps Réel</h3>
            <p>Collaborez avec votre équipe en temps réel grâce à nos outils puissants.</p>
          </div>
          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Planification Efficace</h3>
            <p>Planifiez et suivez vos tâches et projets avec une vue d'ensemble claire.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
