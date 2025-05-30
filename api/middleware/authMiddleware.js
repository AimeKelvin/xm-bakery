const { verifyToken } = require('../config/jwt');
const responseHandler = require('../utils/responseHandler');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return responseHandler.error(res, 'Authentication token missing', 401);
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return responseHandler.error(res, 'Invalid token', 401);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return responseHandler.error(res, 'Unauthorized access', 403);
    }
    next();
  };
};

module.exports = { authenticate, restrictTo };