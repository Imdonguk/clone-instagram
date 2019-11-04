const passport = require('passport')
const db = require('../models')
const local = require('./local')

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.userName)
  })

  passport.deserializeUser(async (userName, done) => {
    try {
      const user = await db.user.findOne({
        where: { userName },
        include: [
          {
            model: db.image,
            attributes: ['src'],
          },
        ],
        attributes: ['userName', 'name', 'id'],
      })
      return done(null, user)
    } catch (e) {
      return done(e)
    }
  })
  local()
}
