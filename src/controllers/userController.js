const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = 'segredo';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

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

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await userService.login(email, password);

  if (response && response.message) {
    return res.status(401).json(response);
  }

  const token = jwt.sign({ data: response }, secret, jwtConfig);
  
  return res.status(200).json({ token });
};

module.exports = {
  createUser,
  login,
};