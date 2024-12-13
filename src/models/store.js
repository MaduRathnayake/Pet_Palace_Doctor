import { createStore, action, thunk } from 'easy-peasy';
import { getAppointments, createAppointment, getPetsByUserId, getDoctors } from '../api/api';
import axios from 'axios';

// Set the base URL dynamically based on environment variable
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';
axios.defaults.baseURL = apiBaseUrl;
// Store Model
const storeModel = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  user_id: localStorage.getItem('user_id') || null,
  appointments: [],
  pets: [],
  doctors: [],
  loading: false,
  loading_pets: false,
  loading_doctors: false,
  error: null,

  // logoutUser: () => {
  //   return {
  //     token: null,
  //     name: null,
  //     email: null,
  //   };},
    logoutUser: action((state) => {
      state.token = '';
    }),
  // Actions to set state
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setLoadingDoctors: action((state, payload) => {
    state.loading_doctors = payload;
  }),
  setLoadingPet: action((state, payload) => {
    state.loading_pets = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),

  setUser: action((state, payload) => {
    state.user = payload;
  }),

  setToken: action((state, payload) => {
    state.token = payload;
  }),

  setUserId: action((state, payload) => {
    state.user_id = payload;
  }),

  setAppointments: action((state, payload) => {
    state.appointments = payload;
  }),

  setPets: action((state, payload) => {
    state.pets = payload;
  }),

  setDoctors: action((state, payload) => {
    state.doctors = payload;
  }),

  // Thunks for API calls
  loginUser: thunk(async (actions, { email, password }) => {
    actions.setLoading(true);
    try {
      const response = await axios.post('/api/doctors/login', { email, password });
      const { token, user_id } = response.data;

      // Store the token and user_id in the store
      actions.setToken(token);
      actions.setUserId(user_id);
      actions.setUser({ email });

      // Save the token, user_id, and user information to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('user', JSON.stringify({ email }));

      actions.setError(null); // Reset error state on successful login

      console.log(user_id);
      return { success: true }; 
    } catch (error) {
    if (error.response && error.response.status === 401) {
      actions.setError('Invalid email or password'); // Set specific error message
    } else {
      actions.setError('Login failed');
    }
    return { success: false }; // Indicate failure
  } finally {
    actions.setLoading(false);
  }
  }),

  registerUser: thunk(async (actions, { name, email, password ,phone, appointmentCharge, startTime,endTime}) => {
    actions.setLoading(true);
    try {
      const response = await axios.post('/api/doctors/register', { name, email, password ,phone, appointmentCharge, startTime,endTime});
      const { token } = response.data;

      actions.setToken(token);
      actions.setUser({ name, email });

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ name, email }));
      
    } catch (error) {
      actions.setError('Registration failed');
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchAppointments: thunk(async (actions) => {
    actions.setLoading(true);

    // Retrieve user_id from localStorage
    const user_id = localStorage.getItem('user_id');
    
    try {
      const data = await getAppointments(user_id);
      actions.setAppointments(data);
    } catch (error) {
      actions.setError('Failed to fetch appointments');
    } finally {
      actions.setLoading(false);
    }
  }),

  // Thunk to fetch pets by user ID
  fetchPets: thunk(async (actions, userId) => {
    actions.setLoadingPet(true);
    try {
      const data = await getPetsByUserId(userId);
      actions.setPets(data.pets);
      console.log("ddddd",data.pets)

    } catch (error) {
      actions.setError('Failed to fetch pets');
    } finally {
      actions.setLoadingPet(false);
    }
  }),

  // Thunk to fetch doctors
  fetchDoctors: thunk(async (actions) => {
    actions.setLoadingDoctors(true);
    try {
      const data = await getDoctors();
      actions.setDoctors(data);
    } catch (error) {
      actions.setError('Failed to fetch doctors');
    } finally {
      actions.setLoadingDoctors(false);
    }
  }),
};

const store = createStore(storeModel);
export default store;
