// src/components/Footer.jsx
import './../assets/Css/componentsCss/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import logo from './../assets/images/logo.png'; // Assurez-vous que le chemin d'accès est correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column footer-logo">
        {/* <img src={logo} alt="CollabPro Logo" /> */}
        <div className="logo">CollabPro</div>
        <p>Votre plateforme de gestion des tâches collaborative.</p>
      </div>
      <div className="footer-column">
        <h3>Contact</h3>
        <a href="mailto:aloysrussel1@gmail.com">aloysrussel1@gmail.com</a>
        <a href="tel">+237 698 824 068</a>
      </div>
      <div className="footer-column">
        <h3>Liens utiles</h3>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
        <a href="#terms">Conditions d'utilisation</a>
      </div>
      <div className="footer-column">
        <h3>Suivez-nous</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
