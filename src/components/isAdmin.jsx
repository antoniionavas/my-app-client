import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

function isAdmin({ children }) {
  const { role } = useContext(AuthContext);
  if (role === "admin") {
    return children; 
  } else {
    return <Navigate to="/login" />;
  }
}

export default isAdmin;
