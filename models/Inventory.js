const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Inventory.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Inventory;