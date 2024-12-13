import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const AppointmentList = () => {
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

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === 'pending'
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
        fetchAppointments(userId);
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
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: '#6a1b9a',
            width: 60,
            height: 60,
            margin: '0 auto',
            mb: 2,
          }}
        >
          <AccessAlarmIcon sx={{ fontSize: 40, color: 'white' }} />
        </Avatar>
        <Typography
          variant="h4"
          sx={{
            color: '#4a148c',
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          Pending Appointments
        </Typography>
        <Typography variant="body1" sx={{ color: '#6a1b9a' }}>
          Review and manage your pending appointments.
        </Typography>
      </Box>

      {pendingAppointments.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', width: '100%', color: '#6a1b9a' }}
        >
          No pending appointments to review.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {pendingAppointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment._id}>
              <Card
                sx={{
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: '#4a148c',
                      fontWeight: 'bold',
                      marginBottom: 1,
                    }}
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
                    color="warning"
                    sx={{ marginTop: 1, fontWeight: 'bold' }}
                  />
                  <Box sx={{ marginTop: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#4caf50',
                        '&:hover': { backgroundColor: '#388e3c' },
                        marginRight: 1,
                      }}
                      onClick={() => handleUpdateStatus(appointment._id, 'confirmed')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#f44336',
                        '&:hover': { backgroundColor: '#d32f2f' },
                      }}
                      onClick={() => handleUpdateStatus(appointment._id, 'cancelled')}
                    >
                      Decline
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

export default AppointmentList;
