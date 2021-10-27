const userModel = require('../models/userModel');

const validateEntries = (name, email, password) => {
  if (!name || !email || !password) {
    return ({
      message: 'Invalid entries. Try again.',
    });
  }
  return null;
};

const validateEmail = (email) => {
  if (!email.includes('@')) {
    return ({
      message: 'Invalid entries. Try again.',
    });
  }
};

const emailExists = async (email) => {
  const foundEmail = await userModel.findEmail({ email });
  if (foundEmail) return ({ message: 'Email already registered' });
  return null;
};

const validations = async (name, email, password) => {
  if (await emailExists(email)) return emailExists(email);
  if (validateEntries(name, email, password)) return validateEntries(name, email, password);
  if (validateEmail(email)) return validateEmail(email);
  return null;
};

const validateLogin = async (email, password) => {
  if (!email || !password) {
    return ({
      message: 'All fields must be filled',
    });
  }
  const user = await userModel.checkLoginCredentials({ email, password });
  if (!user) {
    return ({
      message: 'Incorrect username or password',
    });
  }
  return user;
};

const createUser = async (name, email, password) => {
  const error = await validations(name, email, password);
  if (error) return error;
  const id = await userModel.createUser({ name, email, password });
  return id;
};

const login = async (email, password) => {
  const response = await validateLogin(email, password);
  return response;
};

module.exports = {
  createUser,
  login,
};