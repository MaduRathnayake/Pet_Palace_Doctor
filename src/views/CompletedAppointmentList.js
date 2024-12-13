import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CompletedAppointmentList = () => {
  const appointments = useStoreState((state) => state.appointments);
  const fetchAppointments = useStoreActions((actions) => actions.fetchAppointments);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchAppointments(userId);
    }
  }, [userId, fetchAppointments]);

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === 'completed'
  );

  return (
    <Box
      sx={{
        backgroundColor: '#f8f4ff',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: '#49416D',
            width: 60,
            height: 60,
            margin: '0 auto',
            mb: 2,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
        </Avatar>
        <Typography
          variant="h4"
          sx={{
            color: '#4a148c',
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          Completed Appointments
        </Typography>
        <Typography variant="body1" sx={{ color: '#6a1b9a' }}>
          View details of your completed appointments.
        </Typography>
      </Box>

      {/* Completed Appointments Grid */}
      {completedAppointments.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: '#6a1b9a' }}
        >
          No completed appointments found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {completedAppointments.map((appointment) => (
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
                    color="primary"
                    sx={{ marginTop: 1, fontWeight: 'bold' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CompletedAppointmentList;
