import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../api/api.js';  // Assurez-vous que votre instance Axios est correctement configurée
import './../assets/Css/pagesCss/SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Envoyer une requête POST pour obtenir le token JWT
      const response = await api.post('/token/', formData);
      const { access, refresh } = response.data;
      // Stocker le token JWT (access token)
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      console.log('Token JWT stocké:', access);
      navigate('/services/dashboard');
    } catch (err) {
      setError('Identifiants invalides. Veuillez réessayer.');
    }
  };

  return (
    <div className="custom-login-page">
      <div className="custom-login-container">
        <div className="custom-welcome-section">
          <div className="custom-welcome-text">
            <h2>Bienvenue de retour !</h2>
            <p>Connectez-vous pour continuer et accéder à votre compte</p>
          </div>
        </div>
        <div className="custom-signin-section">
          <h2>Connexion</h2>
          <p>Veuillez entrer vos identifiants pour vous connecter</p>
          {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>} {/* Afficher l'erreur */}
          <form className="custom-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              className="custom-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="custom-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="custom-btn">CONTINUER</button>
          </form>
          <p className="custom-forgot-password">
            <a href="/forgot-password" className="forgot-link">Mot de passe oublié ?</a>
          </p>
          <p className="custom-alt-action">
            Vous n'avez pas de compte ? <a href="/register" className="alt-link">Inscrivez-vous ici</a>
          </p>
          <p className="custom-social-text">ou Connectez-vous via les réseaux sociaux</p>
          <div className="custom-social-buttons">
            <button className="custom-google-btn">Se connecter avec Google</button>
            <button className="custom-facebook-btn">Se connecter avec Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
