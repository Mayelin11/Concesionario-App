import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { esPersonal, useAuthStore } from '../store/useAuthStore'

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/vehiculos', texto: 'Vehículos' },
  { to: '/prueba-de-conduccion', texto: 'Prueba de conducción' },
]

// Resalta en azul el enlace de la página donde estás.
const claseEnlace = ({ isActive }) =>
  `text-sm font-semibold transition hover:text-white ${isActive ? 'text-marca-claro' : 'text-suave'}`

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const navegar = useNavigate()
  const usuario = useAuthStore((s) => s.usuario)
  const salir = useAuthStore((s) => s.salir)

  const cerrarSesion = () => {
    salir()
    setAbierto(false)
    navegar('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-borde bg-fondo/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Auto<span className="text-marca">Plaza</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {enlaces.map((e) => (
            <NavLink key={e.to} to={e.to} end={e.to === '/'} className={claseEnlace}>
              {e.texto}
            </NavLink>
          ))}
          {esPersonal(usuario) && (
            <NavLink to="/panel" className={claseEnlace}>
              Panel
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {usuario ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="text-sm text-suave">{usuario.nombre}</span>
              <button
                onClick={cerrarSesion}
                className="text-sm font-semibold text-suave hover:text-white"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden text-sm font-semibold text-suave hover:text-white md:block"
            >
              Iniciar sesión
            </Link>
          )}
          <Link
            to="/prueba-de-conduccion"
            className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-white hover:bg-marca-oscuro"
          >
            Agendar prueba
          </Link>
          <button
            onClick={() => setAbierto(!abierto)}
            className="md:hidden"
            aria-label="Abrir menú"
          >
            {abierto ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {abierto && (
        <nav className="flex flex-col gap-4 border-t border-borde px-5 py-4 md:hidden">
          {enlaces.map((e) => (
            <NavLink
              key={e.to}
              to={e.to}
              end={e.to === '/'}
              onClick={() => setAbierto(false)}
              className={claseEnlace}
            >
              {e.texto}
            </NavLink>
          ))}
          {esPersonal(usuario) && (
            <NavLink to="/panel" onClick={() => setAbierto(false)} className={claseEnlace}>
              Panel
            </NavLink>
          )}
          {usuario ? (
            <button onClick={cerrarSesion} className="text-left text-sm font-semibold text-suave">
              Salir ({usuario.nombre})
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setAbierto(false)} className={claseEnlace}>
              Iniciar sesión
            </NavLink>
          )}
        </nav>
      )}
    </header>
  )
}