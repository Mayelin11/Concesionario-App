const path = require('path')
const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

const PORT = 4000
const BASE_URL = `http://localhost:${PORT}`

// Permite que el frontend (Vite usa el puerto 5173) le pida datos a esta API.
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }))
app.use(express.json())

// Las fotos de los vehículos viven en backend/public/imagenes y se sirven desde aquí.
app.use('/imagenes', express.static(path.join(__dirname, '..', 'public', 'imagenes')))

// Traduce un registro de la base de datos al formato que usa el frontend.
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
  image: v.imagen.startsWith('http') ? v.imagen : `${BASE_URL}${v.imagen}`,
  badge: v.insignia,
  description: v.descripcion,
  testDrive: v.pruebaDomicilio,
})

app.get('/', (req, res) => {
  res.json({ mensaje: 'API del concesionario funcionando' })
})

// GET /vehiculos -> lista todos los vehículos
app.get('/vehiculos', async (req, res) => {
  try {
    const vehiculos = await prisma.vehiculo.findMany({ orderBy: { id: 'asc' } })
    res.json(vehiculos.map(aFormatoFrontend))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudieron cargar los vehículos' })
  }
})

// GET /vehiculos/3 -> un solo vehículo
app.get('/vehiculos/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'El id debe ser un número' })
  try {
    const vehiculo = await prisma.vehiculo.findUnique({ where: { id } })
    if (!vehiculo) return res.status(404).json({ error: 'Vehículo no encontrado' })
    res.json(aFormatoFrontend(vehiculo))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al buscar el vehículo' })
  }
})

app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`))