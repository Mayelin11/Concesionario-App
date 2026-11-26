import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4000',
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