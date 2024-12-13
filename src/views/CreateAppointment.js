// /views/AddAppointment.js
import React, { useState, useEffect } from 'react';
import { loadPets, loadDoctors, createAppointmentAction } from '../controllers/appointmentController';
import { useStoreState } from 'easy-peasy';
import { Button, TextField, Grid, MenuItem, Select, CircularProgress, InputLabel, FormControl,Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
  const [petId, setPetId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);  // New state for available time slots
  const [openSnackbar, setOpenSnackbar] = useState(false);  // State for showing success/failure message
  const [snackbarMessage, setSnackbarMessage] = useState('');  // Message for snackbar


  const { pets, doctors, loading_doctors, loading_pets, error } = useStoreState((state) => state);
  const userId = localStorage.getItem('user_id');

  const navigate = useNavigate();

// Function to get the token (usually stored in localStorage or state)
const getAuthToken = () => {
  return localStorage.getItem('token');  
};

  // Load doctors and pets
  useEffect(() => {
    loadDoctors();
    loadPets(userId);  // Pass actual userId here
  }, [userId]);

  // Fetch available time slots when doctor or date is selected
  useEffect(() => {
    if (doctorId && date) {
      const fetchTimeSlots = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/appointments/doctor/${doctorId}/slots?date=${date}`);
          const data = await response.json();
          setTimeSlots(data.availableSlots);  // Set the time slots from the API response
        } catch (error) {
          console.error("Error fetching time slots:", error);
          setTimeSlots([]);  // Clear the time slots on error
        }
      };

      fetchTimeSlots();
    } else {
      setTimeSlots([]);  // Reset time slots if no doctor or date is selected
    }
  }, [doctorId, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      userId,
      petId,
      doctorId,
      date,
      timeSlot,
    };

    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5001/api/appointments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +token,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // On success, show success message
        setSnackbarMessage('Appointment booked successfully!');
        setOpenSnackbar(true);
        navigate('/appointments');
      } else {
        // On failure, show error message
        setSnackbarMessage(`Error: ${result.message || 'Something went wrong'}`);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setSnackbarMessage('Error creating appointment. Please try again.');
      setOpenSnackbar(true);
    }

  };

  // Show a loading spinner if doctors or pets are still loading
  if (loading_doctors || loading_pets) return <CircularProgress />;
  
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Pet Select Field */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Pet</InputLabel>
            <Select value={petId} onChange={(e) => setPetId(e.target.value)} label="Pet">
              {Array.isArray(pets) && pets.length > 0 ? (
                pets.map((pet) => (
                  <MenuItem key={pet._id} value={pet._id}>
                    {pet.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Pets Available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Doctor Select Field */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Doctor</InputLabel>
            <Select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} label="Doctor">
              {Array.isArray(doctors) && doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Doctors Available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Date Input Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* Time Slot Select Field */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Time Slot</InputLabel>
            <Select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              label="Time Slot"
              disabled={timeSlots.length === 0} // Disable if no time slots are available
            >
              {timeSlots.length > 0 ? (
                timeSlots.map((slot, index) => (
                  <MenuItem key={index} value={slot}>
                    {slot}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Time Slots Available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Book Appointment
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </form>
    
  );
};

export default CreateAppointment;
