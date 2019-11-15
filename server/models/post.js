module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'post',
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  )

  post.associate = db => {
    db.post.belongsTo(db.user)
    db.post.hasMany(db.comment, { onDelete: 'cascade' })
    db.post.hasMany(db.image, { onDelete: 'cascade' })
    db.post.belongsToMany(db.hashtag, { through: 'postHashtag', onDelete: 'cascade' })
    db.post.belongsToMany(db.user, { through: 'like', as: 'likers', onDelete: 'cascade' })
    db.post.belongsToMany(db.user, { through: 'save', as: 'savers', onDelete: 'cascade' })
  }

  return post
}
