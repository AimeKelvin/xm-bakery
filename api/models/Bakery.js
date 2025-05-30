const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bakery = sequelize.define('Bakery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Bakery;