const passport = require('passport')
const db = require('../models')
const local = require('./local')

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.userName)
  })
  passport.deserializeUser(async (userName, done) => {
    try {
      console.log('deserializeUser!!', userName)
      const user = await db.User.findOne({
        where: { userName },
      })
      return done(null, user)
    } catch (e) {
      console.error(e)
      return done(e)
    }
  })

  local()
}
