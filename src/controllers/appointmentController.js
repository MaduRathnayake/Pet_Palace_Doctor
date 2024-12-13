// /controllers/appointmentController.js
import store from '../models/store';

// Controller to manage appointments
export const loadAppointments = () => {
  store.getActions().fetchAppointments();
};

export const createAppointmentAction = (appointmentData) => {
  store.getActions().createNewAppointment(appointmentData);
};

export const loadPets = (userId) => {
  store.getActions().fetchPets(userId);
};

export const loadDoctors = () => {
  store.getActions().fetchDoctors();
};
