import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Register from './views/Register';
import AppointmentList from './views/AppointmentList';
import PetsList from './views/PetsList'; // Make sure this component exists
import CreateAppointment from './views/CreateAppointment'; // Import the CreateAppointment component
import CompletedAppointmentList from './views/CompletedAppointmentList'; // Import the CreateAppointment component
import ConfirmedAppointmentList from './views/ConfirmedAppointmentList'; // Import the CreateAppointment component



// Wrapper component to handle conditional rendering of NavBar
const Layout = ({ children }) => {
  const location = useLocation();
  const noNavBarRoutes = ['/', '/register'];

  // Check if the current path is one where the NavBar shouldn't show
  const shouldShowNavBar = !noNavBarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/completed-appointments" element={<CompletedAppointmentList />} />
          <Route path="/confirmed-appointments" element={<ConfirmedAppointmentList />} />
          <Route path="/pets" element={<PetsList />} /> {/* Your PetsList component */}
          <Route path="/create-appointment" element={<CreateAppointment />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
