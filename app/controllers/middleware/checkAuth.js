/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded);
    req.token = decoded;
    req.userData = { customerId: decoded.customerId, pollsterId: decoded.pollsterId };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Expired or invalid token. Please login again'
    });
  }
};
