import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage';

import PurchasePage from './pages/PurchasePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track login status
  const [userId, setUserId] = useState(null); // Track the authenticated user's ID
  const [userData, setUserData]=useState({})

  const handleLogin = (user) => {
    console.log("user details : ",user)
    setIsAuthenticated(true);
    setUserData(user)
    setUserId(user.id); 
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <PurchasePage userId={userId} userData={userData} /> : <Navigate to="/login" replace />
          }
        />
        {/* <Route
          path="/purchase"
          element={
            isAuthenticated ? (
              <PurchasePage userId={userId} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route 
         path='/register'
         element = {
          <RegistrationPage ></RegistrationPage>
         }
         />
      </Routes>
    </Router>
  );
};

export default App;
