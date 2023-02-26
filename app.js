const express = require('express')

const userRoute = require('./routes/userRoute')

const app = express()

app.listen(3000, () => {
  console.log('Server is running');
})

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static('./public'))
app.use('/user', userRoute)
app.use('/', userRoute)

