import React from 'react';
import './../assets/Css/pagesCss/AboutPage.css';
import historyImage from './../assets/images/ourStory.png'; // Assurez-vous que le chemin est correct
import member1 from './../assets/images/member1.png';
import member2 from './../assets/images/member2.png';

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>À Propos de Nous</h1>
        <p>Découvrez notre histoire et nos valeurs.</p>
      </header>

      <section className="about-story">
        <img src={historyImage} alt="Notre Histoire" className="about-story-image" />
        <div className="about-story-text">
          <h2>Notre Histoire</h2>
          <p>
            Depuis notre création en 2020, nous avons consacré notre énergie à offrir des solutions innovantes
            pour améliorer la vie de nos clients. Nous sommes fiers de notre parcours, des défis relevés et des
            réussites obtenues grâce à notre passion et notre expertise.
          </p>
        </div>
      </section>

      <section className="team">
        <h2>Notre Équipe</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={member1} alt="Membre de l'équipe 1" />
            <h3>John Doe</h3>
            <p>CEO et Fondateur</p>
          </div>
          <div className="team-member">
            <img src={member2} alt="Membre de l'équipe 2" />
            <h3>Jane Smith</h3>
            <p>Directrice Marketing</p>
          </div>
        </div>
      </section>

      <section className="mission">
        <h2>Notre Mission</h2>
        <p>
          Notre mission est de transformer les défis en opportunités, en offrant des solutions sur mesure qui répondent
          aux besoins de nos clients tout en favorisant l'innovation et la durabilité.
        </p>
      </section>

      <section className="cta">
        <h2>Rejoignez-Nous</h2>
        <p>Nous sommes toujours à la recherche de talents passionnés. Contactez-nous pour en savoir plus sur les opportunités.</p>
        <a href="/contact" className="cta-button">Nous Contacter</a>
      </section>
    </div>
  );
};

export default AboutPage;
