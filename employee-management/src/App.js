import React, { useState } from 'react';
import LandingPage from './LandingPage';
import AdminLogin from './AdminLogin';
import EmployeeDetails from './EmployeeDetails'; 

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