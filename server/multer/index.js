const multer = require('multer')
const path = require('path')
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
})

const storage = multerS3({
  s3: new AWS.S3(),
  bucket: 'woogiegram',
  key(req, file, cd) {
    cd(null, `original/${+new Date()}${path.basename(file.originalname)}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
})

module.exports = upload
