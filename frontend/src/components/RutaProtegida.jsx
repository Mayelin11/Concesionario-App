import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

// Envuelve las rutas que necesitan sesión. Si se pasan "roles", solo entran esos roles.
export default function RutaProtegida({ roles }) {
  const usuario = useAuthStore((s) => s.usuario)

  if (!usuario) return <Navigate to="/login" replace />
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/" replace />
  return <Outlet />
}