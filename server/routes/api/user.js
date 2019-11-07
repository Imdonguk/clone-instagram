const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('../../models')
const { isLoggedIn } = require('../middleware')
const config = require('../../config')

router.get('/', isLoggedIn, (req, res, next) => {
  res.json(req.user.toJSON())
})

router.get('/:userName', async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: { userName: req.params.userName },
      include: [
        {
          model: db.image,
          attributes: ['src'],
        },
      ],
      attributes: ['id', 'name', 'userName'],
    })
    if (!user) return res.status(401).send('유저가없습니다!')

    const postCount = await user.getPost().then(r => Promise.resolve(r.length))
    const result = { ...user.toJSON(), postCount }
    res.json(result)
  } catch (e) {
    next(e)
  }
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
    const user = await db.user.findOne({
      where: { userName },
    })
    if (user) throw new Error('기존에 있는 사용자입니다.')
    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await db.user.create({
      name,
      userName,
      password: hashPassword,
    })
    await newUser.createImage({ src: 'static_profile.jpg' })
    res.json({ msg: 'ok' })
  } catch (e) {
    res.status(403).send(e.message)
  }
})

module.exports = router
