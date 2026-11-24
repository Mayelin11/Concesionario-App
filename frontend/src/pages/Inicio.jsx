import { Link } from 'react-router-dom'
import { Check, KeyRound, Search, ShieldCheck, Truck } from 'lucide-react'
import TarjetaVehiculo from '../components/TarjetaVehiculo.jsx'

// Datos de ejemplo. En el paso 5 vendrán de la API.
const destacados = [
  { id: 1, nombre: 'Toyota RAV4 XLE', anio: 2022, estado: 'Usado', precio: 32500, ubicacion: 'Santo Domingo Este', kilometraje: '34,800 km', pruebaDomicilio: true },
  { id: 2, nombre: 'Hyundai Tucson Limited', anio: 2023, estado: 'Nuevo', precio: 36700, ubicacion: 'Santo Domingo Este', kilometraje: '0 km', pruebaDomicilio: true },
  { id: 3, nombre: 'Jeep Wrangler Sport', anio: 2020, estado: 'Usado', precio: 38250, ubicacion: 'Santo Domingo Este', kilometraje: '42,500 km', pruebaDomicilio: true },
]

const pasos = [
  ['Elige el vehículo', 'Solo los marcados con “Prueba a domicilio”.'],
  ['Propón fecha, hora y lugar', 'Llena la solicitud con tus datos de contacto.'],
  ['Confirma con el asesor', 'Acordamos la ubicación exacta y la disponibilidad.'],
  ['Maneja y decide', 'Si te gusta, continúas con la compra y el financiamiento.'],
]

const condiciones = [
  'Sujeto a la disponibilidad del vehículo en la fecha solicitada.',
  'La ubicación debe ser acordada y confirmada previamente con el asesor.',
  'El conductor debe presentar licencia vigente y documento de identidad.',
  'El concesionario puede reprogramar o cancelar por seguridad o clima.',
]

export default function Inicio() {
  return (
    <>
      {/* Portada */}
      <section className="relative overflow-hidden px-5 pb-20 pt-16 lg:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.25),transparent_45%)]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-marca-claro">
            Compra, financia y pruébalo sin salir de casa
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Tu próximo carro <span className="text-marca">empieza aquí.</span>
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-suave">
            Elige tu vehículo, solicita una prueba de conducción donde tú indiques, financia con el
            concesionario o con tu banco y recíbelo en tu casa.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/prueba-de-conduccion" className="flex items-center rounded-md bg-marca px-5 py-3 text-sm font-semibold text-white hover:bg-marca-oscuro">
              <KeyRound className="mr-2 size-4" />
              Solicitar prueba de conducción
            </Link>
            <Link to="/vehiculos" className="rounded-md border border-borde px-5 py-3 text-sm font-semibold hover:bg-superficie">
              Ver inventario
            </Link>
          </div>

          <form className="mt-10 flex max-w-2xl items-center gap-3 rounded-xl border border-borde bg-superficie p-3">
            <Search className="ml-2 size-5 shrink-0 text-suave" />
            <input
              aria-label="Buscar vehículo"
              placeholder="Marca, modelo o ciudad"
              className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-suave"
            />
            <button type="button" className="h-11 rounded-md bg-marca px-5 text-sm font-semibold text-white hover:bg-marca-oscuro">
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Vehículos destacados */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-marca-claro">Inventario seleccionado</p>
            <h2 className="text-3xl font-bold tracking-tight">Vehículos destacados</h2>
          </div>
          <Link to="/vehiculos" className="text-sm font-semibold text-marca-claro hover:underline">Ver todos</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((v) => <TarjetaVehiculo key={v.id} vehiculo={v} />)}
        </div>
      </section>

      {/* Prueba de conducción */}
      <section className="border-y border-borde bg-superficie px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-marca-claro">Nuevo servicio</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Pruébalo donde tú quieras, antes de pisar el concesionario.
            </h2>
            <p className="mt-4 leading-7 text-suave">
              Solicita una prueba de conducción en una ubicación previamente acordada: tu casa, tu
              trabajo u otro punto que te quede cómodo.
            </p>
            <Link to="/prueba-de-conduccion" className="mt-6 inline-flex rounded-md bg-marca px-5 py-3 text-sm font-semibold text-white hover:bg-marca-oscuro">
              Agendar mi prueba
            </Link>
          </div>

          <div className="space-y-6">
            <ol className="space-y-4">
              {pasos.map(([titulo, texto], i) => (
                <li key={titulo} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-marca/15 text-sm font-bold text-marca-claro">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{titulo}</p>
                    <p className="text-sm text-suave">{texto}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="rounded-xl border border-borde bg-fondo p-5">
              <p className="mb-3 flex items-center text-sm font-semibold">
                <ShieldCheck className="mr-2 size-4 text-marca-claro" />
                Condiciones del servicio
              </p>
              <ul className="space-y-2 text-sm text-suave">
                {condiciones.map((c) => (
                  <li key={c} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-marca-claro" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Entrega a domicilio */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col items-start gap-5 rounded-2xl bg-marca-oscuro p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Truck className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Exclusivo para vehículos nuevos</p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Si compras un carro nuevo, te lo llevamos a tu casa.</h2>
              <p className="mt-2 max-w-xl text-white/80">Compra y financia desde la plataforma, y nosotros lo entregamos en la puerta de tu hogar.</p>
            </div>
          </div>
          <Link to="/vehiculos" className="shrink-0 rounded-md bg-white px-5 py-3 text-sm font-semibold text-marca-oscuro hover:bg-slate-100">
            Ver vehículos
          </Link>
        </div>
      </section>
    </>
  )
}