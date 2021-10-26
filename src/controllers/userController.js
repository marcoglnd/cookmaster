const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const response = await userService.createUser(
    name, email, password,
  );
  
  if (response && response.message === 'Invalid entries. Try again.') {
    return res.status(400).json(response);
  }

  if (response && response.message === 'Email already registered') {
    return res.status(409).json(response);
  }

  res.status(201).json({ user: { name, email, role: 'user', _id: response } });
};

module.exports = {
  createUser,
};