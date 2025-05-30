const { Op } = require('sequelize');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const responseHandler = require('../utils/responseHandler');
const { validateRequiredFields } = require('../utils/validation');

const placeOrder = async (req, res) => {
  const { items, deliveryLocation } = req.body;
  const userId = req.user.id;

  const validationError = validateRequiredFields(['items', 'deliveryLocation'], req.body);
  if (validationError) return responseHandler.error(res, validationError, 400);
  if (!Array.isArray(items) || items.length === 0) return responseHandler.error(res, 'Items must be a non-empty array', 400);

  try {
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) return responseHandler.error(res, `Product ID ${item.productId} not found`, 404);
      if (product.quantity < item.quantity) return responseHandler.error(res, `Insufficient stock for product ${product.name}`, 400);

      total += product.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      // Update product quantity
      await product.update({ quantity: product.quantity - item.quantity });

      // Update inventory
      await Inventory.create({
        productId: item.productId,
        quantity: product.quantity - item.quantity,
      });
    }

    const order = await Order.create({
      userId,
      total,
      deliveryLocation,
      status: 'pending',
    });

    for (const item of orderItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    responseHandler.success(res, order, 'Order placed successfully', 201);
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const trackOrder = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const order = await Order.findOne({
      where: { id, userId },
      include: [{ model: OrderItem, include: [Product] }],
    });
    if (!order) return responseHandler.error(res, 'Order not found', 404);

    responseHandler.success(res, order, 'Order retrieved successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const getOrderHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, include: [Product] }],
    });
    responseHandler.success(res, orders, 'Order history retrieved successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const bakeryId = req.user.bakeryId;

  if (!['pending', 'processing', 'shipped', 'delivered'].includes(status)) {
    return responseHandler.error(res, 'Invalid status', 400);
  }

  try {
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem, include: [{ model: Product, where: { bakeryId } }] }],
    });
    if (!order) return responseHandler.error(res, 'Order not found or unauthorized', 404);

    await order.update({ status });
    responseHandler.success(res, order, 'Order status updated successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

module.exports = { placeOrder, trackOrder, getOrderHistory, updateOrderStatus };