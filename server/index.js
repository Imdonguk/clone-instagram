const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')
const app = express()
const db = require('./models')
const dotenv = require('dotenv')
const passportConfig = require('./passport')

dotenv.config()
db.sequelize.sync()
passportConfig()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, //javascript로 쿠키나 세션 동작을 할 수 없게 하는 동작
      secure: false, // https를 쓸 때 true
    },
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/user', require('./routes/api/user'))
app.use('/api/post', require('./routes/api/post'))

app.listen(3065, () => {
  console.log('start server')
})
