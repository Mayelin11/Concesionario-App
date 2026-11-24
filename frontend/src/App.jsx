export default function App() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-borde bg-superficie p-8 text-center">
        <h1 className="text-4xl font-bold">
          Auto<span className="text-marca">Plaza</span>
        </h1>
        <p className="mt-3 text-suave">Compra, financia y pruébalo sin salir de casa.</p>
        <button className="mt-6 rounded-md bg-marca px-5 py-3 font-semibold text-white hover:bg-marca-oscuro">
          Ver vehículos
        </button>
      </div>
    </div>
  )
}