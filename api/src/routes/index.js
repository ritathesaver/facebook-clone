const posts = require('./posts')
const users = require('./users')
const likes = require('./likes')
const comments = require('./comments')

const defineRoutes = (app) => {
  app.use(posts.routes())
  app.use(users.routes())
  app.use(likes.routes())
  app.use(comments.routes())
}

module.exports = defineRoutes
