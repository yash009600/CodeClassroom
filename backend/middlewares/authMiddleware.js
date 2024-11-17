const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // console.log("auth middleware")
  // console.log("hii")
  const token = req.headers.authorization;
  // console.log(token);
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("req.user :", req.user)
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
