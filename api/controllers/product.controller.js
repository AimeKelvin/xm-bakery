const db = require('../models');
const Product = db.product;

exports.create = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, userId: req.userId });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  const where = {};
  if (req.query.category) where.category = req.query.category;
  if (req.query.min && req.query.max) where.price = { [db.Sequelize.Op.between]: [req.query.min, req.query.max] };

  try {
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
