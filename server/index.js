const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const FileStore = require('session-file-store')(expressSession)
const db = require('./models')
const dotenv = require('dotenv')
const passport = require('passport')
const passportConfig = require('./passport')
const config = require('./config')
const app = express()

dotenv.config()
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
app.use(cookieParser(config.cookieSecret))
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret,
    store: new FileStore(),
    cookie: {
      httpOnly: true, //javascript로 쿠키나 세션 동작을 할 수 없게 하는 동작
      secure: false, // https를 쓸 때 true
    },
    name: config.cookiename,
  }),
)

app.use(passport.initialize())
app.use(passport.session())
passportConfig()

app.use('/api/user', require('./routes/api/user'))

app.listen(3065, () => {
  console.log('start server')
})
