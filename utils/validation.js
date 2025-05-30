const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateRequiredFields = (fields, data) => {
  for (const field of fields) {
    if (!data[field]) {
      return `${field} is required`;
    }
  }
  return null;
};

module.exports = { validateEmail, validateRequiredFields };