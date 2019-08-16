const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('../../models')

router.post('/signup', async (req, res, next) => {
  try {
    const { name, userName, password } = req.body
    const user = await db.User.findOne({
      where: { userName },
    })
    if (user) return res.status(403).send('이미 사용중인 유저입니다.')
    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await db.User.create({
      name,
      userName,
      password: hashPassword,
    })
    console.log(newUser)
    res.status(200).json(newUser)
  } catch (e) {
    console.log('error는 ' + e)
  }
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (info) return res.status(401).send(info.reason)
    req.login(user, loginErr => {
      if (loginErr) return next(loginErr)
      const jsonUser = user.toJSON()
      delete jsonUser.password
      res.json(jsonUser)
    })
  })(req, res, next)
})

module.exports = router
