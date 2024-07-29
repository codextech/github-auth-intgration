const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  const [text , access_token] = token.split(' ');
  jwt.verify(access_token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Failed to authenticate token' })
    };

    req.userId = decoded.id;
    next();
  });
};

module.exports = { generateToken, verifyToken };
