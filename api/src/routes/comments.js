const Router = require('koa-router')
const { v4: uuidv4 } = require('uuid');

const Comment = require('../models/Comment')
const User = require('../models/User')

const router = new Router()

router.get('/api/comments/:postId', async (ctx) => {
  try {
    const { postId } = ctx.params
    const comments = await Comment.find({ postId })
    const userIds = comments.map(({ userId }) => userId)
    const users = await User.find({ _id: { $in: userIds } })

  

    ctx.body = comments.map(comment => ({
      user: users.find(u => u._id === comment.userId),
      ...comment._doc
    }))

  } catch (err) {
    ctx.body = `error: ${err}`
  }
})

router.post('/api/comments', async (ctx) => {
  const { text, postId, userId } = ctx.request.body
  if (!text) {
    ctx.body = {
      error: 'Bad data'
    }
    return
  }

  const comment = new Comment()
  comment._id = uuidv4()
  comment.text = text
  comment.postId = postId
  comment.userId = userId

  try {
    const data = await comment.save()
    ctx.body = data
  } catch (err) {
    ctx.body = err
  }
})

router.delete('/api/comments/:id', async (ctx) => {
  const { id: _id } = ctx.params
  try {
    await Comment.deleteOne({
      _id
    })
  } catch (err) {
    ctx.body = `error${err}`
  }

  ctx.body = {
    status: 'deleted'
  }
})

router.put('/api/comments/:id', async (ctx) => {
  const { text } = ctx.request.body
  const { id: _id } = ctx.params
  if (!text) {
    ctx.body = {
      error: 'Bad data'
    }
    return
  }

  try {
    await Comment.findOneAndUpdate(
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
