const mongoose = require('mongoose')

const { Schema } = mongoose

const PostSchema = new Schema({
	_id: {
		type: String
	},
	text: {
		type: String
	},
	userId: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String
	},
	date: {
		type: Date
	}
})

module.exports = mongoose.model('posts', PostSchema)
