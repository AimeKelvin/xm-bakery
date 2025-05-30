const { Op } = require('sequelize');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const responseHandler = require('../utils/responseHandler');

const generateSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  const bakeryId = req.user.bakeryId;

  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, where: { bakeryId } }],
        },
      ],
      where: {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });

    const report = orders.map(order => ({
      orderId: order.id,
      total: order.total,
      status: order.status,
      items: order.OrderItems.map(item => ({
        productName: item.Product.name,
        quantity: item.quantity,
        price: item.price,
      })),
    }));

    responseHandler.success(res, report, 'Sales report generated successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const generateInventoryReport = async (req, res) => {
  const bakeryId = req.user.bakeryId;

  try {
    const inventory = await Inventory.findAll({
      include: [{ model: Product, where: { bakeryId } }],
    });

    const report = inventory.map(item => ({
      productName: item.Product.name,
      quantity: item.quantity,
      lastUpdated: item.lastUpdated,
    }));

    responseHandler.success(res, report, 'Inventory report generated successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

module.exports = { generateSalesReport, generateInventoryReport };