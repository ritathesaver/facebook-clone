const mongoose = require('mongoose')
const Post = require('../models/Post')

const addDateToPosts = async () => {
	mongoose.connect('mongodb://mongo:27017/fb_db', { useNewUrlParser: true }).then(() => {
		console.log('Connected to MongoDB')
	})

	try {
		const posts = await Post.find({ date: { $exists: false } })
		const promises = posts.map((item) => {
			item.date = new Date()
			return item.save()
		})
		await Promise.all(promises)
		console.log('Success')
	} catch (err) {
		console.log(err)
		console.log('Failed')
	}
}

addDateToPosts()
