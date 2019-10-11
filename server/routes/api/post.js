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
