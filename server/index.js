const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
// const passport = require('passport')
const db = require('./models')
const dotenv = require('dotenv')
// const passportConfig = require('./passport')

const FileStore = require('session-file-store')(expressSession)

dotenv.config()
const app = express()
db.sequelize.sync()
// passportConfig()

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
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    store: new FileStore(),
    cookie: {
      httpOnly: true, //javascript로 쿠키나 세션 동작을 할 수 없게 하는 동작
      secure: false, // https를 쓸 때 true
    },
  }),
)

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.userName)
})

passport.deserializeUser(async (userName, done) => {
  try {
    const user = await db.User.findOne({
      where: { userName },
    })
    done(null, user)
  } catch (e) {}
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
    },
    async (userName, password, done) => {
      const user = await db.User.findOne({
        where: { userName },
      })
      if (!user) return done(null, false, { message: '유저가 없습니다.' })
      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) return done(null, false, { message: '비밀번호가 틀립니다.' })
      done(null, user)
    },
  ),
)

app.get('/user', (req, res, next) => {
  if (!req.user) return res.json({ success: false, msg: '유저가없어욤' })
  const user = Object.assign({}, req.user.toJSON())
  delete user.password
  res.json(user)
})

app.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.json({ success: false, msg: info.message })

    return req.login(user, signinErr => {
      return signinErr ? next(signinErr) : res.json({ success: true })
    })
  })(req, res, next)
})

app.post('/signout', (req, res, next) => {})

app.use('/api/user', require('./routes/api/user'))

app.listen(3065, () => {
  console.log('start server')
})
