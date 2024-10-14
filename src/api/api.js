// src/api/api.js
import axios from 'axios';

// Crée une instance d'Axios avec une configuration par défaut
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // URL de base de l'API
    timeout: 10000, // Délai d'attente (10 secondes)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur de requêtes (facultatif)
api.interceptors.request.use(
    (config) => {
        // Tu peux ajouter des en-têtes d'authentification ou d'autres logiques ici si nécessaire
        return config;
    },
    (error) => {
        // Gère les erreurs de requête
        return Promise.reject(error);
    }
);

// Intercepteur de réponses (facultatif)
api.interceptors.response.use(
    (response) => {
        return response.data; // Retourne directement les données de la réponse
    },
    (error) => {
        // Gère les erreurs de réponse
        return Promise.reject(error);
    }
);

export default api;
