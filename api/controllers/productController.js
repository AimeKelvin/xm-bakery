const { Op } = require('sequelize');
const Product = require('../models/Product');
const Bakery = require('../models/Bakery');
const responseHandler = require('../utils/responseHandler');
const { validateRequiredFields } = require('../utils/validation');

const addProduct = async (req, res) => {
  const { name, price, category, quantity } = req.body;
  const bakeryId = req.user.bakeryId;

  const validationError = validateRequiredFields(['name', 'price', 'category', 'quantity'], req.body);
  if (validationError) return responseHandler.error(res, validationError, 400);
  if (!bakeryId) return responseHandler.error(res, 'Only bakery managers can add products', 403);

  try {
    const product = await Product.create({ name, price, category, quantity, bakeryId });
    responseHandler.success(res, product, 'Product added successfully', 201);
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const searchProducts = async (req, res) => {
  const { name, category, minPrice, maxPrice, minQuantity, sortBy, order } = req.query;

  const where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (category) where.category = category;
  if (minPrice) where.price = { [Op.gte]: minPrice };
  if (maxPrice) where.price = { [Op.lte]: maxPrice };
  if (minQuantity) where.quantity = { [Op.gte]: minQuantity };

  try {
    const products = await Product.findAll({
      where,
      include: [{ model: Bakery, attributes: ['name', 'address'] }],
      order: sortBy ? [[sortBy, order || 'ASC']] : undefined,
    });
    responseHandler.success(res, products, 'Products retrieved successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, quantity } = req.body;
  const bakeryId = req.user.bakeryId;

  try {
    const product = await Product.findByPk(id);
    if (!product) return responseHandler.error(res, 'Product not found', 404);
    if (product.bakeryId !== bakeryId) return responseHandler.error(res, 'Unauthorized', 403);

    await product.update({ name, price, category, quantity });
    responseHandler.success(res, product, 'Product updated successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const bakeryId = req.user.bakeryId;

  try {
    const product = await Product.findByPk(id);
    if (!product) return responseHandler.error(res, 'Product not found', 404);
    if (product.bakeryId !== bakeryId) return responseHandler.error(res, 'Unauthorized', 403);

    await product.destroy();
    responseHandler.success(res, null, 'Product deleted successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

module.exports = { addProduct, searchProducts, updateProduct, deleteProduct };