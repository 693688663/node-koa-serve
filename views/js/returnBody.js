function returnBody(body) {
    console.log({
        body: body.data || {},
        code: body.code || "10000",
        msg: body.msg || "success"
    })
    this.body = {
        body: body.data || {},
        code: body.code || "10000",
        msg: body.msg || "success"
    }
}
module.exports = returnBody