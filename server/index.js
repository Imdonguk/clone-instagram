const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// const cookieParser = require('cookie-parser')
// const expressSession = require('express-session')
const app = express()
const db = require('./models')

db.sequelize.sync()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)

app.use('/api/user', require('./routes/api/user'))
app.use('/api/post', require('./routes/api/post'))

app.listen(3065, () => {
  console.log('start server')
})
