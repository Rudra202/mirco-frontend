/**
 * FILE PURPOSE: Pre-configured Axios HTTP instance for all API communication.
 * 
 * CONNECTIONS:
 * - Imports from: axios
 * - Used by: @platform/api (auth.api, dashboard.api)
 * 
 * For a backend developer: All frontend HTTP requests flow through this Axios instance.
 * It sets the base URL (http://localhost:8080/api), attaches JWT from localStorage via
 * a request interceptor, and globally redirects to /login on 401 responses.
 */

import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the JWT token from localStorage to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally by clearing auth data and redirecting to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
