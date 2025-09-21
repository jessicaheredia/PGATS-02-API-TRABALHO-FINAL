const userService = require('../services/userService');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  
  if (!auth) return res.status(401).json({ error: 'Token não fornecido' });
  const parts = auth.split(' ');
  
  if (parts.length !== 2) return res.status(401).json({ error: 'Token inválido' });
  const token = parts[1];
  try {
    const decoded = userService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authMiddleware;
