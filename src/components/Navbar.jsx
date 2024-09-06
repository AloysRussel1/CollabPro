import './../assets/Css/componentsCss/Navbar.css';
import { 
  FaInfoCircle, FaHome, FaEnvelope, 
  FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaUser, FaTools, FaClipboardList
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './../assets/images/logo.png'; // Remplacez par le chemin correct de votre logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour savoir si l'utilisateur est connecté
  const location = useLocation();

  // Déterminer si nous sommes sur les pages de connexion ou d'inscription
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/register';

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté (vérification du token, par exemple)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); 
    }
  }, []);

  if (isAuthPage) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Logique de déconnexion (supprimer le token, rediriger, etc.)
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="logo">CollabPro</div>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="/"><FaHome /> Accueil</a></li>
        <li><a href="/services"><FaTools /> Services</a></li>
        <li><a href="/announcements"><FaClipboardList /> Annonces</a></li>
        <li><a href="/about"><FaInfoCircle /> À propos</a></li>
        <li><a href="/contact"><FaEnvelope /> Contact</a></li>

        {/* Si l'utilisateur est connecté, afficher son profil */}
        {isLoggedIn ? (
          <li className="dropdown">
            <a href="/profile" className="cta"><FaUser /> Profil</a>
            <ul className="dropdown-menu">
              <li><a href="/profile"><FaUser /> Mon Profil</a></li>
              <li><a href="#" onClick={handleLogout}><FaSignInAlt /> Déconnexion</a></li>
            </ul>
          </li>
        ) : (
          // Si l'utilisateur n'est pas connecté, afficher les options Sign In / Register
          <li className="dropdown">
            <a href="#user" className="cta"><FaUser /> Compte</a>
            <ul className="dropdown-menu">
              <li><a href="/signin"><FaSignInAlt /> Sign In</a></li>
              <li><a href="/register"><FaUserPlus /> Register</a></li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
