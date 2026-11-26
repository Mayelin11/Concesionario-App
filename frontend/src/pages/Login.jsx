import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Campo, { claseInput } from '../components/Campo'
import { esPersonal, useAuthStore } from '../store/useAuthStore'
import { MODO_DEMO } from '../services/api'

export default function Login() {
  const navegar = useNavigate()
  const entrar = useAuthStore((s) => s.entrar)

  const [form, setForm] = useState({ correo: '', password: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  async function enviar(e) {
    e.preventDefault()
    setEnviando(true)
    setError('')
    try {
      const usuario = await entrar(form)
      // El personal va a su panel; el cliente, al inicio.
      navegar(esPersonal(usuario) ? '/panel' : '/')
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo conectar con el servidor.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-6 px-4 py-16">
      <div>
        <h1 className="text-3xl font-bold text-texto">Iniciar sesión</h1>
        <p className="text-suave">Clientes y personal del concesionario entran por aquí.</p>
      </div>

      <form onSubmit={enviar} className="space-y-4">
        <Campo etiqueta="Correo electrónico">
          <input type="email" className={claseInput} required
            value={form.correo} onChange={cambiar('correo')} />
        </Campo>
        <Campo etiqueta="Contraseña">
          <input type="password" className={claseInput} required
            value={form.password} onChange={cambiar('password')} />
        </Campo>

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-marca px-5 py-3 font-medium text-white hover:bg-marca-oscuro disabled:opacity-50"
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-center text-sm text-suave">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-marca-claro hover:underline">
            Regístrate
          </Link>
        </p>

        {MODO_DEMO && (
          <div className="rounded-lg border border-borde bg-superficie p-4 text-sm text-suave">
            <p className="mb-2 font-semibold text-texto">Versión de demostración</p>
            <p>Personal: <strong>vendedor@autoplaza.do</strong> o <strong>admin@autoplaza.do</strong></p>
            <p>Contraseña: <strong>Cambiar123!</strong></p>
            <p className="mt-2">También puedes crear tu propia cuenta de cliente en Regístrate.</p>
          </div>
        )}
      </form>
    </section>
  )
}