const db = require('../models');
const Inventory = db.inventory;

exports.trackInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
