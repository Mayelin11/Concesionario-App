import { api } from './api'

export async function registrar(datos) {
  const { data } = await api.post('/auth/registro', datos)
  return data
}

export async function iniciarSesion(datos) {
  const { data } = await api.post('/auth/login', datos)
  return data
}