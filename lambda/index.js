const AWS = require('aws-sdk')
const Sharp = require('sharp')
const S3 = new AWS.S3({
  region: 'ap-northeast-2',
})

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name
  const Key = decodeURIComponent(event.Records[0].s3.object.key)
  const filename = Key.split('/')[Key.split('/').length - 1]
  try {
    const s3Object = await S3.getObject({
      Bucket,
      Key,
    }).promise()

    const thumbImage = await Sharp(s3Object.Body)
      .rotate()
      .resize(640, 640, {
        fit: 'inside',
      })
      .toBuffer()

    const profileImage = await Sharp(s3Object.Body)
      .rotate()
      .resize(200, 200, {
        fit: 'inside',
      })
      .toBuffer()

    await S3.putObject({
      Body: thumbImage,
      Bucket,
      Key: `thumb/${filename}`,
    }).promise()

    await S3.putObject({
      Body: profileImage,
      Bucket,
      Key: `profile/${filename}`,
    }).promise()

    return callback(null, {
      thumb: `thumb/${filename}`,
      profile: `profile/${filename}`,
    })
  } catch (error) {
    return callback(error)
  }
}
