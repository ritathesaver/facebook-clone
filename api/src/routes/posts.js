const Router = require('koa-router')
const _uniq = require('lodash/uniq')
const { v4: uuidv4 } = require('uuid')
const asyncBusboy = require('async-busboy')
const path = require('path')
const fs = require('fs')

const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const Like = require('../models/Like')

const router = new Router()

router.get('/api/posts', async (ctx) => {
	try {
		const posts = await Post.find().sort({ date: -1 })
		const userIds = _uniq(posts.map(({ userId }) => userId))

		const users = await User.find({ _id: { $in: userIds } })

		ctx.body = await Promise.all(
			posts.map(async (post) => {
				const commentsCount = await Comment.countDocuments({ postId: post._id })
				const likesCount = await Like.countDocuments({ postId: post._id })
				return {
					...post._doc,
					user: users.find((u) => u._id === post.userId),
					commentsCount,
					likesCount
				}
			})
		)
	} catch (err) {
		ctx.body = `error: ${err}`
	}
})

router.post('/api/posts', async (ctx) => {
	const { files, fields } = await asyncBusboy(ctx.req)

	const { text, userId } = fields

	if (!text || !userId) {
		ctx.status = 403
		ctx.body = {
			error: 'Bad data'
		}
		return
	}

	const post = new Post()
	post._id = uuidv4()
	post.text = text
	post.userId = userId
	post.date = new Date()

	if (files.length) {
		const imageName = `${Date.now()}.jpg`
		post.imageUrl = `http://localhost:5000/static/${imageName}`

		const fileStream = fs.createWriteStream(path.join(__dirname, '../static', imageName))
		await new Promise((resolve) =>
			files[0].pipe(fileStream).on('finish', () => {
				resolve()
			})
		)
	}

	try {
		const data = await post.save()
		ctx.body = data
	} catch (err) {
		ctx.body = err
	}
})

router.delete('/api/posts/:id', async (ctx) => {
	const { id: _id } = ctx.params
	try {
		await Post.deleteOne({
			_id
		})
	} catch (err) {
		ctx.body = `error${err}`
	}

	ctx.body = {
		status: 'deleted'
	}
})

router.put('/api/posts/:id', async (ctx) => {
	const { text } = ctx.request.body
	const { id: _id } = ctx.params
	if (!text) {
		ctx.body = {
			error: 'Bad data'
		}
		return
	}

	try {
		await Post.findOneAndUpdate(
			{ _id },
			{
				text
			}
		)
	} catch (err) {
		ctx.body = `error${err}`
	}

	ctx.body = {
		status: 'updated'
	}
})

module.exports = router
