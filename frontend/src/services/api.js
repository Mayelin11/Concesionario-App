import axios from 'axios'
import { adaptadorDemo } from './demoApi'

// Modo demostración: se activa solo en la versión publicada (build) cuando no hay
// una URL de API, o a la fuerza con VITE_DEMO=true. En tu computadora (npm run dev)
// se usa el backend real.
export const MODO_DEMO =
  import.meta.env.VITE_DEMO === 'true' ||
  (import.meta.env.PROD && !import.meta.env.VITE_API_URL)

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  ...(MODO_DEMO && { adapter: adaptadorDemo }),
})

// Si hay una sesión guardada, envía el token en cada petición.
api.interceptors.request.use((config) => {
  try {
    const sesion = JSON.parse(localStorage.getItem('autoplaza_sesion') || 'null')
    if (sesion?.token) config.headers.Authorization = `Bearer ${sesion.token}`
  } catch {
    // sin sesión guardada
  }
  return config
})