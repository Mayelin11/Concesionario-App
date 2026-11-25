import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import Vehiculos from './pages/Vehiculos.jsx'
import DetalleVehiculo from './pages/DetalleVehiculo.jsx'
import PruebaConduccion from './pages/PruebaConduccion.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="vehiculos" element={<Vehiculos />} />
        <Route path="vehiculos/:id" element={<DetalleVehiculo />} />
        <Route path="prueba-de-conduccion" element={<PruebaConduccion />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}