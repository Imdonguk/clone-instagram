module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  )

  user.associate = db => {
    db.user.hasMany(db.post, { as: 'post', onDelete: 'cascade' })
    db.user.hasMany(db.comment, { onDelete: 'cascade' })
    db.user.hasOne(db.image, { onDelete: 'cascade' })
    db.user.belongsToMany(db.post, { through: 'like', as: 'liked' })
    db.user.belongsToMany(db.user, { through: 'follow', as: 'followers', foreignKey: 'followingId' })
    db.user.belongsToMany(db.user, { through: 'follow', as: 'followings', foreignKey: 'followerId' })
  }

  return user
}
