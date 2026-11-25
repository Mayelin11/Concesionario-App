import { api } from './api'

export async function crearSolicitudPrueba(solicitud) {
  const { data } = await api.post('/pruebas-conduccion', solicitud)
  return data
}