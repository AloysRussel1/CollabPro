import React, { useState } from 'react';
import './../assets/Css/pagesCss/Configuration.css';

const Configuration = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('fr');

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotifications(!notifications);
  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <div className="settings-container">
      <h1 className="settings-title">Paramètres</h1>

      <div className="settings-section">
        <h2>Apparence</h2>
        <div className="settings-item">
          <div className="settings-item-label">Mode sombre</div>
          <div className="settings-item-control">
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-item">
          <div className="settings-item-label">Activer les notifications par e-mail</div>
          <div className="settings-item-control">
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={toggleNotifications}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>Préférences</h2>
        <div className="settings-item">
          <div className="settings-item-label">Langue de l'application</div>
          <div className="settings-item-control">
            <div className="language-selector">
              <button
                className={`language-button ${language === 'fr' ? 'active' : ''}`}
                onClick={() => changeLanguage('fr')}
              >
                Français
              </button>
              <button
                className={`language-button ${language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                Anglais
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
