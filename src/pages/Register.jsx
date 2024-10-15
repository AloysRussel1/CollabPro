import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import api from './../api/api.js';
import './../assets/Css/pagesCss/Register.css';

const Register = () => {
  // Utiliser useNavigate pour la redirection
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}|:"<>?[\]\\;',./`~]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateEmail(formData.email)) {
      setError("L'adresse e-mail n'est pas valide.");
      return;
    }

    if (!validatePassword(formData.motDePasse)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, et un chiffre.');
      return;
    }

    try {
      const registrationData = {
        ...formData,
        role: 'user',
        messages_envoyes: [],
        messages_recus: [],
        annonces: [],
      };

      const response = await api.post('users/', registrationData);
      if (response) {
        setSuccess(true);
        alert('Inscription réussie ! Vous allez être redirigé vers la page de connexion.'); 
        setFormData({ nom: '', email: '', motDePasse: '' });

        // Rediriger vers la page de connexion après un court délai
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      }
    } catch (error) {
      setError("Une erreur est survenue lors de l'inscription.");
      alert("Échec de l'inscription.");
    }
  };

  const handleSocialLogin = (platform) => {
    if (platform === 'google') {
      window.location.href = 'https://accounts.google.com/signin';
    } else if (platform === 'facebook') {
      window.location.href = 'https://www.facebook.com/login';
    }
  };

  return (
    <div className="custom-signup-page">
      <div className="custom-signup-container">
        <div className="custom-welcome-section">
          <div className="custom-welcome-text">
            <h2>Rejoignez-nous !</h2>
            <p>Créez un compte pour commencer votre aventure</p>
          </div>
        </div>
        <div className="custom-signup-section">
          <h2>Inscription</h2>
          <p>Remplissez les informations pour créer votre compte</p>
          {error && <p className="error-message" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
          {success && <p className="success-message" style={{ color: 'green', fontWeight: 'bold' }}>Inscription réussie ! Vous allez être redirigé.</p>}
          <form className="custom-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nom"
              placeholder="Nom complet"
              className="custom-input"
              value={formData.nom}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              className="custom-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="motDePasse"
              placeholder="Mot de passe"
              className="custom-input"
              value={formData.motDePasse}
              onChange={handleChange}
              required
            />
            <button type="submit" className="custom-btn">S'inscrire</button>
          </form>
          <p className="custom-alt-action">
            Vous avez déjà un compte ? <a href="/signin" className="alt-link">Connectez-vous ici</a>
          </p>
          <p className="custom-social-text">ou Connectez-vous avec les réseaux sociaux</p>
          <div className="custom-social-buttons">
            <button className="custom-google-btn" onClick={() => handleSocialLogin('google')}>S'inscrire avec Google</button>
            <button className="custom-facebook-btn" onClick={() => handleSocialLogin('facebook')}>S'inscrire avec Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
