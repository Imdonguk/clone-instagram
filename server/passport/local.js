const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const bcrypt = require('bcrypt')
const db = require('../models')

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userName',
        passwordField: 'password',
      },
      async (userName, password, done) => {
        try {
          const user = await db.User.findOne({
            where: { userName },
          })
          const validPassword = await bcrypt.compare(password, user.password)
          if (!user) return done(null, false, { reason: '존재하지 않는 사용자입니다.' })
          if (!validPassword) return done(null, false, { reason: '비밀번호가 틀립니다.' })
          return done(null, user)
        } catch (e) {
          console.error(e)
          return done(e)
        }
      },
    ),
  )
}
