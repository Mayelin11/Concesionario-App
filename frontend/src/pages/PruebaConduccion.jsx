import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Campo, { claseInput } from '../components/Campo'
import { useVehiculosStore } from '../store/useVehiculosStore'
import { crearSolicitudPrueba } from '../services/pruebasService'
import { manana } from '../utils/formato'

const horas = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM']
const lugares = ['Mi casa', 'Mi trabajo', 'Otro punto acordado']

export default function PruebaConduccion() {
  const [params] = useSearchParams()
  const { vehiculos, cargar } = useVehiculosStore()

  const [form, setForm] = useState({
    vehiculoId: params.get('vehiculo') || '',
    fecha: '',
    hora: '',
    lugar: 'Mi casa',
    direccion: '',
    nombre: '',
    telefono: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    cargar()
  }, [cargar])

  const disponibles = vehiculos.filter((v) => v.testDrive && v.status === 'Disponible')

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  async function enviar(e) {
    e.preventDefault()
    setEnviando(true)
    setError('')
    try {
      const r = await crearSolicitudPrueba({
        ...form,
        vehiculoId: Number(form.vehiculoId),
      })
      setResultado(r)
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo enviar la solicitud.')
    } finally {
      setEnviando(false)
    }
  }

  if (resultado)
    return (
      <section className="mx-auto max-w-xl space-y-4 px-4 py-10">
        <h1 className="text-3xl font-bold text-texto">¡Solicitud enviada!</h1>
        <p className="text-suave">
          Estado: <strong className="text-marca-claro">{resultado.estado}</strong>. Te
          contactaremos al {resultado.telefono} para confirmar la visita el{' '}
          {resultado.fecha} a las {resultado.hora}.
        </p>
        <Link to="/vehiculos" className="text-marca-claro hover:underline">
          Volver al catálogo
        </Link>
      </section>
    )

  return (
    <section className="mx-auto max-w-xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold text-texto">Prueba de conducción</h1>
        <p className="text-suave">
          Lleva el vehículo al lugar que acordemos, sin ir primero al concesionario.
          Sujeto a disponibilidad del vehículo.
        </p>
      </div>

      <form onSubmit={enviar} className="space-y-4">
        <Campo etiqueta="Vehículo">
          <select className={claseInput} required value={form.vehiculoId} onChange={cambiar('vehiculoId')}>
            <option value="">Selecciona un vehículo</option>
            {disponibles.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </Campo>

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Fecha">
            <input type="date" required min={manana()} className={claseInput}
              value={form.fecha} onChange={cambiar('fecha')} />
          </Campo>
          <Campo etiqueta="Hora">
            <select className={claseInput} required value={form.hora} onChange={cambiar('hora')}>
              <option value="">Selecciona</option>
              {horas.map((h) => <option key={h}>{h}</option>)}
            </select>
          </Campo>
        </div>

        <Campo etiqueta="Lugar de la prueba">
          <select className={claseInput} value={form.lugar} onChange={cambiar('lugar')}>
            {lugares.map((l) => <option key={l}>{l}</option>)}
          </select>
        </Campo>

        <Campo etiqueta="Dirección">
          <input className={claseInput} required minLength={5} value={form.direccion}
            onChange={cambiar('direccion')} placeholder="Calle, sector, ciudad" />
        </Campo>

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Nombre completo">
            <input className={claseInput} required minLength={3} value={form.nombre}
              onChange={cambiar('nombre')} />
          </Campo>
          <Campo etiqueta="Teléfono">
            <input className={claseInput} required value={form.telefono}
              onChange={cambiar('telefono')} placeholder="809-555-1234" />
          </Campo>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-marca px-5 py-3 font-medium text-white hover:bg-marca-oscuro disabled:opacity-50"
        >
          {enviando ? 'Enviando...' : 'Solicitar prueba'}
        </button>
      </form>
    </section>
  )
}