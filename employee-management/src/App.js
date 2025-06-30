import React, { useState } from 'react';
import LandingPage from './LandingPage';
import AdminLogin from './AdminLogin';
import EmployeeDetails from './EmployeeDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {!loggedIn ? (
        <AdminLogin onLoginSuccess={() => setLoggedIn(true)} />
      ) : (
        <EmployeeDetails />
      )}
    </>
  );
}

export default App;