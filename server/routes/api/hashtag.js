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
          model: db.user,
          attribtues: ['id', 'userName', 'name'],
          include: [
            {
              model: db.image,
              attrubtes: ['src'],
            },
          ],
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
        const comments = await post.getComments({
          include: [
            {
              model: db.user,
              attributes: ['userName'],
              include: [
                {
                  model: db.image,
                  attributes: ['src'],
                },
              ],
            },
          ],
          attributes: ['id', 'content'],
          order: [['createdAt', 'DESC']],
          limit: 10,
        })

        const images = await post.getImages({
          attributes: ['id', 'src'],
          order: [['id', 'DESC']],
        })
        const commentCount = await post.getComments().then(r => Promise.resolve(r.length))
        comments.reverse()
        return { ...post.toJSON(), previewComments: comments.slice(0, 2), comments, images, commentCount }
      }),
    )
    res.json(result)
  } catch (e) {}
})

module.exports = router
