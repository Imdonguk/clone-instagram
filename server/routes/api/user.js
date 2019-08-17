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
    if (user) throw new Error('기존에 있는 사용자입니다.')
    const hashPassword = await bcrypt.hash(password, 12)
    await db.User.create({
      name,
      userName,
      password: hashPassword,
    })
    res.json({ success: true })
  } catch (e) {
    res.json({ success: false, msg: e.message })
  }
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (info) return res.status(401).send(info.reason)
    req.login(user, async loginErr => {
      try {
        if (loginErr) return next(loginErr)
        const fullUser = await db.User.findOne({
          where: { userName: user.userName },
          include: [
            {
              model: db.Post,
              as: 'Post',
              attributes: ['id'],
            },
            {
              model: db.User,
              as: 'Followers',
              attributes: ['id'],
            },
            {
              model: db.User,
              as: 'Followings',
              attributes: ['id'],
            },
          ],
          attributes: ['id', 'name', 'userName'],
        })
        res.json(fullUser.toJSON())
      } catch (e) {
        console.error(e)
      }
    })
  })(req, res, next)
})

module.exports = router
