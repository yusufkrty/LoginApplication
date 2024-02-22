
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Home from './views/home';
import PrivateRoute from './utils/privateRoute';
import { useNavigate } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<PrivateRoute Component={Home} />} />
        <Route path="/" exact element={<PrivateRoute Component={Login} />} />
      </Routes>
    </Router>

  );
}

export default App;






