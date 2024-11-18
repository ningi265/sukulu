import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api/courses/teacher', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an Axios request interceptor to include the token in each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
   // Debugging - Check if the token is being retrieved correctly
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an Axios response interceptor to handle 401 errors (Unauthorized)
apiClient.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, remove token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// API calls
export const getDashboardStats = () => apiClient.get('/stats');
export const getCourses = () => apiClient.get('/courses');
export const getStudents = () => apiClient.get('/total/students');
export const getAssignments = () => apiClient.get('/assignments');
