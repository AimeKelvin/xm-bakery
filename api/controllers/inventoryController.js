const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const responseHandler = require('../utils/responseHandler');

const getInventory = async (req, res) => {
  const bakeryId = req.user.bakeryId;

  try {
    const inventory = await Inventory.findAll({
      include: [{ model: Product, where: { bakeryId } }],
    });
    responseHandler.success(res, inventory, 'Inventory retrieved successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const updateInventory = async (req, res) => {
  const { productId, quantity } = req.body;
  const bakeryId = req.user.bakeryId;

  try {
    const product = await Product.findOne({ where: { id: productId, bakeryId } });
    if (!product) return responseHandler.error(res, 'Product not found or unauthorized', 404);

    await Inventory.create({ productId, quantity });
    await product.update({ quantity });

    responseHandler.success(res, null, 'Inventory updated successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

module.exports = { getInventory, updateInventory };