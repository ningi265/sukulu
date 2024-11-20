import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api/courses/teacher', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add an Axios response interceptor to handle 401 errors (Unauthorized)
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // or sessionStorage.getItem('token')
    if (token) {
      console.log('Token being sent:', token);  // Log the token being added to headers
      config.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// API calls
export const getDashboardStats = () => apiClient.get('/stats');
export const getCourses = () => apiClient.get('/courses');
export const getStudents = () => apiClient.get('/total/students');
export const getAssignments = () => apiClient.get('/assignments');
