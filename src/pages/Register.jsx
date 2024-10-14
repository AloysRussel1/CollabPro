import React, { useState } from 'react';
import api from './../api/api.js';
import './../assets/Css/pagesCss/Register.css';

const Register = () => {
  // État pour stocker les informations d'inscription
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
  });

  // État pour gérer les erreurs et le succès
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    setError(null); // Réinitialiser les erreurs
    setSuccess(false); // Réinitialiser le succès

    try {
      const response = await api.post('users/', formData); // Utiliser l'instance axios
      if (response) {
        setSuccess(true); // Indiquer que l'inscription a réussi
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.'); // Alerte de succès
        setFormData({ nom: '', email: '', motDePasse: '' }); // Réinitialiser le formulaire
      }
    } catch (error) {
      setError('Une erreur est survenue lors de l\'inscription.'); // Gérer les erreurs
      alert('Échec de l\'inscription.'); // Alerte d'échec
    }
  };

  // Redirection vers Google et Facebook
  const handleSocialLogin = (platform) => {
    if (platform === 'google') {
      window.location.href = 'https://accounts.google.com/signin'; // Lien vers Google Sign In
    } else if (platform === 'facebook') {
      window.location.href = 'https://www.facebook.com/login'; // Lien vers Facebook Login
    }
  };

  return (
    <div className="custom-signup-page">
      <div className="custom-signup-container">
        <div className="custom-welcome-section">
          <div className="custom-welcome-text">
            <h2>Join Us!</h2>
            <p>Create an account to start your journey</p>
          </div>
        </div>
        <div className="custom-signup-section">
          <h2>Sign Up</h2>
          <p>Fill in the details to create your account</p>
          {error && <p className="error-message">{error}</p>} {/* Afficher les erreurs */}
          {success && <p className="success-message">Inscription réussie ! Vous pouvez maintenant vous connecter.</p>} {/* Afficher le message de succès */}
          <form className="custom-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nom"
              placeholder="Full Name"
              className="custom-input"
              value={formData.nom}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="custom-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="motDePasse"
              placeholder="Password"
              className="custom-input"
              value={formData.motDePasse}
              onChange={handleChange}
              required
            />
            <button type="submit" className="custom-btn">SIGN UP</button>
          </form>
          <p className="custom-alt-action">
            Already have an account? <a href="/signin" className="alt-link">Sign in here</a>
          </p>
          <p className="custom-social-text">or Connect with Social Media</p>
          <div className="custom-social-buttons">
            <button className="custom-google-btn" onClick={() => handleSocialLogin('google')}>Sign Up With Google</button>
            <button className="custom-facebook-btn" onClick={() => handleSocialLogin('facebook')}>Sign Up With Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
