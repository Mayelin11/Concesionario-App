// Llena la base de datos con vehículos de ejemplo.
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const vehiculos = [
  { nombre: 'Toyota RAV4 XLE', marca: 'Toyota', tipo: 'SUV', estado: 'Disponible', anio: 2022, condicion: 'Usado', precio: 32500, ubicacion: 'Santo Domingo Este', kilometraje: '34,800 km', combustible: 'Gasolina', transmision: 'Automática', imagen: '/imagenes/rav4.svg', insignia: 'Destacado', descripcion: 'SUV familiar, cómoda y lista para cualquier aventura. Excelente estado y con historial de mantenimiento.', pruebaDomicilio: true },
  { nombre: 'Mercedes-Benz GLC 300', marca: 'Mercedes-Benz', tipo: 'SUV', estado: 'Reservado', anio: 2021, condicion: 'Usado', precio: 48900, ubicacion: 'Distrito Nacional', kilometraje: '29,100 km', combustible: 'Gasolina', transmision: 'Automática', imagen: '/imagenes/glc.svg', insignia: 'Premium', descripcion: 'Lujo, tecnología y seguridad en una SUV premium con terminaciones impecables.', pruebaDomicilio: false },
  { nombre: 'Hyundai Tucson Limited', marca: 'Hyundai', tipo: 'SUV', estado: 'Disponible', anio: 2023, condicion: 'Nuevo', precio: 36700, ubicacion: 'Santo Domingo Este', kilometraje: '0 km', combustible: 'Gasolina', transmision: 'Automática', imagen: '/imagenes/tucson.svg', insignia: 'Entrega a domicilio', descripcion: 'Diseño moderno, amplio interior y tecnología para disfrutar cada recorrido.', pruebaDomicilio: true },
  { nombre: 'Jeep Wrangler Sport', marca: 'Jeep', tipo: '4x4', estado: 'Disponible', anio: 2020, condicion: 'Usado', precio: 38250, ubicacion: 'Santo Domingo Este', kilometraje: '42,500 km', combustible: 'Gasolina', transmision: 'Manual', imagen: '/imagenes/wrangler.svg', insignia: '', descripcion: 'El clásico 4x4 para salir de la ciudad y vivir cada camino a tu manera.', pruebaDomicilio: true },
]

async function main() {
  await prisma.vehiculo.deleteMany() // limpia primero para no duplicar si lo corres dos veces
  await prisma.vehiculo.createMany({ data: vehiculos })
  console.log(`Se crearon ${vehiculos.length} vehículos`)
}

main().finally(() => prisma.$disconnect())