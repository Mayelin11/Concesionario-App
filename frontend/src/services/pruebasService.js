export async function crearSolicitudPrueba(solicitud) {
  await new Promise((r) => setTimeout(r, 600))
  return { ...solicitud, id: Date.now(), estado: 'Pendiente de confirmación' }
}