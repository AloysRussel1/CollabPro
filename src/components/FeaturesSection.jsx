import './../assets/Css/componentsCss/FeaturesSection.css';
import { FaCheckCircle, FaUsers, FaCalendarAlt, FaChartLine, FaMobileAlt } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section className="features">
      <div className="features-content">
        <h2>Nos Fonctionnalités</h2>
        <div className="feature-items">
          <div className="feature-item">
            <FaCheckCircle className="feature-icon" />
            <h3>Gestion Simplifiée</h3>
            <p>Optimisez la gestion de vos tâches avec notre interface intuitive.</p>
          </div>
          <div className="feature-item">
            <FaUsers className="feature-icon" />
            <h3>Collaboration en Temps Réel</h3>
            <p>Collaborez avec votre équipe en temps réel grâce à nos outils puissants.</p>
          </div>
          <div className="feature-item">
            <FaCalendarAlt className="feature-icon" />
            <h3>Planification Efficace</h3>
            <p>Planifiez et suivez vos tâches et projets avec une vue d'ensemble claire.</p>
          </div>
          <div className="feature-item">
            <FaChartLine className="feature-icon" />
            <h3>Analyse de Données</h3>
            <p>Obtenez des insights précieux grâce à nos outils d'analyse avancés.</p>
          </div>
          <div className="feature-item">
            <FaMobileAlt className="feature-icon" />
            <h3>Accessibilité Mobile</h3>
            <p>Accédez à toutes les fonctionnalités depuis n'importe quel appareil mobile.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
