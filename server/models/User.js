const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    _id: {
      type: String
    },

    name: {
      type: String,
      required: true,
    },

    surname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: false,
    },
    avatarUrl: {
      type: String,
    }

  },
  {
    versionKey: false
  }
)

module.exports = mongoose.model('users', UserSchema)
