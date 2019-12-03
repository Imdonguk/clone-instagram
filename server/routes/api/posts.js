const express = require('express')
const router = express.Router()
const db = require('../../models')

router.get('/', async (req, res, next) => {
  try {
    const where = +req.query.lastId
      ? {
          id: {
            [db.Sequelize.Op.lt]: +req.query.lastId,
          },
        }
      : {}

    const limit = 3
    const posts = await db.post.findAll({
      where,
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
          limit: 2,
        })

        const images = await post.getImages({
          attributes: ['id', 'src'],
          order: [['id', 'DESC']],
        })
        comments.reverse()
        const commentCount = await post.getComments().then(r => Promise.resolve(r.length))
        return { ...post.toJSON(), previewComments: comments, images, commentCount }
      }),
    )
    const hasMorePost = result.length !== 0 && result.length % limit === 0
    res.json({ posts: result, hasMorePost })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
