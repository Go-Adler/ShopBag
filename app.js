// Import modules
import express from 'express'
import nocache from 'nocache'
import morgan from 'morgan'
import cors from 'cors'
import rateLimit from 'express-rate-limit';

// Import routes
import { router as userRoute } from './routes/userRoute.js'
import { router as adminRoute } from './routes/adminRoute.js'

// Initializing the express app and setting the port number
const app = express()
const PORT = process.env.PORT

// Set view engine and views directory
app.set('views', './views')
app.set('view engine', 'ejs')

// Adding middlewares
app.use(cors())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
  message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

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
