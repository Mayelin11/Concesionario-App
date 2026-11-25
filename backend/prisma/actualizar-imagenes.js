const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const imagenes = [
  {
    nombre: 'Toyota RAV4 XLE',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Toyota_Rav4_XLE_Hybrid_2022.jpg',
  },
  {
    nombre: 'Mercedes-Benz GLC 300',
    imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Mercedes-Benz_GLC-Klasse_%28X253%29_GLC_300_de_4MATIC_%282021%29_%2853332511205%29.jpg/960px-Mercedes-Benz_GLC-Klasse_%28X253%29_GLC_300_de_4MATIC_%282021%29_%2853332511205%29.jpg',
  },
  {
    nombre: 'Hyundai Tucson Limited',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/2023_Hyundai_Tucson_Signature_%28India%29_front_view.jpg',
  },
  {
    nombre: 'Jeep Wrangler Sport',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/2020_Jeep_Wrangler_Rubicon_Auto.jpg',
  },
]

async function main() {
  for (const vehiculo of imagenes) {
    const resultado = await prisma.vehiculo.updateMany({
      where: { nombre: vehiculo.nombre },
      data: { imagen: vehiculo.imagen },
    })

    console.log(
      `${vehiculo.nombre}: ${resultado.count} registro(s) actualizado(s)`
    )
  }
}

main()
  .catch((error) => {
    console.error('Error al actualizar las imágenes:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })