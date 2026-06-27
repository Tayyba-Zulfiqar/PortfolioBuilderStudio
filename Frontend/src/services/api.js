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
    getAllPortfolios: () => API.get('/portfolio/all'),
    createPortfolio: () => API.post('/portfolio/new'),
    getMyPortfolio: (id) => API.get(id ? `/portfolio/me?id=${id}` : '/portfolio/me'),
    updatePortfolio: (data, id) => id ? API.put(`/portfolio/${id}`, data) : API.put('/portfolio', data),
    deletePortfolio: (id) => API.delete(`/portfolio/${id}`),
    setActivePortfolio: (id) => API.post(`/portfolio/${id}/active`),
    getPublicPortfolio: (username) => API.get(`/portfolio/${username}`),
    getPortfolioPreview: (id) => API.get(`/portfolio/preview/${id}`),
};

export default API;