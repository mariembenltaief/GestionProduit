const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔐 Vérifie le token (middleware protect)
const authenticateToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-mdp');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  } else {
    return res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

// ✅ Autorisation par rôle (admin, client, etc.)
const authByRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Non autorisé' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé : rôle non autorisé' });
    }
    next();
  };
};

module.exports = { authenticateToken, authByRole };
