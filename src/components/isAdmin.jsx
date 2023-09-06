import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

function isAdmin({ children }) {
  const { isAdmin } = useContext(AuthContext);
  if (isAdmin) {
    return children; 
  } else {
    return <Navigate to="/login" />;
  }
}

export default isAdmin;
