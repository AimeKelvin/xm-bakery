const User = require('../models/User');
const responseHandler = require('../utils/responseHandler');
const { validateRequiredFields } = require('../utils/validation');

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) return responseHandler.error(res, 'User not found', 404);

    await user.update({ name, email });
    responseHandler.success(res, { id: user.id, name, email, role: user.role }, 'User updated successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email', 'role'] });
    if (!user) return responseHandler.error(res, 'User not found', 404);

    responseHandler.success(res, user, 'User retrieved successfully');
  } catch (error) {
    responseHandler.error(res, error.message, 500);
  }
};

module.exports = { updateUser, getUser };