const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('../../models')

router.post('/signup', async (req, res, next) => {
  try {
    const { name, userName, password } = req.body
    const user = await db.User.findOne({
      where: { userName },
    })
    if (user) return res.status(403).send('이미 사용중인 유저입니다.')
    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await db.User.create({
      name,
      userName,
      password: hashPassword,
    })
    console.log(newUser)
    res.status(200).json(newUser)
  } catch (e) {
    console.log('error는 ' + e)
  }
})

router.post('/signin', async (req, res, next) => {
  try {
  } catch (e) {}
})

module.exports = router
