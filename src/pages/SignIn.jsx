// src/components/SignIn.jsx
import './../assets/Css/pagesCss/AuthForms.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assurez-vous que React Router est configuré

const SignIn = () => {
  return (
    <div className="form-container">
      <h2>Se connecter</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username"><FaUser /> Nom d'utilisateur</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password"><FaLock /> Mot de passe</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Se connecter</button>
        <div className="form-footer">
          <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
