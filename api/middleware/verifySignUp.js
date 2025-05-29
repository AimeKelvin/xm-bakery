const db = require('../models');
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    if (user) return res.status(400).send({ message: 'Username is already in use!' });

    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) return res.status(400).send({ message: 'Email is already in use!' });
      next();
    });
  });
};

module.exports = { checkDuplicateUsernameOrEmail };
