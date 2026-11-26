const jwt = require('jsonwebtoken')

const SECRETO = process.env.JWT_SECRET || 'secreto-solo-para-desarrollo'

// Crea el "pase" (token) que el navegador guardará después de iniciar sesión.
function firmarToken(usuario) {
  return jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRETO, { expiresIn: '8h' })
}

// Middleware: deja pasar solo si la petición trae un token válido.
function autenticar(req, res, next) {
  const cabecera = req.headers.authorization || ''
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Debes iniciar sesión' })
  try {
    req.usuario = jwt.verify(token, SECRETO)
    next()
  } catch {
    res.status(401).json({ error: 'Tu sesión expiró. Inicia sesión de nuevo' })
  }
}

// Middleware: deja pasar solo a los roles indicados, por ejemplo soloRoles('administrador').
function soloRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: 'No tienes permiso para esta acción' })
    }
    next()
  }
}

module.exports = { firmarToken, autenticar, soloRoles }