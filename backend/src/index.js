const express = require('express')
const cors = require('cors')

const app = express()

// Permite que el frontend (Vite, puerto 5173) le pida datos a esta API.
app.use(cors({ origin: 'http://localhost:5173' }))

app.get('/', (req, res) => {
  res.json({ mensaje: 'API del concesionario funcionando' })
})

app.listen(4000, () => console.log('API lista en http://localhost:4000'))