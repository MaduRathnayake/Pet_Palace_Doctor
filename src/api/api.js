// /api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',  // Adjust to your backend URL
  timeout: 1000,
});


// Function to get the token (usually stored in localStorage or state)
const getAuthToken = () => {
  return localStorage.getItem('token');  
};

// Intercept requests to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Add Bearer token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/// API call for appointments
export const getAppointments = async (userId) => {
  try {
    const response = await api.get(`/appointments/doctor/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// API calls for pets
export const getPetsByUserId = async (userId) => {
  try {
    const response = await api.get(`/pets/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

// API calls for doctors
export const getDoctors = async () => {
  try {
    const response = await api.get('/doctors/doctors');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

