// /views/PetsList.js
import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { CircularProgress, Grid, Card, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { loadPets} from '../controllers/appointmentController';
import axios from 'axios';
const PetsList = () => {
  const { pets, loading_pets, error } = useStoreState((state) => state);  // Get pets from the store
  const [open, setOpen] = useState(false);  // For the dialog box
  const [petDetails, setPetDetails] = useState({ name: '', type: '', breed: '', age: 0 }); // Form data

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    // Load pets when component mounts
    loadPets(userId);
  }, [loadPets, userId]);

  const handleClickOpen = () => {
    setOpen(true);  // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);  // Close the dialog
  };

  const handleChange = (e) => {
    setPetDetails({ ...petDetails, [e.target.name]: e.target.value });
  };
  const getAuthToken = () => {
    return localStorage.getItem('token');  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const petData = {
      ...petDetails,
      ownerId: userId,  // Use the logged-in user as the pet's owner
    };

    try {
    const token = getAuthToken();
    console.log(token);
    await axios.post(
        'http://localhost:5001/api/pets/register',  // API URL
        petData,  // Payload (pet data)
        {
          headers: {
            'Content-Type': 'application/json',  // Ensure correct content type
            'Authorization': 'Bearer ' + token,  // Add the Authorization header with Bearer token
          },
        }
      );
  
      loadPets(userId);  // Reload pets after creating a new one
      handleClose();  // Close the dialog after submission
    } catch (error) {
      console.error('Error creating pet', error);
    }
  };
  if (loading_pets) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Pets List</h2>
      <Grid container spacing={2}>
        {Array.isArray(pets) && pets.length > 0 ? (
          pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {pet.breed} - {pet.age} years old
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <div>No Pets Available</div>
        )}
      </Grid>
      
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Pet
      </Button>

      {/* Dialog Box for Creating Pet */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Pet</DialogTitle>
        <DialogContent>
          <TextField
            label="Pet Name"
            name="name"
            value={petDetails.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            name="type"
            value={petDetails.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Breed"
            name="breed"
            value={petDetails.breed}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            value={petDetails.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PetsList;
