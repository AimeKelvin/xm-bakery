const responseHandler = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  responseHandler.error(res, err.message || 'Internal Server Error', err.status || 500);
};

module.exports = errorHandler;