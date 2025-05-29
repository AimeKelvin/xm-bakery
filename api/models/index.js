const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.product = require('./product.model')(sequelize, Sequelize);
db.order = require('./order.model')(sequelize, Sequelize);
db.inventory = require('./inventory.model')(sequelize, Sequelize);

db.user.hasMany(db.product);
db.product.belongsTo(db.user);

db.user.hasMany(db.order);
db.order.belongsTo(db.user);

db.product.hasMany(db.inventory);
db.inventory.belongsTo(db.product);

module.exports = db;
