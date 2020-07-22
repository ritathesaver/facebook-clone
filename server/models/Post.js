const mongoose = require('mongoose')

const { Schema } = mongoose

const PostSchema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  category: {
    type: String
  },
  text: {
    type: String
  },
  userId: {
    type: String
  },
  imageUrl: {
    type: String
  }

})

module.exports = mongoose.model('posts', PostSchema)
