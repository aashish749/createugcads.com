import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASEURL || 'http://localhost:5001'
});

// Automatically inject JWT Bearer token into all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('ugc_auth_token');
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;