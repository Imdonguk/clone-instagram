const express = require('express')
const db = require('../../models')

const router = express.Router()

router.get('/:tag', async (req, res, next) => {
  try {
    const where = +req.query.lastId
      ? {
          id: {
            [db.Sequelize.Op.lt]: +req.query.lastId,
          },
        }
      : {}
    const limit = 9
    const posts = await db.post.findAll({
      where,
      include: [
        {
          model: db.hashtag,
          where: { name: decodeURI(req.params.tag) },
          attributes: [],
          through: {
            attributes: [],
          },
        },
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
          attributes: ['id'],
          through: {
            attributes: [],
          },
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
        return { ...post.toJSON(), images, commentCount }
      }),
    )
    const hasMorePost = result.length !== 0 && result.length % limit === 0
    res.json({ posts: result, hasMorePost })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
