const express = require('express')
const router = express.Router()
const db = require('../../models')

router.get('/', async (req, res, next) => {
  try {
    const posts = await db.post.findAll({
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
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
