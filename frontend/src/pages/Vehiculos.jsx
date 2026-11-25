import { useEffect, useMemo } from 'react'
import Filtros from '../components/Filtros'
import ListaVehiculos from '../components/ListaVehiculos'
import { useVehiculosStore, filtrar } from '../store/useVehiculosStore'

export default function Vehiculos() {
  const { vehiculos, cargando, error, filtros, cargar, setFiltro, limpiarFiltros } =
    useVehiculosStore()

  useEffect(() => {
    cargar()
  }, [cargar])

  const visibles = useMemo(() => filtrar(vehiculos, filtros), [vehiculos, filtros])

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-texto">Vehículos</h1>
      <Filtros
        vehiculos={vehiculos}
        filtros={filtros}
        setFiltro={setFiltro}
        limpiar={limpiarFiltros}
      />
      <p className="text-sm text-suave">{visibles.length} resultado(s)</p>
      <ListaVehiculos vehiculos={visibles} cargando={cargando} error={error} />
    </section>
  )
}