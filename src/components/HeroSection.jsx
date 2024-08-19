// src/components/HeroSection.jsx
import './../assets/Css/componentsCss/HeroSection.css';
import { FaArrowDown } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Bienvenue sur CollabPro</h1>
        <p>Optimisez la gestion de vos tâches collaboratives avec notre plateforme innovante.</p>
        <a href="#features" className="cta-button">Découvrez les fonctionnalités</a>
        <div className="scroll-down">
          <FaArrowDown />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
