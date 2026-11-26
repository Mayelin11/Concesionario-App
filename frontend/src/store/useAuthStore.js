import { create } from 'zustand'
import { iniciarSesion, registrar } from '../services/authService'

const CLAVE = 'autoplaza_sesion'

const leerSesion = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE))
  } catch {
    return null
  }
}

const guardarSesion = (sesion) => {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(sesion))
  } catch {
    // si el navegador no deja guardar, la sesión dura hasta recargar
  }
}

const inicial = leerSesion()

export const useAuthStore = create((set) => ({
  usuario: inicial?.usuario || null,
  token: inicial?.token || null,

  entrar: async (datos) => {
    const sesion = await iniciarSesion(datos)
    guardarSesion(sesion)
    set({ usuario: sesion.usuario, token: sesion.token })
    return sesion.usuario
  },

  registrarse: async (datos) => {
    const sesion = await registrar(datos)
    guardarSesion(sesion)
    set({ usuario: sesion.usuario, token: sesion.token })
    return sesion.usuario
  },

  salir: () => {
    try {
      localStorage.removeItem(CLAVE)
    } catch {
      // nada que borrar
    }
    set({ usuario: null, token: null })
  },
}))

// El personal es quien puede entrar al panel interno.
export const esPersonal = (usuario) =>
  !!usuario && ['administrador', 'vendedor'].includes(usuario.rol)