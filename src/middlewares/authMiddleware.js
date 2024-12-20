const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  const bearerToken = token.split(' ')[1];

  if (!bearerToken) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log('Error in token verification:', err);
    res.status(400).json({ error: 'Invalid token' });
  }
};
