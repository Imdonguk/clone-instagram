const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const db = require('./models')
const dotenv = require('dotenv')
const passport = require('passport')
const hpp = require('hpp')
const helmet = require('helmet')
const greenlock = require('greenlock-express')
const greenlockStore = require('greenlock-store-fs')
const redirectHttps = require('redirect-https')
const https = require('https')
const http = require('http')
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
      origin: 'https://woogiegram.com',
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
    cookie: {
      httpOnly: true, //javascript로 쿠키나 세션 동작을 할 수 없게 하는 동작
      secure: !!prod, // https를 쓸 때 true
      domain: prod && '.woogiegram.com',
    },
    name: config.cookiename,
  }),
)

app.use(passport.initialize())
app.use(passport.session())
passportConfig()

app.use('/api/user', require('./routes/api/user'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/hashtag', require('./routes/api/hashtag'))
if (prod) {
  const lex = greenlock.create({
    version: 'draft-11',
    configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    email: 'com6511@gmail.com',
    store: greenlockStore,
    approveDomains: (opts, certs, cb) => {
      if (certs) {
        opts.domains = ['api.woogiegram.com']
      } else {
        opts.email = 'com6511@gmail.com'
        opts.agreeTos = true
      }
      cb(null, { options: opts, certs })
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000,
    renewBy: 80 * 24 * 60 * 60 * 1000,
  })
  https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443)
  http.createServer(lex.middleware(redirectHttps())).listen(80)
} else {
  app.listen(port, () => {
    console.log(`start server ${port}`)
  })
}
