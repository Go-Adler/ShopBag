// Import modules
import express from 'express'
import nocache from 'nocache'
import morgan from 'morgan'

// Import routes
import { router as userRoute } from './routes/userRoute.js'
import { router as adminRoute } from './routes/adminRoute.js'

// Initializing the express app and setting the port number
const app = express()
const PORT = process.env.PORT || 3000

// Set view engine and views directory
app.set('views', './views')
app.set('view engine', 'ejs')

// Adding middlewares
// app.use(cors())

app.use(morgan("dev"))
app.use(nocache())
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Setting up routes for user and admin endpoints
app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use('/', userRoute)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})