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
        <p>Découvrez notre histoire et ce qui nous rend uniques.</p>
      </header>

      <section className="about-story">
        <div className="about-story-content">
          <div className="about-story-text">
            <h2>Notre Histoire</h2>
            <p>
              Depuis notre création en 2020, nous nous engageons à fournir des solutions innovantes
              pour améliorer la vie de nos clients. Notre parcours est marqué par des défis passionnants
              et des réussites qui témoignent de notre dévouement et de notre expertise.
            </p>
          </div>
          <img src={historyImage} alt="Notre Histoire" className="about-story-image" />
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
          {/* Ajoutez plus de membres de l'équipe si nécessaire */}
        </div>
      </section>

      <section className="testimonials">
        <h2>Avis Clients</h2>
        <div className="testimonials-content">
          <blockquote>
            <p>"Un service impeccable! Leur engagement et leur professionnalisme sont inégalés."</p>
            <footer>- Client Heureux</footer>
          </blockquote>
          <blockquote>
            <p>"Nous avons été impressionnés par la qualité et la rapidité de leur travail."</p>
            <footer>- Partenaire Satisfait</footer>
          </blockquote>
        </div>
      </section>

      <section className="cta">
        <h2>Rejoignez-Nous</h2>
        <p>Envie de travailler avec nous ou d'en savoir plus? Contactez-nous dès aujourd'hui!</p>
        <a href="/contact" className="cta-button">Contactez-Nous</a>
      </section>
    </div>
  );
};

export default AboutPage;
