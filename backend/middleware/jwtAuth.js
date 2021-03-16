const jwt = require('jsonwebtoken'); // Importation du package jwt

// Exportation du middleware pour les vérification de l'authentification avec les tokens
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id;
    if (req.body.id && req.body.id !== id) {
      throw 'id invalide !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide !')
    });
  }
};