module.exports = (sequelize, Sequelize) => {
  return sequelize.define('order', {
    status: { type: Sequelize.STRING, defaultValue: 'pending' },
    total: Sequelize.FLOAT
  });
};
