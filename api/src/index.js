const Koa = require('koa');

const app = new Koa();
const bodyParser = require('koa-body');
const cors = require('@koa/cors');

const mongoose = require('mongoose')
const routes = require('./routes')

app.use(bodyParser())
app.use(cors())

routes(app)

mongoose.connect(
  'mongodb://mongo:27017/fb_db',
  { useNewUrlParser: true }
).then(() => {
  console.log('Connected to MongoDB')
})

app.listen(5000, () => {
  console.log('Listening on 5000')
})
