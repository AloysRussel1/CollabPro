import React from 'react';
import './../assets/Css/pagesCss/SupportPage.css';
import { FaQuestionCircle, FaBook, FaPhoneAlt, FaVideo } from 'react-icons/fa';

const SupportPage = () => {
  return (
    <div className="support-container">
      <h1 className="support-title">Aide et Support</h1>

      {/* Section de liens rapides */}
      <div className="support-quick-links">
        <div className="support-link-card">
          <FaQuestionCircle className="support-icon" />
          <h2>FAQ</h2>
          <p>Consultez les questions fréquentes pour obtenir des réponses rapides.</p>
          <a href="#faq" className="support-link-button">Voir FAQ</a>
        </div>
        <div className="support-link-card">
          <FaBook className="support-icon" />
          <h2>Documentation</h2>
          <p>Explorez notre documentation pour une assistance plus détaillée.</p>
          <a href="#documentation" className="support-link-button">Accéder à la documentation</a>
        </div>
        <div className="support-link-card">
          <FaPhoneAlt className="support-icon" />
          <h2>Contacter le support</h2>
          <p>Besoin d'aide personnalisée ? Contactez notre équipe de support.</p>
          <a href="#contact" className="support-link-button">Contactez-nous</a>
        </div>
        <div className="support-link-card">
          <FaVideo className="support-icon" />
          <h2>Tutoriels vidéos</h2>
          <p>Regardez nos vidéos pour des démonstrations pas à pas.</p>
          <a href="#tutorials" className="support-link-button">Voir les tutoriels</a>
        </div>
      </div>

      {/* Section FAQ */}
      <div id="faq" className="support-section">
        <h2 className="section-title">Questions fréquentes</h2>
        <div className="faq-item">
          <h3>Comment réinitialiser mon mot de passe ?</h3>
          <p>Pour réinitialiser votre mot de passe, cliquez sur "Mot de passe oublié" sur la page de connexion et suivez les instructions envoyées par e-mail.</p>
        </div>
        <div className="faq-item">
          <h3>Comment modifier mes informations personnelles ?</h3>
          <p>Accédez à votre compte, puis allez dans la section "Paramètres" pour modifier vos informations personnelles.</p>
        </div>
        <div className="faq-item">
          <h3>Comment contacter le support technique ?</h3>
          <p>Vous pouvez nous contacter directement via la page de support ou appeler notre numéro d'assistance.</p>
        </div>
      </div>

      {/* Section Documentation */}
      <div id="documentation" className="support-section">
        <h2 className="section-title">Documentation</h2>
        <p>Consultez notre guide complet pour une meilleure compréhension de nos services.</p>
        <a href="/docs/user-guide" className="documentation-link">Voir le guide utilisateur</a>
      </div>

      {/* Section Contact du support */}
      <div id="contact" className="support-section">
        <h2 className="section-title">Contact du support</h2>
        <p>Vous pouvez nous contacter par téléphone ou par e-mail pour obtenir une assistance directe.</p>
        <p><strong>Téléphone :</strong> +237 698 824 068</p>
        <p><strong>Email :</strong> aloysrussel1@gmail.com</p>
      </div>

      {/* Section Tutoriels vidéos */}
      <div id="tutorials" className="support-section">
        <h2 className="section-title">Tutoriels vidéos</h2>
        <p>Regardez nos vidéos pour apprendre à utiliser nos services.</p>
        <div className="video-grid">
          <div className="video-item">
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/sample1" title="Tutoriel 1"></iframe>
            <p>Comment créer un compte</p>
          </div>
          <div className="video-item">
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/sample2" title="Tutoriel 2"></iframe>
            <p>Comment utiliser les paramètres avancés</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
