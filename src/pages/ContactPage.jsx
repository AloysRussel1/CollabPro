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
        <p><strong>Adresse :</strong> Medong, Yaounde</p>
        <p><strong>Téléphone :</strong> +237 698 824 068</p>
        <p><strong>E-mail :</strong> aloysrussel1@gmail.com</p>
        <p><strong>Horaires d'ouverture :</strong> Lundi - Vendredi, 9h - 18h</p>
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
