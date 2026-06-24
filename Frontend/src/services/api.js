import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth Services
export const authAPI = {
    signup: (data) => API.post('/auth/signup', data),
    login: (data) => API.post('/auth/login', data),
    getMe: () => API.get('/auth/me'),
};

// Portfolio Services
export const portfolioAPI = {
    getMyPortfolio: () => API.get('/portfolio/me'),
    updatePortfolio: (data) => API.put('/portfolio', data),
    getPublicPortfolio: (username) => API.get(`/portfolio/${username}`),
};

export default API;