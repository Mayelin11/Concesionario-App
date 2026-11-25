export const claseInput =
  'w-full rounded-lg border border-borde bg-fondo px-3 py-2 text-sm text-texto outline-none focus:border-marca'

export default function Campo({ etiqueta, children }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-suave">{etiqueta}</span>
      {children}
    </label>
  )
}