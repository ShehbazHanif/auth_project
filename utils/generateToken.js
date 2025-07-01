require('dotenv').config();
const jwt = require("jsonwebtoken");

const generateToken = (id, email, name) => {
  return jwt.sign(
    { id, email, name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRE_IN }
  );
};

module.exports = generateToken;
