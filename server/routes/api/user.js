const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('../../models')
const { isLoggedIn } = require('../middleware')
const config = require('../../config')
const upload = require('../../multer')

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

router.get('/:userName/posts', async (req, res, next) => {
  try {
    const user = await db.user.findOne({ where: { userName: req.params.userName } })

    const posts = await user.getPost({
      attributes: ['id', 'description'],
      include: [
        {
          model: db.image,
          attributes: ['id', 'src'],
        },
        {
          model: db.user,
          as: 'likers',
          through: {
            attributes: [],
          },
          attributes: ['id'],
        },
      ],
      order: [['createdAt', 'DESC']],
    })

    const result = await Promise.all(
      posts.map(async post => {
        const jsonPost = post.toJSON()
        const commentCount = await post.getComments().then(r => Promise.resolve(r.length))
        return { ...jsonPost, commentCount }
      }),
    )

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

router.post('/image', upload.single('profileImage'), async (req, res, next) => {
  try {
    await db.image.update(
      {
        src: req.file.filename,
      },
      {
        where: { id: req.user.id },
      },
    )
    res.json(req.file.filename)
  } catch (e) {}
})

module.exports = router
