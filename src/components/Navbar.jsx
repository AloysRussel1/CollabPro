// src/components/Navbar.jsx
import './../assets/Css/componentsCss/Navbar.css';
import { 
  FaInfoCircle, FaHome, FaEnvelope, 
  FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaUser, FaTools, FaClipboardList
} from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav>
      <div className="logo">CollabPro</div>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="/"><FaHome /> Accueil</a></li>
        <li><a href="/services"><FaTools /> Services</a></li>
        <li><a href="/announcements"><FaClipboardList /> Annonces</a></li>
        <li><a href="/about"><FaInfoCircle /> À propos</a></li>
        <li><a href="/contact"><FaEnvelope /> Contact</a></li>
        <li className="dropdown">
          <a href="#user" className="cta"><FaUser /> Compte</a>
          <ul className="dropdown-menu">
            <li><a href="/signin"><FaSignInAlt /> Sign In</a></li>
            <li><a href="/register"><FaUserPlus /> Register</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
