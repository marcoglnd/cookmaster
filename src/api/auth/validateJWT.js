const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');

const secret = 'segredo';

const validation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
  
    const { userEmail } = decoded;
  
    const user = await userModel.findEmail(userEmail);
  
    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }
  
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validation;