// src/components/Register.jsx
import './../assets/Css/pagesCss/AuthForms.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assurez-vous que React Router est configuré

const Register = () => {
  return (
    <div className="form-container">
      <h2>S'inscrire</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username"><FaUser /> Nom dutilisateur</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email"><FaEnvelope /> Adresse e-mail</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password"><FaLock /> Mot de passe</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password"><FaLock /> Confirmer le mot de passe</label>
          <input type="password" id="confirm-password" name="confirm-password" required />
        </div>
        <button type="submit">Sinscrire</button>
        <div className="form-footer">
          <p>Déjà un compte ? <Link to="/signin">Se connecter</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
