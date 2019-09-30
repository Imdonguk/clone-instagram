const config = require('../config')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()

  res.clearCookie(config.cookiename, { path: '/' })
  res.status(401).send('로그인이 필요합니다.')
  return
}

const isNotLoggedIn = (req, res, next) => {
  return !req.isAuthenticated() ? next() : res.status(401).send('로그인한 사용자는 접근할 수 없습니다.')
}

module.exports = { isLoggedIn, isNotLoggedIn }