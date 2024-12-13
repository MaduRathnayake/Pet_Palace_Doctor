import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Card, CardContent, Typography, Grid, Button, Box, Chip, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PetsIcon from '@mui/icons-material/CheckCircle';

const ConfirmedAppointmentList = () => {
  const appointments = useStoreState((state) => state.appointments);
  const fetchAppointments = useStoreActions((actions) => actions.fetchAppointments);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchAppointments(userId);
    }
  }, [userId, fetchAppointments]);

  const getAuthToken = () => localStorage.getItem('token');

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === 'confirmed'
  );

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const token = getAuthToken();
      const response = await axios.patch(
        'http://localhost:5001/api/appointments/update-status',
        { appointmentId, status },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchAppointments(userId); // Refresh the appointments
        alert(`Appointment marked as ${status}`);
      } else {
        alert('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Error updating appointment status');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f8f4ff',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" mb={4}>
      <Avatar
          sx={{
            backgroundColor: '#49416D',
            width: 60,
            height: 60,
            margin: '0 auto',
            mb: 2,
          }}
        >
          <PetsIcon sx={{ fontSize: 40, color: 'white' }} />
        </Avatar>
        <Typography
          variant="h4"
          sx={{
            color: '#49416D',
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          Confirmed Appointments
        </Typography>
        <Typography variant="body1" sx={{ color: '#49416D' }}>
          Manage your confirmed appointments below.
        </Typography>
      </Box>

      {confirmedAppointments.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: '#6a1b9a' }}
        >
          No confirmed appointments found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {confirmedAppointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment._id}>
              <Card
                sx={{
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: '#4a148c', fontWeight: 'bold' }}
                  >
                    Pet: {appointment.pet.name} ({appointment.pet.type})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Owner: {appointment.user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Doctor: {appointment.doctor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {new Date(appointment.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Time: {appointment.timeSlot}
                  </Typography>
                  <Chip
                    label={appointment.status}
                    color="primary"
                    sx={{ marginTop: 1, fontWeight: 'bold' }}
                  />

                  {/* Action Buttons */}
                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() =>
                        handleUpdateStatus(appointment._id, 'completed')
                      }
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                      }}
                    >
                      Mark as Completed
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ConfirmedAppointmentList;
