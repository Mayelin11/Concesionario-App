// Convierte 32500 en "US$ 32,500"
export const dinero = (valor) => `US$ ${Math.round(valor).toLocaleString('en-US')}`