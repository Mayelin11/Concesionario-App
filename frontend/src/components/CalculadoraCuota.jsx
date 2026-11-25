import { useState } from 'react'
import Campo, { claseInput } from './Campo'
import { dinero } from '../utils/formato'

const opciones = [
  { nombre: 'Concesionario', tasa: 12.5 },
  { nombre: 'Banco Popular', tasa: 10.95 },
  { nombre: 'Banco BHD', tasa: 11.25 },
  { nombre: 'Scotiabank', tasa: 11.5 },
]
const plazos = [36, 48, 60, 72]

function cuotaMensual(monto, tasaAnual, meses) {
  if (monto <= 0) return 0
  const r = tasaAnual / 100 / 12
  if (r === 0) return monto / meses
  return (monto * r) / (1 - Math.pow(1 + r, -meses))
}

export default function CalculadoraCuota({ precio }) {
  const [entidad, setEntidad] = useState(0)
  const [plazo, setPlazo] = useState(60)
  const [inicial, setInicial] = useState(Math.round(precio * 0.2))

  const maxInicial = Math.round(precio * 0.4)
  const tasa = opciones[entidad].tasa
  const cuota = cuotaMensual(precio - inicial, tasa, plazo)

  return (
    <div className="space-y-4 rounded-xl border border-borde bg-superficie p-5">
      <h2 className="text-xl font-semibold text-texto">Calcula tu cuota</h2>

      <Campo etiqueta="Financiamiento con">
        <select
          className={claseInput}
          value={entidad}
          onChange={(e) => setEntidad(Number(e.target.value))}
        >
          {opciones.map((o, i) => (
            <option key={o.nombre} value={i}>
              {o.nombre} ({o.tasa}% anual)
            </option>
          ))}
        </select>
      </Campo>

      <Campo etiqueta="Plazo">
        <select
          className={claseInput}
          value={plazo}
          onChange={(e) => setPlazo(Number(e.target.value))}
        >
          {plazos.map((p) => (
            <option key={p} value={p}>{p} meses</option>
          ))}
        </select>
      </Campo>

      <Campo etiqueta={`Inicial: ${dinero(inicial)}`}>
        <input
          type="range"
          min="0"
          max={maxInicial}
          step="500"
          value={inicial}
          onChange={(e) => setInicial(Number(e.target.value))}
          className="w-full"
        />
      </Campo>

      <div className="rounded-lg bg-fondo p-4 text-center">
        <p className="text-sm text-suave">Cuota mensual estimada</p>
        <p className="text-3xl font-bold text-marca-claro">{dinero(Math.round(cuota))}</p>
      </div>

      <p className="text-xs text-suave">
        Cálculo de referencia. Las tasas y condiciones finales las confirma la entidad.
      </p>
    </div>
  )
}