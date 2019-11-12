const multer = require('multer')
const path = require('path')

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

module.exports = upload
