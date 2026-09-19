import axios from 'axios';

const isProduction = import.meta.env.PROD.valueOf();

const API_URL = isProduction
  ? 'http://ingeni.hd.free.fr/mypiggybank'
  : 'http://localhost/appliconges';



// Création de l'instance Axios
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Timeout de 10 secondes
});

// Intercepteur pour ajouter le token à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.data += "&token=" + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs globales
apiClient.interceptors.response.use(
  (response) => {
    if (response.data.status == "KO") {
      alert("Erreur:" + response.data.message);
      window.location.href = `${import.meta.env.BASE_URL}login`;
      return response;
    } else {
      return response;
    }


  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Exemple : Gérer la déconnexion pour inactivité (status 401)
      if (status === 401) {
        localStorage.removeItem('token'); // Supprimer le token
        window.location.href = '/'; // Rediriger vers la page de connexion
      }

      // Autres erreurs génériques (ex: 500, 403)
      if (status === 403) {
        console.error('Accès refusé');
      }
    }
    return Promise.reject(error);
  }
);
