import Campo, { claseInput } from './Campo'
import { valoresUnicos } from '../store/useVehiculosStore'

export default function Filtros({ vehiculos, filtros, setFiltro, limpiar }) {
  return (
    <div className="grid gap-4 rounded-xl border border-borde bg-superficie p-4 sm:grid-cols-2 lg:grid-cols-5">
      <Campo etiqueta="Buscar">
        <input
          className={claseInput}
          value={filtros.texto}
          onChange={(e) => setFiltro('texto', e.target.value)}
          placeholder="Ej: RAV4"
        />
      </Campo>

      <Campo etiqueta="Condición">
        <select
          className={claseInput}
          value={filtros.condicion}
          onChange={(e) => setFiltro('condicion', e.target.value)}
        >
          <option value="">Todas</option>
          {valoresUnicos(vehiculos, 'condition').map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Campo>

      <Campo etiqueta="Marca">
        <select
          className={claseInput}
          value={filtros.marca}
          onChange={(e) => setFiltro('marca', e.target.value)}
        >
          <option value="">Todas</option>
          {valoresUnicos(vehiculos, 'brand').map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </Campo>

      <Campo etiqueta="Tipo">
        <select
          className={claseInput}
          value={filtros.tipo}
          onChange={(e) => setFiltro('tipo', e.target.value)}
        >
          <option value="">Todos</option>
          {valoresUnicos(vehiculos, 'type').map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Campo>

      <Campo etiqueta="Precio máximo (US$)">
        <input
          type="number"
          min="0"
          className={claseInput}
          value={filtros.precioMax}
          onChange={(e) => setFiltro('precioMax', e.target.value)}
          placeholder="Ej: 40000"
        />
      </Campo>

      <div className="sm:col-span-2 lg:col-span-5">
        <button
          type="button"
          onClick={limpiar}
          className="text-sm text-marca-claro hover:underline"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}