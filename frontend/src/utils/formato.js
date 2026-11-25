// Convierte 32500 en "US$ 32,500"
export const dinero = (valor) => `US$ ${Math.round(valor).toLocaleString('en-US')}`
export function manana() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}