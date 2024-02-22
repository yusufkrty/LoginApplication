import React from 'react';
import { Navigate, Route } from 'react-router-dom';
 
// PrivateRoute bileşeni
function PrivateRoute({Component}) {
  // LocalStorage'dan token'u kontrol et
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
 
  // Giriş yapılmamışsa login sayfasına yönlendir
  if (!isLoggedIn) return <Navigate to="/" replace />;
 
  // Yetkili ise, istenen rotayı render et
  return <Component/>;
}
 
export default PrivateRoute;