const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema({

  _id: {
    type: String
  },

  text: {
    type: String
  },

  postId: {
    type: String
  },
  userId: {
    type: String
  }
})

module.exports = mongoose.model('comments', CommentSchema)
