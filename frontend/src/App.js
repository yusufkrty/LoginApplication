
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Home from './views/home';
import PrivateRoute from './utils/privateRoute';

function App() {


  return (
    <Router>
      <Routes>

        <Route path ="/home" element ={<PrivateRoute  Component={Home}  />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App;






