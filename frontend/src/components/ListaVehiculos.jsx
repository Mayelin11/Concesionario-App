import TarjetaVehiculo from './TarjetaVehiculo'

export default function ListaVehiculos({ vehiculos, cargando, error }) {
  if (cargando) return <p className="text-suave">Cargando vehículos...</p>
  if (error) return <p className="text-red-400">{error}</p>
  if (vehiculos.length === 0)
    return <p className="text-suave">No hay vehículos para mostrar.</p>

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehiculos.map((v) => (
        <TarjetaVehiculo key={v.id} v={v} />
      ))}
    </div>
  )
}