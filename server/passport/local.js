const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
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
        const user = await db.User.findOne({
          where: { userName },
        })
        if (!user) return done(null, false, { message: '유저가 없습니다.' })
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) return done(null, false, { message: '비밀번호가 틀립니다.' })
        return done(null, user)
      },
    ),
  )
}
