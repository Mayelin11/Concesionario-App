import { api } from './api'

export async function getVehiculos() {
  const { data } = await api.get('/vehiculos')
  return data
}

export async function getVehiculo(id) {
  const { data } = await api.get(`/vehiculos/${id}`)
  return data
}