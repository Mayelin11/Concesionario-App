import { useAuthStore } from '../../store/useAuthStore'

// Pantalla temporal: en el siguiente paso se reemplaza por el panel completo.
export default function PanelInicio() {
  const usuario = useAuthStore((s) => s.usuario)

  return (
    <section className="mx-auto max-w-6xl space-y-3 px-4 py-16">
      <h1 className="text-3xl font-bold text-texto">Panel interno</h1>
      <p className="text-suave">
        Bienvenido, {usuario.nombre}. Tu rol es <strong className="text-marca-claro">{usuario.rol}</strong>.
      </p>
      <p className="text-suave">Aquí irán el inventario, las solicitudes y las ventas.</p>
    </section>
  )
}

