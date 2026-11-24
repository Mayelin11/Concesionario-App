import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <section className="mx-auto max-w-md px-5 py-24 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="mt-3 text-suave">La dirección que buscas no existe.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-marca px-5 py-3 text-sm font-semibold text-white hover:bg-marca-oscuro"
      >
        Ir al inicio
      </Link>
    </section>
  )
}