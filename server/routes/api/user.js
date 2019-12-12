const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const fs = require('fs')
const router = express.Router()
const db = require('../../models')
const { isLoggedIn } = require('../middleware')
const config = require('../../config/config')
const upload = require('../../multer')

router.get('/', isLoggedIn, (req, res, next) => {
  res.json(req.user)
})

router.get('/:userName', async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: { userName: decodeURI(req.params.userName) },
      include: [
        {
          model: db.image,
          attributes: ['src'],
        },
        {
          model: db.user,
          as: 'followers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          model: db.user,
          as: 'followings',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          model: db.post,
          as: 'saved',
          attributes: ['id'],
          through: {
            attributes: [],
          },
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
    const user = await db.user.findOne({
      where: { userName: decodeURI(req.params.userName) },
      include: [
        {
          model: db.image,
          attributes: ['src'],
        },
      ],
      attributes: ['id', 'userName', 'name'],
    })

    const where = +req.query.lastId
      ? {
          id: {
            [db.Sequelize.Op.lt]: +req.query.lastId,
          },
        }
      : {}

    const limit = 9
    const posts = await user.getPost({
      where,
      include: [
        {
          model: db.image,
          attributes: ['id', 'src'],
          order: [['id', 'ASC']],
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
      attributes: ['id', 'description', 'userId', 'createdAt'],
      limit,
      order: [['createdAt', 'DESC']],
    })

    const result = await Promise.all(
      posts.map(async post => {
        const images = await post.getImages({
          attributes: ['id', 'src'],
          order: [['id', 'DESC']],
        })
        const commentCount = await post.getComments().then(r => Promise.resolve(r.length))
        return { ...post.toJSON(), user, images, commentCount }
      }),
    )

    const hasMorePost = result.length !== 0 && result.length % limit === 0
    res.json({ posts: result, hasMorePost })
  } catch (e) {
    next(e)
  }
})

router.get('/:userName/followers', async (req, res, next) => {
  try {
    const where = +req.query.lastId
      ? {
          id: {
            [db.Sequelize.Op.gt]: +req.query.lastId,
          },
        }
      : {}
    const limit = 10
    const user = await db.user.findOne({ where: { userName: req.params.userName } })
    const followers = await user.getFollowers({
      where,
      limit,
      include: [
        {
          model: db.image,
          attributes: ['src'],
        },
      ],
      attributes: ['id', 'name', 'userName'],
    })
    const result = followers.map(v => {
      const follower = v.toJSON()
      delete follower.follow
      return follower
    })

    const hasMoreUser = result.length === limit
    res.json({ userList: result, hasMoreUser })
  } catch (e) {
    next(e)
  }
})

router.get('/:userName/followings', async (req, res, next) => {
  try {
    const where = +req.query.lastId
      ? {
          id: {
            [db.Sequelize.Op.gt]: +req.query.lastId,
          },
        }
      : {}

    const limit = 10
    const user = await db.user.findOne({ where: { userName: req.params.userName } })
    const followings = await user.getFollowings({
      where,
      limit,
      include: [
        {
          model: db.image,
          attributes: ['src'],
        },
      ],
      attributes: ['id', 'name', 'userName'],
    })
    const result = followings.map(v => {
      const following = v.toJSON()
      delete following.follow
      return following
    })
    const hasMoreUser = result.length === limit
    res.json({ userList: result, hasMoreUser })
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
    await newUser.createImage({ src: '/static_profile.jpg' })
    res.json({ msg: 'ok' })
  } catch (e) {
    res.status(403).send(e.message)
  }
})

router.post('/image', upload.single('profileImage'), async (req, res, next) => {
  try {
    await db.image.update(
      {
        src: req.file.location,
      },
      {
        where: { userId: req.user.id },
      },
    )
    res.json(req.file.location)
  } catch (e) {}
})

router.delete('/image', async (req, res, next) => {
  try {
    // const { imagePath } = req.body
    // s3.deleteObject({})
    await db.image.update(
      {
        src: '/static_profile.jpg',
      },
      {
        where: { userId: req.user.id },
      },
    )
    // fs.unlinkSync(`uploads/${filename}`)
    res.send('/static_profile.jpg')
  } catch (e) {
    console.log(e)
  }
})

router.post('/:id/follow', async (req, res, next) => {
  try {
    const followingUserId = +req.params.id
    const me = await db.user.findOne({ where: { id: req.user.id } })
    await me.addFollowings(followingUserId)
    res.json({ id: followingUserId })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id/follow', async (req, res, next) => {
  try {
    const followingUserId = +req.params.id
    const me = await db.user.findOne({ where: { id: req.user.id } })
    await me.removeFollowings(followingUserId)
    res.json({ id: followingUserId })
  } catch (e) {
    next(e)
  }
})

router.post('/save/:postId', async (req, res, next) => {
  try {
    const postId = +req.params.postId
    const post = await db.post.findOne({ where: { id: postId } })
    if (!post) return res.status(401).send('no post')
    await req.user.addSaved(postId)
    res.json({ id: postId })
  } catch (e) {
    next(e)
  }
})

router.delete('/save/:postId', async (req, res, next) => {
  try {
    const postId = +req.params.postId
    const post = await db.post.findOne({ where: { id: postId } })
    if (!post) return res.status(401).send('no post')
    await req.user.removeSaved(postId)
    res.json({ id: postId })
  } catch (e) {
    next(e)
  }
})

module.exports = router
