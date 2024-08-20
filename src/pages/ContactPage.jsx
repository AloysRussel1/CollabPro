// src/pages/ContactPage.jsx
import React from 'react';
import './../assets/Css/pagesCss/ContactPage.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import contactImage from './../assets/images/contactus.png'; // Import de l'image

const ContactPage = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contactez-nous</h1>
        <p>Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous contacter.</p>
      </header>
      <section className="contact-content">
        <div className="contact-image">
          <img src={contactImage} alt="Contact Us" />
        </div>
        <div className="contact-form">
          <h2>Formulaire de Contact</h2>
          <form>
            <label htmlFor="name">Nom Complet</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Adresse E-mail</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">Numéro de Téléphone (optionnel)</label>
            <input type="tel" id="phone" name="phone" />

            <label htmlFor="subject">Sujet</label>
            <input type="text" id="subject" name="subject" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit">Envoyer</button>
          </form>
        </div>
      </section>
      <section className="contact-info">
        <h2>Informations de Contact</h2>
        <p><strong>Adresse :</strong> 123 Rue de l'Exemple, Ville, Pays</p>
        <p><strong>Téléphone :</strong> +123 456 7890</p>
        <p><strong>E-mail :</strong> contact@example.com</p>
        <p><strong>Horaires d'ouverture :</strong> Lundi - Vendredi, 9h - 18h</p>
      </section>
      <section className="social-links">
        <h2>Suivez-nous</h2>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </section>
      <section className="featured-articles">
        <h2>Articles les Plus Lus</h2>
        <ul>
          <li><a href="/article-1">Article 1</a></li>
          <li><a href="/article-2">Article 2</a></li>
          <li><a href="/article-3">Article 3</a></li>
        </ul>
      </section>
      <section className="testimonials">
        <h2>Témoignages Clients</h2>
        <blockquote>
          <p>"Un excellent service et une équipe très professionnelle. Je recommande vivement!"</p>
          <footer>- Client Satisfait</footer>
        </blockquote>
      </section>
    </div>
  );
};

export default ContactPage;
