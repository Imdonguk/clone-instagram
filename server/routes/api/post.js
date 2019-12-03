const express = require('express')
const router = express.Router()
const db = require('../../models')
const fs = require('fs')
const upload = require('../../multer')

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const { description, image } = req.body
    const hashtags = description.match(/#[^#\s,;]+/gm)

    const newPost = await db.post.create({ description, userId: req.user.id })

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }),
        ),
      )
      await newPost.addHashtags(result.map(r => r[0]))
    }

    if (image) {
      if (Array.isArray(image)) {
        const newImages = await Promise.all(image.map(filename => db.image.create({ src: filename })))
        await newPost.addImages(newImages)
      } else {
        const newImage = await db.image.create({ src: image })
        await newPost.addImage(newImage)
      }
    }

    const post = await db.post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.user,
          include: [
            {
              model: db.image,
              attributes: ['id', 'src'],
            },
          ],
          attributes: ['id', 'name', 'userName'],
        },
        {
          model: db.image,
          attributes: ['id', 'src'],
        },
      ],
      attributes: ['id', 'description'],
    })
    const initComments = { previewComments: [], comments: [], commentCount: 0 }
    const initLikers = { likers: [] }
    res.json(Object.assign({}, post.toJSON(), initComments, initLikers))
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await db.post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.user,
          attributes: ['id', 'name', 'userName'],
          include: [
            {
              model: db.image,
              attributes: ['src'],
            },
          ],
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
      attributes: ['id', 'description'],
      order: [['createdAt', 'DESC']],
    })
    const images = await post.getImages({
      attributes: ['id', 'src'],
      order: [['id', 'DESC']],
    })
    if (!post) res.status(401).send('no post')
    res.json({ ...post.toJSON(), images })
  } catch (e) {
    next(e)
  }
})

router.get('/:id/comments', async (req, res, next) => {
  try {
    const where = +req.query.lastId
      ? {
          id: {
            [db.Sequelize.Op.lt]: +req.query.lastId,
          },
        }
      : {}
    const limit = 10
    const post = await db.post.findOne({ where: { id: req.params.id } })
    const comments = await post.getComments({
      where,
      attributes: ['id', 'content'],
      include: [
        {
          model: db.user,
          attributes: ['id', 'userName', 'name'],
          include: [
            {
              model: db.image,
              attributes: ['src'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
    })

    comments.reverse()

    const hasMoreComment = comments.length === limit

    res.json({ comments, hasMoreComment })
  } catch (e) {
    next(e)
  }
})

router.post('/images', upload.array('image'), (req, res, next) => {
  res.json(req.files.map(v => v.filename))
})

router.delete('/image/:filename', (req, res, next) => {
  const filename = req.params.filename
  fs.unlink(`uploads/${filename}`, err => {
    if (err) next(err)
    res.send(filename)
  })
})

router.delete('/images', (req, res, next) => {
  try {
    const { images } = req.body
    images.forEach(v => {
      fs.unlinkSync(`uploads/${v}`)
    })
    res.send([])
  } catch (e) {
    next(e)
  }
})

router.post('/:id/like', async (req, res, next) => {
  try {
    const post = await db.post.findOne({ where: { id: req.params.id } })
    if (!post) return res.status(404).send('no post')
    await post.addLiker(req.user.id)
    res.json({ userId: req.user.id })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id/like', async (req, res, next) => {
  try {
    const post = await db.post.findOne({ where: { id: req.params.id } })
    if (!post) return res.status(404).send('no post')
    await post.removeLiker(req.user.id)
    res.json({ userId: req.user.id })
  } catch (e) {
    next(e)
  }
})

router.post('/:id/comment', async (req, res, next) => {
  try {
    const post = await db.post.findOne({ where: { id: req.params.id } })
    if (!post) return res.status(404).send('no post')

    const comment = await post.createComment({
      content: req.body.content,
      userId: req.user.id,
    })
    const user = await comment.getUser({
      attributes: ['userName'],
      include: [
        {
          model: db.image,
          attributes: ['src'],
        },
      ],
    })
    res.json({ id: comment.id, content: comment.content, user })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id/comment/:cid', async (req, res, next) => {
  try {
    const post = await db.post.findOne({ where: { id: req.params.id } })
    if (post) return res.status(404).send('no post')

    await db.comment.destroy({ where: { id: req.params.cid } })
    res.json(req.params.cid)
  } catch (e) {
    next(e)
  }
})

module.exports = router
