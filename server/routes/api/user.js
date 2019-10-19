const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('../../models')
const { isLoggedIn } = require('../middleware')
const config = require('../../config')

router.post('/', isLoggedIn, (req, res, next) => {
  res.json(req.user.toJSON())
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.status(403).send(info.message)

    return req.login(user, signinErr => {
      const { name, userName } = user
      return signinErr ? next(signinErr) : res.json({ name, userName })
    })
  })(req, res, next)
})

router.post('/signout', (req, res, next) => {
  req.logout()
  req.session.destroy(() => {
    res
      .status(200)
      .clearCookie(config.cookiename, {
        path: '/',
      })
      .send('GOOD!')
  })
})

router.post('/signup', async (req, res, next) => {
  try {
    const { name, userName, password } = req.body
    const user = await db.User.findOne({
      where: { userName },
    })
    if (user) throw new Error('기존에 있는 사용자입니다.')
    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await db.User.create({
      name,
      userName,
      password: hashPassword,
    })
    const newImage = await db.Image.create({ src: 'static_profile.jpg' })
    await newUser.setImage(newImage)
    res.json({ msg: 'ok' })
  } catch (e) {
    res.status(403).send(e.message)
  }
})

module.exports = router
