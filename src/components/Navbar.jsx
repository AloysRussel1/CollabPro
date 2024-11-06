import './../assets/Css/componentsCss/Navbar.css';
import { 
  FaInfoCircle, FaHome, FaEnvelope, 
  FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaUser, FaTools, FaClipboardList
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './../assets/images/logo1.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour savoir si l'utilisateur est connecté
  const location = useLocation();

  // Déterminer si nous sommes sur les pages de connexion ou d'inscription
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/register' || location.pathname === '/profile';

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté (vérification de l'accessToken)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true); 
    }

    // Écouter l'événement de changement de connexion
    const handleLoginStatusChange = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token); // Mettre à jour l'état en fonction de l'existence du token
    };

    // Ajouter un event listener pour l'événement personnalisé
    window.addEventListener('loginStatusChanged', handleLoginStatusChange);

    // Nettoyer l'event listener lors du démontage du composant
    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, []);

  if (isAuthPage) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Logique de déconnexion (supprimer les tokens, rediriger, etc.)
    localStorage.clear();
    setIsLoggedIn(false);
    
    // Déclencher l'événement personnalisé pour informer les autres composants du changement de statut de connexion
    window.dispatchEvent(new Event('loginStatusChanged'));

    // Rediriger l'utilisateur vers la page d'accueil après la déconnexion (optionnel)
    window.location.href = '/';
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

        {/* Si l'utilisateur est connecté, afficher son profil et l'option de déconnexion */}
        {isLoggedIn ? (
          <li className="dropdown">
            <a href="" className="cta"><FaUser /> Profil</a>
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
              <li><a href="/signin"><FaSignInAlt />Connexion</a></li>
              <li><a href="/register"><FaUserPlus /> Inscription</a></li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
