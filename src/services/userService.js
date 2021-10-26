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

const createUser = async (name, email, password) => {
  const error = await validations(name, email, password);
  console.log(error);
  if (error) return error;
  const id = await userModel.createUser({ name, email, password });
  return id;
};

module.exports = {
  createUser,
};