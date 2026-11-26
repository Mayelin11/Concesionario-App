import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Campo, { claseInput } from '../components/Campo'
import { useAuthStore } from '../store/useAuthStore'

export default function Registro() {
  const navegar = useNavigate()
  const registrarse = useAuthStore((s) => s.registrarse)

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    password: '',
    aceptaDatos: false,
  })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  async function enviar(e) {
    e.preventDefault()
    setEnviando(true)
    setError('')
    try {
      await registrarse(form)
      navegar('/')
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo conectar con el servidor.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-6 px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold text-texto">Crear cuenta</h1>
        <p className="text-suave">
          Regístrate para pedir pruebas de conducción y dar seguimiento a tus compras.
        </p>
      </div>

      <form onSubmit={enviar} className="space-y-4">
        <Campo etiqueta="Nombre completo">
          <input className={claseInput} required minLength={3}
            value={form.nombre} onChange={cambiar('nombre')} />
        </Campo>
        <Campo etiqueta="Correo electrónico">
          <input type="email" className={claseInput} required
            value={form.correo} onChange={cambiar('correo')} />
        </Campo>
        <Campo etiqueta="Contraseña (mínimo 8 caracteres)">
          <input type="password" className={claseInput} required minLength={8}
            value={form.password} onChange={cambiar('password')} />
        </Campo>

        <label className="flex items-start gap-3 rounded-lg border border-borde bg-superficie p-4 text-sm text-suave">
          <input
            type="checkbox"
            className="mt-1"
            checked={form.aceptaDatos}
            onChange={(e) => setForm({ ...form, aceptaDatos: e.target.checked })}
          />
          <span>
            Acepto que AutoPlaza use mis datos personales para gestionar mis solicitudes,
            conforme a la Ley 172-13 de Protección de Datos Personales.
          </span>
        </label>

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-marca px-5 py-3 font-medium text-white hover:bg-marca-oscuro disabled:opacity-50"
        >
          {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <p className="text-center text-sm text-suave">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-marca-claro hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </section>
  )
}