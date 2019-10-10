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
  console.log(req.files.map(v => v.filename))
  res.json(req.files.map(v => v.filename))
})

router.delete('/image/:filename', (req, res, next) => {
  const filename = req.params.filename
  fs.unlink(`uploads/${filename}`, err => {
    if (err) next(err)
    res.send(filename)
  })
})

module.exports = router
