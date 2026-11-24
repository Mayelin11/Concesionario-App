import { Link } from 'react-router-dom'
import { CarFront, KeyRound, MapPin } from 'lucide-react'
import { dinero } from '../utils/formato.js'

export default function TarjetaVehiculo({ vehiculo: v }) {
  return (
    <article className="overflow-hidden rounded-xl border border-borde bg-superficie transition hover:-translate-y-1 hover:border-marca/60">
      <div className="relative grid aspect-[4/3] place-items-center bg-linear-to-br from-borde to-fondo">
        <CarFront className="size-16 text-marca-claro/70" />
        {v.pruebaDomicilio && (
          <span className="absolute bottom-3 left-3 flex items-center rounded-full bg-fondo/90 px-2.5 py-1 text-[11px] font-semibold">
            <KeyRound className="mr-1 size-3 text-marca-claro" />
            Prueba a domicilio
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-suave">{v.anio} · {v.estado}</p>
        <h3 className="mt-1 text-lg font-bold">{v.nombre}</h3>
        <p className="mt-2 text-xl font-extrabold text-marca-claro">{dinero(v.precio)}</p>
        <p className="mt-2 flex items-center text-xs text-suave">
          <MapPin className="mr-1 size-3.5" />
          {v.ubicacion} · {v.kilometraje}
        </p>
        <Link
          to="/vehiculos"
          className="mt-4 block rounded-md border border-marca py-2.5 text-center text-sm font-semibold text-marca-claro hover:bg-marca/10"
        >
          Ver detalles
        </Link>
      </div>
    </article>
  )
}