const mongoose = require('mongoose')

const { Schema } = mongoose

const LikeSchema = new Schema({

  _id: {
    type: String
  },

  postId: {
    type: String
  },
  userId: {
    type: String
  }
})

module.exports = mongoose.model('likes', LikeSchema)
