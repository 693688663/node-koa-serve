const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');


const mysql = require('./views/js/mysql')
const { postData, getData } = require('./views/js/postData')
const ctxbody = require('./views/js/returnBody')
const { insert, select, update } = require('./views/js/mysqlFun')


const users = require('./routes/users')
const accountOperation = require('./routes/accountOperation')

// error handler
onerror(app)
app.use(cors())


app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'html'
}))

// logger
app.use(async (ctx, next) => {
  console.log("ctx-----------------", ctx)
  //挂载到util中
  ctx.mysql = mysql
  // 请求方式
  ctx.postData = postData
  ctx.getData = getData
  // body数据返回
  ctx.ctxbody = ctxbody
  // 数据库操作
  ctx.select = select
  ctx.insert = insert
  ctx.update = update

  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)

})

// routes
app.use(users.routes(), users.allowedMethods())
// 账号操作
app.use(accountOperation.routes(), accountOperation.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
