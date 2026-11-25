import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListaVehiculos from '../components/ListaVehiculos'
import { useVehiculosStore } from '../store/useVehiculosStore'

export default function Inicio() {
  const { vehiculos, cargando, error, cargar } = useVehiculosStore()

  useEffect(() => {
    cargar()
  }, [cargar])

  return (
    <div>
      <section className="mx-auto max-w-6xl space-y-4 px-4 py-16">
        <h1 className="text-4xl font-bold text-texto">
          Encuentra tu próximo vehículo
        </h1>
        <p className="max-w-2xl text-suave">
          Nuevos y usados, con financiamiento. Pide una prueba de conducción
          en tu casa, sin ir primero al concesionario.
        </p>
        <Link
          to="/vehiculos"
          className="inline-block rounded-lg bg-marca px-5 py-3 font-medium text-white hover:bg-marca-oscuro"
        >
          Ver todos los vehículos
        </Link>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-16">
        <h2 className="text-2xl font-semibold text-texto">Destacados</h2>
        <ListaVehiculos
          vehiculos={vehiculos.slice(0, 3)}
          cargando={cargando}
          error={error}
        />
      </section>
    </div>
  )
}