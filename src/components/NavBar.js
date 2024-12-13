import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const logoutUser = useStoreActions((actions) => actions.logoutUser);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Updated AppBar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#49416D', // A vibrant purple shade
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '0.5px',
            }}
          >
            Pet Palace - Doctor
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Updated Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            backgroundColor: '#f8f4ff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            paddingTop: 2,
          },
        }}
      >
        <List>
          {/* Appointments */}
          <ListItem
            button
            component={Link}
            to="/appointments"
            onClick={toggleDrawer(false)}
          >
            <CalendarTodayIcon sx={{ color: '#49416D', marginRight: 2 }} />
            <ListItemText
              primary="Appointments"
              sx={{ color: '#49416D', fontWeight: 'bold' }}
            />
          </ListItem>

          {/* Confirmed Appointments */}
          <ListItem
            button
            component={Link}
            to="/confirmed-appointments"
            onClick={toggleDrawer(false)}
          >
            <PetsIcon sx={{ color: '#49416D', marginRight: 2 }} />
            <ListItemText
              primary="Confirmed Appointments"
              sx={{ color: '#49416D', fontWeight: 'bold' }}
            />
          </ListItem>

          {/* Completed Appointments */}
          <ListItem
            button
            component={Link}
            to="/completed-appointments"
            onClick={toggleDrawer(false)}
          >
            <CheckCircleIcon sx={{ color: '#49416D', marginRight: 2 }} />
            <ListItemText
              primary="Completed Appointments"
              sx={{ color: '#49416D', fontWeight: 'bold' }}
            />
          </ListItem>

          <Divider sx={{ marginY: 2, borderColor: '#49416D' }} />

          {/* Logout */}
          <ListItem button onClick={handleLogout}>
            <ExitToAppIcon sx={{ color: '#FF4081', marginRight: 2 }} />
            <ListItemText
              primary="Logout"
              sx={{
                color: '#FF4081',
                fontWeight: 'bold',
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
