import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api/courses/teacher', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an Axios request interceptor to attach the token
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // or sessionStorage.getItem('token')
    if (token) {
      console.log('Token being sent:', token); // Log the token being added to headers
      config.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an Axios response interceptor to handle 401 and 403 errors
apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses as is
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Handle Unauthorized errors (401)
        console.warn('Unauthorized request. Redirecting to login.');
        sessionStorage.removeItem('token'); // Clear the token on 401 error
        window.location.href = '/login'; // Redirect to login page
      } else if (status === 403) {
        // Handle Forbidden errors (403)
        console.warn('Forbidden request. You do not have permission to access this resource.');
        window.location.href = '/login'; // Redirect to a forbidden page (or any other page)
      }
    }
    return Promise.reject(error); // Propagate other errors
  }
);

// API calls
export const getDashboardStats = () => apiClient.get('/stats');
export const getCourses = () => apiClient.get('/courses');
export const getStudents = () => apiClient.get('/total/students');
export const getAssignments = () => apiClient.get('/assignments');
