const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Bakery = require('./Bakery');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bakeryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.belongsTo(Bakery, { foreignKey: 'bakeryId' });

module.exports = Product;