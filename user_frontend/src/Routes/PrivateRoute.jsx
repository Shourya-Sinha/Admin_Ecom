import React from 'react'
import Test from '../Pages/Test'
import { Outlet } from 'react-router-dom';

const isAuthenticated = () => {
    // Implement your authentication logic here
    // return localStorage.getItem("authToken") !== null; // Example check
    return true; // Replace with actual authentication logic
  };
  
  const PrivateRoutes = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;

  };

export default PrivateRoutes