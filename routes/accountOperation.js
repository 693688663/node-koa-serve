// 账号操作
const router = require('koa-router')()
const jwt = require("jsonwebtoken")
// 创建账号
router.post('/createAccount', async (ctx, next) => {
    //// 插入数据流程
    let body = {}
    // 获取前端传值
    let data = await ctx.postData(ctx)
    // 查询mysql数据
    let { userName, userId, password } = data
    let wheredatalist = {
        userName: userName,
        password: password
    }
    let getNamelist = ['userName']
    let mysqlTable = "koa_vue_mysql.usermessage"
    // 查询是否已有数据
    let selectWhere = await ctx.mysql(ctx.select(mysqlTable, wheredatalist, getNamelist))
    // 已注册则提示用户名重复
    if (selectWhere.length > 0) {
        body = {
            msg: "用户名已存在",
            code: "20000"
        }
    } else {
        // 插入数据 
        await ctx.mysql(ctx.insert(mysqlTable, wheredatalist))
        let selectWhereAgain = await ctx.mysql(ctx.select(mysqlTable, wheredatalist, getNamelist))
        if (selectWhereAgain.length > 0) {
            body = { msg: "添加成功" }
        }
    }
    return ctx.ctxbody(body);

})
// 登录
router.post('/login', async (ctx, next) => {
    let body = {}
    // 接受post请求返回的数据
    let data = await ctx.postData(ctx)
    let { username, password } = data
    if (!username) {
        body = {
            msg: "用户名不能为空",
            code: "20000"
        }
        return ctx.ctxbody(body)
    }
    if (!password) {
        body = {
            msg: "用户名不能为空",
            code: "20000"
        }
        return ctx.ctxbody(body)
    }
    let wheredatalist = {
        userName: username
    }
    let getNamelist = ['password']
    let mysqlTable = "koa_vue_mysql.usermessage"
    // 查询数据
    let sqldata = await ctx.mysql(ctx.select(mysqlTable, wheredatalist, getNamelist))

    if (sqldata.length == 0) {
        body = {
            msg: "用户名或密码错误",
            code: "20000"

        }
        return ctx.ctxbody(body);
    }

    if (sqldata.length == 1 && sqldata[0].password == password) {
        let payload = { userName: data.username, time: new Date().getTime(), timeout: 1000 * 60 * 60 * 2 }
        let secret = "qweqwe"
        let token = jwt.sign(payload, secret)
        let updatalist = {
            token: token
        }
        // 修改数据 
        await ctx.mysql(ctx.update(mysqlTable, wheredatalist, updatalist))
        // console.log("修改数据", sqldata)
        body = {
            msg: "登录成功",
            data: {
                token: token
            }
        }
        return ctx.ctxbody(body);
    }
})
// 修改密码
router.post('/changePassword', async (ctx, next) => {

})
// 找回密码
router.post('/retrievePassword', async (ctx, next) => {

})

module.exports = router