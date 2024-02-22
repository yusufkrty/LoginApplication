// Authentication middleware dosyası
const jwt = require('jsonwebtoken');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');
const config = require('../config/config');
const { isTokenExpired } = require('../utils/getExpired');
 
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("AUTHHEADER"+authHeader);
  console.log("confilcrttt");
 
  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }
 
  try {
    const decoded = jwt.verify(token, config.secretKey);
    //cach kontrol
    if (isTokenExpired(token)) {
      req.user = decoded;
      next();
    } else {
     
      return res.status(401).json({ message: 'Access token expired' });
    }
   
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.log("ERROR"+error);
      return res.status(401).json({ message: 'Access token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
}
 
module.exports = { authenticateToken };