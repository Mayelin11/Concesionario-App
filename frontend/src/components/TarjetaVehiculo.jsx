import { Link } from 'react-router-dom'
import { dinero } from '../utils/formato'

export default function TarjetaVehiculo({ v }) {
  return (
    <article className="overflow-hidden rounded-xl border border-borde bg-superficie">
      <img src={v.image} alt={v.name} className="h-44 w-full object-cover" />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-texto">{v.name}</h3>
          {v.badge && (
            <span className="rounded-full bg-marca/20 px-2 py-0.5 text-xs text-marca-claro">
              {v.badge}
            </span>
          )}
        </div>
        <p className="text-sm text-suave">
          {v.year} · {v.condition} · {v.location}
        </p>
        <p className="text-lg font-bold text-marca-claro">{dinero(v.price)}</p>
        <div className="flex gap-2 pt-1">
          <Link
            to={`/vehiculos/${v.id}`}
            className="flex-1 rounded-lg bg-marca px-3 py-2 text-center text-sm font-medium text-white hover:bg-marca-oscuro"
          >
            Ver detalle
          </Link>
          {v.testDrive && v.status === 'Disponible' && (
            <Link
              to={`/prueba-de-conduccion?vehiculo=${v.id}`}
              className="flex-1 rounded-lg border border-borde px-3 py-2 text-center text-sm text-texto hover:bg-borde"
            >
              Probar en casa
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}