module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    username: { type: Sequelize.STRING, unique: true },
    email: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING,
    role: { type: Sequelize.STRING, defaultValue: 'manager' }
  });
};
