import { AxiosError } from 'axios'
import vehiculosJson from '../demo/vehiculos.json'

// Modo demostración: simula el backend con datos del navegador (sin servidor).
// Las cuentas y solicitudes creadas se guardan en localStorage de quien visita la página.

const CLAVE = 'autoplaza_demo'

const HORAS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM']
const LUGARES = ['Mi casa', 'Mi trabajo', 'Otro punto acordado']

// Las imágenes locales del backend se sirven ahora desde /public/imagenes del frontend.
const vehiculos = vehiculosJson.map((v) => ({
  ...v,
  image: v.image.replace('http://localhost:4000', ''),
}))

const datosIniciales = () => ({
  usuarios: [
    { id: 1, nombre: 'Administrador', correo: 'admin@autoplaza.do', password: 'Cambiar123!', rol: 'administrador' },
    { id: 2, nombre: 'Vendedor de prueba', correo: 'vendedor@autoplaza.do', password: 'Cambiar123!', rol: 'vendedor' },
  ],
  solicitudes: [],
})

let memoria = null

function leer() {
  if (memoria) return memoria
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE))
    if (guardado?.usuarios) memoria = guardado
  } catch {
    // sin datos guardados
  }
  if (!memoria) memoria = datosIniciales()
  return memoria
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(memoria))
  } catch {
    // si no se puede guardar, los datos duran hasta recargar
  }
}

const usuarioPublico = (u) => ({ id: u.id, nombre: u.nombre, correo: u.correo, rol: u.rol })
const error = (status, mensaje) => ({ status, data: { error: mensaje } })

function hoy() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

function manejar(metodo, ruta, body, cabeceras) {
  const datos = leer()

  if (metodo === 'get' && ruta === '/vehiculos') {
    return { status: 200, data: vehiculos }
  }

  if (metodo === 'get' && /^\/vehiculos\/\d+$/.test(ruta)) {
    const v = vehiculos.find((x) => x.id === Number(ruta.split('/')[2]))
    return v ? { status: 200, data: v } : error(404, 'Vehículo no encontrado')
  }

  if (metodo === 'post' && ruta === '/pruebas-conduccion') {
    const v = vehiculos.find((x) => x.id === body.vehiculoId)
    if (!v) return error(404, 'Ese vehículo no existe')
    if (!(typeof body.fecha === 'string' && body.fecha > hoy()))
      return error(400, 'Selecciona una fecha válida posterior a hoy')
    if (!HORAS.includes(body.hora)) return error(400, 'Hora no válida')
    if (!LUGARES.includes(body.lugar)) return error(400, 'Lugar no válido')
    if (String(body.direccion || '').trim().length < 5) return error(400, 'La dirección es muy corta')
    if (String(body.nombre || '').trim().length < 3) return error(400, 'El nombre es muy corto')
    if (!/^[0-9+\-\s()]{7,20}$/.test(String(body.telefono || '').trim())) return error(400, 'Teléfono no válido')
    if (!v.testDrive || v.status !== 'Disponible')
      return error(409, 'Este vehículo no está disponible para prueba a domicilio')

    const solicitud = {
      id: datos.solicitudes.length + 1,
      vehiculoId: v.id,
      vehiculo: v.name,
      fecha: body.fecha,
      hora: body.hora,
      lugar: body.lugar,
      direccion: String(body.direccion).trim(),
      nombre: String(body.nombre).trim(),
      telefono: String(body.telefono).trim(),
      estado: 'Pendiente',
    }
    datos.solicitudes.push(solicitud)
    guardar()
    return { status: 201, data: { mensaje: 'Solicitud registrada correctamente', ...solicitud } }
  }

  if (metodo === 'post' && ruta === '/auth/registro') {
    const nombre = String(body.nombre || '').trim()
    const correo = String(body.correo || '').trim().toLowerCase()
    if (nombre.length < 3) return error(400, 'El nombre es muy corto')
    if (!/^\S+@\S+\.\S+$/.test(correo)) return error(400, 'Correo no válido')
    if (String(body.password || '').length < 8)
      return error(400, 'La contraseña debe tener al menos 8 caracteres')
    if (body.aceptaDatos !== true)
      return error(400, 'Debes aceptar el tratamiento de tus datos personales')
    if (datos.usuarios.some((u) => u.correo === correo))
      return error(409, 'Ya existe una cuenta con ese correo')

    const usuario = {
      id: Math.max(...datos.usuarios.map((u) => u.id)) + 1,
      nombre,
      correo,
      password: body.password,
      rol: 'cliente',
    }
    datos.usuarios.push(usuario)
    guardar()
    return { status: 201, data: { token: `demo-${usuario.id}`, usuario: usuarioPublico(usuario) } }
  }

  if (metodo === 'post' && ruta === '/auth/login') {
    const correo = String(body.correo || '').trim().toLowerCase()
    const usuario = datos.usuarios.find((u) => u.correo === correo && u.password === body.password)
    if (!usuario) return error(401, 'Correo o contraseña incorrectos')
    return { status: 200, data: { token: `demo-${usuario.id}`, usuario: usuarioPublico(usuario) } }
  }

  if (metodo === 'get' && ruta === '/auth/yo') {
    const token = String(cabeceras?.Authorization || '').replace('Bearer ', '')
    const usuario = datos.usuarios.find((u) => `demo-${u.id}` === token)
    return usuario ? { status: 200, data: usuarioPublico(usuario) } : error(401, 'Debes iniciar sesión')
  }

  return error(404, 'Ruta no encontrada')
}

export function adaptadorDemo(config) {
  return new Promise((resolve, reject) => {
    let body = config.data
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        body = {}
      }
    }
    const ruta = (config.url || '').split('?')[0]
    const { status, data } = manejar((config.method || 'get').toLowerCase(), ruta, body || {}, config.headers)
    const respuesta = { data, status, statusText: String(status), headers: {}, config, request: {} }

    // Pequeña espera para que se vea el estado "Cargando..." como con un servidor real.
    setTimeout(() => {
      if (status < 400) resolve(respuesta)
      else reject(new AxiosError(data.error, AxiosError.ERR_BAD_REQUEST, config, {}, respuesta))
    }, 250)
  })
}