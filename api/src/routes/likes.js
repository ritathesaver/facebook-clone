const Router = require('koa-router')
const { v4: uuidv4 } = require('uuid');

const Like = require('../models/Like')

const router = new Router()

router.post('/api/likes', async (ctx) => {
  const { postId, userId } = ctx.request.body
  if (!postId) {
    ctx.body = {
      error: 'Bad data'
    }
    return
  }

  const like = new Like()
  like._id = uuidv4()
  like.postId = postId
  like.userId = userId
  try {
    const data = await like.save()
    ctx.body = data
  } catch (err) {
    ctx.body = err
  }
})

router.delete('/api/likes/:postId/:userId', async (ctx) => {
  const { postId, userId } = ctx.params
  try {
    await Like.deleteOne({
      postId,
      userId
    })
  } catch (err) {
    ctx.body = `error${err}`
  }

  ctx.body = {
    status: 'deleted'
  }
})

module.exports = router
