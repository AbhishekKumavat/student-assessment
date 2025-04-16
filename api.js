import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      // Handle API error responses
      console.error('API Error:', response.data);
    } else {
      // Handle network errors
      console.error('Network Error:', error);
    }
    return Promise.reject(error);
  }
);

export default api; 