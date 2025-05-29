module.exports = (sequelize, Sequelize) => {
  return sequelize.define('inventory', {
    stock: Sequelize.INTEGER
  });
};
