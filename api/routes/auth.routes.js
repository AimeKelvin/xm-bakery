module.exports = app => {
  const controller = require('../controllers/auth.controller');
  const { checkDuplicateUsernameOrEmail } = require('../middleware/verifySignUp');

  const router = require('express').Router();
  router.post('/signup', checkDuplicateUsernameOrEmail, controller.signup);
  router.post('/signin', controller.signin);

  app.use('/api/auth', router);
};
