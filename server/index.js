const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({

}))
app.use(cors())
app.listen(3000, () => {})