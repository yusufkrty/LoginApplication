const express = require('express');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.get('/home', authenticationMiddleware.authenticateToken, (req, res) => {
  console.log("HOME ROUTER ÇALIŞTI")
  res.json({ message: 'Welcome to your home!'+" " +req.user, user: req.user });
  
});

module.exports = router;
