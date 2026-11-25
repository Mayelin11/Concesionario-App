import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CalculadoraCuota from '../components/CalculadoraCuota'
import { getVehiculo } from '../services/vehiculosService'
import { dinero } from '../utils/formato'

export default function DetalleVehiculo() {
  const { id } = useParams()
  const [v, setV] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setV(null)
    setError('')
    getVehiculo(id)
      .then(setV)
      .catch((e) =>
        setError(
          e.response?.status === 404
            ? 'Ese vehículo no existe.'
            : 'No se pudo cargar el vehículo.'
        )
      )
  }, [id])

  if (error)
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-red-400">{error}</p>
        <Link to="/vehiculos" className="text-marca-claro hover:underline">
          Volver al catálogo
        </Link>
      </section>
    )
  if (!v)
    return <p className="mx-auto max-w-6xl px-4 py-10 text-suave">Cargando...</p>

  const datos = [
    ['Año', v.year],
    ['Condición', v.condition],
    ['Kilometraje', v.mileage],
    ['Combustible', v.fuel],
    ['Transmisión', v.transmission],
    ['Ubicación', v.location],
    ['Estado', v.status],
  ]

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-start">
      <div className="space-y-4">
        <img src={v.image} alt={v.name} className="w-full rounded-xl border border-borde" />
        <h1 className="text-3xl font-bold text-texto">{v.name}</h1>
        <p className="text-2xl font-bold text-marca-claro">{dinero(v.price)}</p>
        <p className="text-suave">{v.description}</p>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          {datos.map(([k, val]) => (
            <div key={k} className="rounded-lg border border-borde bg-superficie p-3">
              <dt className="text-suave">{k}</dt>
              <dd className="text-texto">{val}</dd>
            </div>
          ))}
        </dl>

        {v.testDrive && v.status === 'Disponible' && (
          <Link
            to={`/prueba-de-conduccion?vehiculo=${v.id}`}
            className="inline-block rounded-lg bg-marca px-5 py-3 font-medium text-white hover:bg-marca-oscuro"
          >
            Solicitar prueba de conducción en mi casa
          </Link>
        )}
      </div>

      <CalculadoraCuota precio={v.price} />
    </section>
  )
}