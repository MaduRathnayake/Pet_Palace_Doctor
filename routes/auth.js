import axios from 'axios';

// Set the base URL dynamically based on environment variable
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';
axios.defaults.baseURL = apiBaseUrl;

// Define your API calls
export const getAppointments = async () => {
  const response = await axios.get('/api/appointments');
  return response.data;
};

export const createAppointment = async (appointment) => {
  const response = await axios.post('/api/appointments', appointment);
  return response.data;
};

export const getPetsByUserId = async (userId) => {
  const response = await axios.get(`/api/pets/${userId}`);
  return response.data;
};

export const getDoctors = async () => {
  const response = await axios.get('/api/doctors');
  return response.data;
};
