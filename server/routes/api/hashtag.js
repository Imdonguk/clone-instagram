const express = require('express')
const db = require('../../models')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.json(true)
})

router.get('/:tag', async (req, res, next) => {
  try {
    const posts = await db.post.findAll({
      include: [
        {
          model: db.hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
          attributes: [],
          through: {
            attributes: [],
          },
        },
        {
          model: db.image,
          attributes: ['id', 'src'],
        },
        {
          model: db.user,
          as: 'likers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ['id', 'description'],
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
  } catch (e) {}
})

module.exports = router
