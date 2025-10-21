import express from 'express'
import studentRoutes from './routes/studentRoutes.js'

const app = express()
app.use(express.json())

// 👇 Add this line before defining routes
app.get('/', (req, res) => {
  res.send('Server is running 🚀')
})

// 👇 Register routes
app.use('/api/students', studentRoutes)

const PORT = 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
