const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const personal = [
  { nombre: 'Administrador', correo: 'admin@autoplaza.do', rol: 'administrador' },
  { nombre: 'Vendedor de prueba', correo: 'vendedor@autoplaza.do', rol: 'vendedor' },
]

async function main() {
  const password = await bcrypt.hash('Cambiar123!', 10)
  for (const p of personal) {
    await prisma.usuario.upsert({
      where: { correo: p.correo },
      update: {},
      create: { ...p, password, aceptaDatos: true, fechaConsentimiento: new Date() },
    })
    console.log('Listo:', p.correo, '(' + p.rol + ')')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())