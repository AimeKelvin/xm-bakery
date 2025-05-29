const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  // Also support "Authorization: Bearer <token>"
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
