

const path = require('path')
const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const { z } = require('zod')

const prisma = new PrismaClient()
const app = express()

const PORT = 4000
const BASE_URL = `http://localhost:${PORT}`

// Configuración general
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
    ],
  })
)

app.use(express.json({ limit: '1mb' }))

// Servir fotografías de los vehículos
app.use(
  '/imagenes',
  express.static(
    path.join(__dirname, '..', 'public', 'imagenes')
  )
)

// Convertir los registros de Prisma al formato del frontend
const aFormatoFrontend = (v) => ({
  id: v.id,
  name: v.nombre,
  brand: v.marca,
  type: v.tipo,
  status: v.estado,
  year: v.anio,
  condition: v.condicion,
  price: v.precio,
  location: v.ubicacion,
  mileage: v.kilometraje,
  fuel: v.combustible,
  transmission: v.transmision,
  image: v.imagen.startsWith('http')
    ? v.imagen
    : `${BASE_URL}${v.imagen}`,
  badge: v.insignia,
  description: v.descripcion,
  testDrive: v.pruebaDomicilio,
})

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API del concesionario funcionando',
  })
})

// Obtener todos los vehículos
app.get('/vehiculos', async (req, res) => {
  try {
    const vehiculos = await prisma.vehiculo.findMany({
      orderBy: { id: 'asc' },
    })

    res.json(vehiculos.map(aFormatoFrontend))
  } catch (error) {
    console.error('Error al consultar vehículos:', error)

    res.status(500).json({
      error: 'No se pudieron cargar los vehículos',
    })
  }
})

// Obtener un vehículo por ID
app.get('/vehiculos/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'El ID debe ser un número entero positivo',
    })
  }

  try {
    const vehiculo = await prisma.vehiculo.findUnique({
      where: { id },
    })

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado',
      })
    }

    res.json(aFormatoFrontend(vehiculo))
  } catch (error) {
    console.error('Error al buscar vehículo:', error)

    res.status(500).json({
      error: 'Error al buscar el vehículo',
    })
  }
})

// Horarios y lugares permitidos para las pruebas
const HORAS = [
  '9:00 AM',
  '10:30 AM',
  '12:00 PM',
  '2:00 PM',
  '3:30 PM',
  '5:00 PM',
]

const LUGARES = [
  'Mi casa',
  'Mi trabajo',
  'Otro punto acordado',
]

// Obtener la fecha actual en formato AAAA-MM-DD
function hoy() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')

  return `${d.getFullYear()}-${mes}-${dia}`
}

// Validar que una fecha sea real y posterior a hoy
function fechaValida(fecha) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false
  }

  const [anio, mes, dia] = fecha.split('-').map(Number)

  const fechaCalendario = new Date(
    Date.UTC(anio, mes - 1, dia)
  )

  const fechaReal =
    fechaCalendario.getUTCFullYear() === anio &&
    fechaCalendario.getUTCMonth() === mes - 1 &&
    fechaCalendario.getUTCDate() === dia

  return fechaReal && fecha > hoy()
}

// Esquema de validación de las solicitudes
const esquemaPrueba = z.object({
  vehiculoId: z
    .number()
    .int()
    .positive('Selecciona un vehículo'),

  fecha: z
    .string()
    .refine(
      fechaValida,
      'Selecciona una fecha válida posterior a hoy'
    ),

  hora: z.enum(HORAS, {
    message: 'Hora no válida',
  }),

  lugar: z.enum(LUGARES, {
    message: 'Lugar no válido',
  }),

  direccion: z
    .string()
    .trim()
    .min(5, 'La dirección es muy corta')
    .max(200, 'La dirección es demasiado larga'),

  nombre: z
    .string()
    .trim()
    .min(3, 'El nombre es muy corto')
    .max(100, 'El nombre es demasiado largo'),

  telefono: z
    .string()
    .trim()
    .regex(
      /^[0-9+\-\s()]{7,20}$/,
      'Teléfono no válido'
    ),
})

// Registrar una solicitud de prueba de conducción
app.post('/pruebas-conduccion', async (req, res) => {
  const resultado = esquemaPrueba.safeParse(req.body)

  if (!resultado.success) {
    return res.status(400).json({
      error: resultado.error.issues[0].message,
    })
  }

  const datos = resultado.data

  try {
    // Comprobar que el vehículo exista
    const vehiculo = await prisma.vehiculo.findUnique({
      where: { id: datos.vehiculoId },
    })

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Ese vehículo no existe',
      })
    }

    // Comprobar disponibilidad para prueba a domicilio
    if (
      !vehiculo.pruebaDomicilio ||
      vehiculo.estado !== 'Disponible'
    ) {
      return res.status(409).json({
        error: 'Este vehículo no está disponible para prueba a domicilio',
      })
    }

    // Registrar la solicitud
    const solicitud = await prisma.solicitudPrueba.create({
      data: datos,
    })

    return res.status(201).json({
      mensaje: 'Solicitud registrada correctamente',
      id: solicitud.id,
      vehiculo: vehiculo.nombre,
      fecha: solicitud.fecha,
      hora: solicitud.hora,
      lugar: solicitud.lugar,
      direccion: solicitud.direccion,
      nombre: solicitud.nombre,
      telefono: solicitud.telefono,
      estado: solicitud.estado,
    })
  } catch (error) {
    console.error('Error al registrar solicitud:', error)

    return res.status(500).json({
      error: 'Error interno del servidor',
    })
  }
})

// Ruta para manejar direcciones inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
  })
})

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`API lista en ${BASE_URL}`)
})

// Cerrar conexiones correctamente
async function cerrarServidor() {
  console.log('Cerrando servidor...')

  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
}

process.on('SIGINT', cerrarServidor)
process.on('SIGTERM', cerrarServidor)
