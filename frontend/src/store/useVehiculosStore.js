import { create } from 'zustand'
import { getVehiculos } from '../services/vehiculosService'

const filtrosIniciales = {
  texto: '',
  condicion: '',
  marca: '',
  tipo: '',
  precioMax: '',
}

export const useVehiculosStore = create((set) => ({
  vehiculos: [],
  cargando: false,
  error: '',
  filtros: filtrosIniciales,

  cargar: async () => {
    set({ cargando: true, error: '' })
    try {
      const vehiculos = await getVehiculos()
      set({ vehiculos, cargando: false })
    } catch {
      set({
        error: 'No se pudo conectar con el servidor. ¿Está corriendo el backend?',
        cargando: false,
      })
    }
  },

  setFiltro: (campo, valor) =>
    set((s) => ({ filtros: { ...s.filtros, [campo]: valor } })),

  limpiarFiltros: () => set({ filtros: filtrosIniciales }),
}))

// Funciones auxiliares (fuera del store)
export function filtrar(vehiculos, f) {
  const texto = f.texto.trim().toLowerCase()
  return vehiculos.filter((v) => {
    if (texto && !v.name.toLowerCase().includes(texto)) return false
    if (f.condicion && v.condition !== f.condicion) return false
    if (f.marca && v.brand !== f.marca) return false
    if (f.tipo && v.type !== f.tipo) return false
    if (f.precioMax && v.price > Number(f.precioMax)) return false
    return true
  })
}

export function valoresUnicos(vehiculos, campo) {
  return [...new Set(vehiculos.map((v) => v[campo]).filter(Boolean))].sort()
}