const express = require('express')
const next = require('next')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
const dev = process.env.NODE_ENV !== 'production'
const prod = process.env.NODE_ENV === 'production'

const port = prod ? process.env.PORT : '3060'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(morgan('dev'))
  server.use(express.json())

  server.use(express.urlencoded({ extended: true }))
  server.use('/', express.static(path.join(__dirname, 'public')))
  server.use(cookieParser(process.env.COOKIE_SECRET))
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  )

  server.get('/signin', (req, res) => {
    return app.render(req, res, '/signin')
  })

  server.get('/signup', (req, res) => {
    return app.render(req, res, '/signup')
  })

  server.get('/post/:id', (req, res) => {
    return app.render(req, res, '/post', { id: req.params.id })
  })

  server.get('/:userName', (req, res) => {
    return app.render(req, res, '/user', { userName: req.params.userName })
  })

  server.get('/hashtag/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', { tag: req.params.tag })
  })

  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(port, () => {
    console.log(`start server ${port}`)
  })
})
