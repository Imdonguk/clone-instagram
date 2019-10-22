module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
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

  Post.associate = db => {
    db.Post.belongsTo(db.User, { as: 'user' })
    db.Post.hasMany(db.Comment)
    db.Post.hasMany(db.Image, { as: 'images' })
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' })
  }

  return Post
}
