// src/components/HeroSection.jsx
import React from 'react';
import './../assets/Css/componentsCss/HeroSection.css';
import { FaArrowDown, FaSearch } from 'react-icons/fa';
import heroImage from './../assets/images/hero-img.png'; 

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="hero-content">
        <div className="text-section">
          <h1>Bienvenue sur CollabPro</h1>
          <p>Optimisez la gestion de vos tâches collaboratives avec notre plateforme innovante.</p>
          
          <div className="hero-search">
            <input type="text" placeholder="Recherchez des fonctionnalités..." />
            <button className="search-button"><FaSearch /></button>
          </div>
          
          <a href="#features" className="cta-button">Découvrez les fonctionnalités</a>
        </div>

        <div className="image-section">
          <img src={heroImage} alt="Hero Image" />
        </div>
      </div>
      
      <div className="scroll-down">
        <FaArrowDown />
      </div>
    </section>
  );
};

export default HeroSection;
