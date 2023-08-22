// app/utils/authUtils.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJWTToken = (userId) => {
  return jwt.sign({userId: userId}, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const comparePasswords = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = { generateJWTToken, comparePasswords, hashPassword };
