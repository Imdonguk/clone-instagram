const Sequelize = require('sequelize')
const config = require('../config')
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.user = require('./user')(sequelize, Sequelize)
db.post = require('./post')(sequelize, Sequelize)
db.image = require('./image')(sequelize, Sequelize)
db.comment = require('./comment')(sequelize, Sequelize)
db.hashtag = require('./hashtag')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
