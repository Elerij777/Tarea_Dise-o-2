import dotenv from 'dotenv'
import express from 'express'
import solicitudesRouter from './routes/solicitudes.routes.js'

const app = express()
dotenv.config()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.use('/solicitud', solicitudesRouter)

app.listen(PORT, () => {
    console.log(`Servidor en marcha en: http://localhost:${PORT}`)
})