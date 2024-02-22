import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import Login from '../components/login';

function PrivateRoute({ Component }) {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  if (Component === Login) {
    if (isLoggedIn) return <Navigate to="/home" replace />;
    return <Component />;
  }
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <Component />;
}

export default PrivateRoute;