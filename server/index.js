const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const FileStore = require('session-file-store')(expressSession)
const db = require('./models')
const dotenv = require('dotenv')
const passport = require('passport')
const hpp = require('hpp')
const helmet = require('helmet')
const passportConfig = require('./passport')
const config = require('./config/config')
const app = express()

dotenv.config()
db.sequelize.sync()

const prod = process.env.NODE_ENV === 'production'
const port = prod ? process.env.PORT : 3065

if (prod) {
  app.use(hpp())
  app.use(helmet())
  app.use(morgan('conbined'))
  app.use(
    cors({
      origin: 'http://woogiegram.com',
      credentials: true,
    }),
  )
} else {
  app.use(morgan('dev'))
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  )
}

app.use('/', express.static('uploads'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
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
      domain: prod && '.woogiegram.com',
    },
    name: config.cookiename,
  }),
)

app.use(passport.initialize())
app.use(passport.session())
passportConfig()

app.get('/', (req, res) => {
  res.send('api server 정상 동작')
})

app.use('/api/user', require('./routes/api/user'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/hashtag', require('./routes/api/hashtag'))

app.listen(port, () => {
  console.log(`start server ${port}`)
})
