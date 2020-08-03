const Router = require('koa-router')
const { v4: uuidv4 } = require('uuid');

const User = require('../models/User')

const router = new Router()

router.get('/api/users', async (ctx) => {
  try {
    const users = await User.find()
    ctx.body = users
  } catch (err) {
    ctx.body = `error: ${err}`
  }
})

router.post('/api/users', async (ctx) => {
  const { name, surname, avatarUrl = 'https://github.com/ritathesaver/ms/blob/master/kek.jpg?raw=true' } = ctx.request.body
  if (!name || !surname || !avatarUrl) {
    ctx.body = {
      error: 'Bad data'
    }
    return
  }

  const user = new User()
  user._id = uuidv4()
  user.name = name
  user.surname = surname
  user.avatarUrl = avatarUrl
  try {
    const data = await new Promise((resolve, reject) => {
      user.save({}, (err, res) => {
        if (err) {
          reject(err)
          return
        }
        resolve(res)
      })
    })
    console.log(data)
    ctx.body = data
  } catch (err) {
    ctx.body = err
  }
})

router.delete('/api/users/:id', async (ctx) => {
  const { id: _id } = ctx.params
  try {
    await User.deleteOne({
      _id
    })
  } catch (err) {
    ctx.body = `error${err}`
  }

  ctx.body = {
    status: 'deleted'
  }
})

router.put('/api/users/:id', async (ctx) => {
  const { name, surname, avatarUrl } = ctx.request.body
  const { id: _id } = ctx.params
  if (!avatarUrl) {
    ctx.body = {
      error: 'Bad data'
    }
    return
  }

  try {
    await User.findOneAndUpdate(
      { _id },
      {
        name,
        surname,
        avatarUrl
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
