const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const db = require('../../models')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'uploads')
  },
  filename: (req, file, cd) => {
    const ext = path.extname(file.originalname)
    const basename = path.basename(file.originalname, ext)
    cd(null, basename + Date.now() + ext)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
})

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const { description, image } = req.body
    const hashtags = description.match(/#[^#\s,;]+/gm)

    const newPost = await db.Post.create({ description, UserId: req.user.id })

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }),
        ),
      )
      await newPost.addHashtags(result.map(r => r[0]))
    }

    if (image) {
      if (Array.isArray(image)) {
        const newImages = await Promise.all(image.map(filename => db.Image.create({ src: filename })))
        await newPost.addImages(newImages)
      } else {
        const newImage = await db.Image.create({ src: image })
        await newPost.addImage(newImage)
      }
    }

    const responsePost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ['id', 'src'],
              as: 'image',
            },
          ],
          attributes: ['id', 'name', 'userName'],
          as: 'user',
        },
        {
          model: db.Image,
          attributes: ['id', 'src'],
          as: 'images',
        },
      ],
      attributes: ['id', 'description'],
    })
    res.json(responsePost.toJSON())
  } catch (e) {
    console.log(e)
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

module.exports = router
