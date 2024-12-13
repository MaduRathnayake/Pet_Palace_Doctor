import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Button, TextField, Grid, CircularProgress, Box, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentCharge, setAppointmentCharge] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const registerUser = useStoreActions((actions) => actions.registerUser);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password verification logic
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate time inputs
    if (!startTime || !endTime) {
      setError('Start time and end time are required.');
      return;
    }

    console.log({
      name,
      email,
      password,
      phone,
      appointmentCharge: parseFloat(appointmentCharge),
      startTime,
      endTime,
    });

    registerUser({
      name,
      email,
      password,
      phone,
      appointmentCharge: parseFloat(appointmentCharge),
      startTime,
      endTime,
    })
      .then(() => {
        setError('');
        alert("Registration successful! Please login");
        navigate('/');
      })
      .catch(() => {
        setError('Registration failed');
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f4ff',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          padding: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Avatar
          sx={{
            backgroundColor: '#49416D',
            width: 60,
            height: 60,
            mb: 2,
            margin: '0 auto',
          }}
        >
          <PetsIcon sx={{ fontSize: 40, color: 'white' }} />
        </Avatar>

        <Typography variant="h4" sx={{ marginBottom: 1, color: '#49416D', fontWeight: 'bold' }}>
          Pet Palace - Doctor Registration
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: 3, color: '#49416D' }}>
          Please provide your details to register as a doctor at Pet Palace.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#49416D',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#49416D',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#49416D',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Appointment Charge"
                type="number"
                fullWidth
                value={appointmentCharge}
                onChange={(e) => setAppointmentCharge(e.target.value)}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#49416D',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#49416D',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="End Time"
                type="time"
                fullWidth
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#49416D',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#49416D',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Re-enter Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#49416D',
                  },
                }}
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'red', textAlign: 'center' }}>
                  {error}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  padding: '12px',
                  backgroundColor: '#49416D',
                  '&:hover': {
                    backgroundColor: '#4a148c',
                  },
                  marginTop: 2,
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="white" /> : 'Register'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Register;