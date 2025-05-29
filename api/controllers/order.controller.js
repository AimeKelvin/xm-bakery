const db = require('../models');
const Order = db.order;

exports.placeOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, userId: req.userId });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.userId } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
