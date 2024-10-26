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

// Intercepteur pour ajouter le token d'accès à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Récupérer le token d'accès depuis le local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Ajouter le token dans l'en-tête Authorization
        }
        return config; // Retourner la configuration modifiée
    },
    (error) => {
        return Promise.reject(error); // Gérer les erreurs de la requête
    }
);

// Intercepteur pour gérer les réponses d'erreur
api.interceptors.response.use(
    (response) => {
        return response; // Retourner la réponse si tout va bien
    },
    async (error) => {
        const originalRequest = error.config; // Récupérer la requête d'origine

        // Vérifiez si l'erreur est due à un token expiré (exemple avec 401)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Marquer la requête comme ayant déjà été tentée

            // Appel à la fonction de rafraîchissement du token ici
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
                const { access } = response.data; // Récupérer le nouveau token d'accès

                // Stocker le nouveau token d'accès
                localStorage.setItem('accessToken', access);
                // Mettre à jour l'en-tête Authorization et réessayer la requête originale
                api.defaults.headers['Authorization'] = `Bearer ${access}`;
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return api(originalRequest); // Réessayer la requête avec le nouveau token
            } catch (err) {
                // Gérer l'erreur de rafraîchissement, par exemple en déconnectant l'utilisateur
                console.error('Échec du rafraîchissement du token', err);
                // Rediriger vers la page de connexion ou gérer comme nécessaire
            }
        }

        return Promise.reject(error); // Gérer toute autre erreur
    }
);

export default api;
