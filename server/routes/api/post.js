const express = require('express')
const AWS = require('aws-sdk')
const sharp = require('sharp')
const db = require('../../models')
const upload = require('../../multer')

const router = express.Router()
const s3 = new AWS.S3({ region: 'ap-northeast-2' })

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

router.post('/images', upload.array('image'), async (req, res, next) => {
  const result = await Promise.all(
    req.files.map(async v => {
      try {
        const s3Object = await s3
          .getObject({
            Bucket: v.bucket,
            Key: v.key,
          })
          .promise()

        const thumbImage = await sharp(s3Object.Body)
          .rotate()
          .resize(800, 800, {
            fit: 'inside',
          })
          .toBuffer()

        await s3
          .putObject({
            Body: thumbImage,
            Bucket: v.bucket,
            Key: v.key.replace('original', 'thumb'),
          })
          .promise()
        return v.location.replace('original', 'thumb')
      } catch (e) {
        return v.location
      }
    }),
  )
  res.json(result)
})

router.delete('/images', async (req, res, next) => {
  try {
    const { images } = req.body

    const imageKeys = images.reduce((prev, curr) => {
      const filename = decodeURIComponent(curr.split('/').slice(-1)[0])
      return prev.concat([{ Key: `thumb/${filename}` }, { Key: `original/${filename}` }])
    }, [])

    await s3
      .deleteObjects({
        Bucket: 'woogiegram',
        Delete: {
          Objects: imageKeys,
        },
      })
      .promise()

    images.length > 1 ? res.send([]) : res.send(images[0])
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.user) throw new Error('잘못된 접근입니다.')
    const { images } = req.body
    const imageKeys = images.reduce((prev, curr) => {
      const filename = decodeURIComponent(curr.src.split('/').slice(-1)[0])
      return prev.concat([{ Key: `thumb/${filename}` }, { Key: `original/${filename}` }])
    }, [])
    await s3
      .deleteObjects({
        Bucket: 'woogiegram',
        Delete: { Objects: imageKeys },
      })
      .promise()
    const postId = +req.params.id
    await db.post.destroy({ where: { id: +req.params.id } })
    res.json({ id: postId })
  } catch (e) {
    res.status(401).send(e.message)
  }
})

router.patch('/:id', upload.none(), async (req, res, next) => {
  try {
    const { description } = req.body
    const postId = +req.params.id
    let newTags = description.match(/#[^#\s,;]+/gm)

    const prevPost = await db.post.findOne({ where: { id: postId } })

    let prevTags = prevPost.toJSON().description.match(/#[^#\s,;]+/gm)

    if (newTags && prevTags) {
      prevTags = prevTags.filter(tag => !newTags.find(newTag => tag === newTag))
      newTags = newTags.filter(newTag => !prevTags.find(tag => tag === newTag))
    }

    if (prevTags) {
      prevTags.forEach(async tag => {
        const result = await db.hashtag.findOne({ where: { name: tag.slice(1).toLowerCase() } })
        result.removePost(postId)
      })
    }

    await db.post
      .update(
        {
          description: req.body.description,
        },
        { where: { id: postId } },
      )
      .then(r => console.log(r))

    const newPost = await db.post.findOne({ where: { id: postId } })

    if (newTags) {
      const result = await Promise.all(
        newTags.map(tag =>
          db.hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }),
        ),
      )
      await newPost.addHashtags(result.map(r => r[0]))
    }

    res.json({ id: postId, description })
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

router.get('/:id/likers', async (req, res, next) => {
  try {
    const where = +req.query.lastId
      ? {
          id: {
            [db.Sequelize.Op.gt]: +req.query.lastId,
          },
        }
      : {}

    const limit = 10
    const post = await db.post.findOne({
      where: { id: +req.params.id },
    })

    const likers = await post.getLikers({
      where,
      limit,
      attributes: ['id', 'name', 'userName'],
      include: [
        {
          model: db.image,
          attributes: ['src'],
        },
      ],
    })

    const result = likers.map(v => {
      const liker = v.toJSON()
      delete liker.like
      return liker
    })

    const hasMoreUser = result.length === limit
    res.json({ userList: result, hasMoreUser })
  } catch (e) {}
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
