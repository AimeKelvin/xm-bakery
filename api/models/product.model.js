module.exports = (sequelize, Sequelize) => {
  return sequelize.define('product', {
    name: Sequelize.STRING,
    price: Sequelize.FLOAT,
    category: Sequelize.STRING,
    quantity: Sequelize.INTEGER
  });
};
