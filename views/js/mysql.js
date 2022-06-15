//封装mysql
const mysql = require('mysql')
let pools = {}//连接池
let config = {
    // 数据库配置
    database: {
        database: 'koa_vue_mysql',//数据库名
        user: 'root',//用户名
        password: 'qwer1234',//密码
        port: '3306',//端口
        host: '127.0.0.1'//
        // host: 'localhost'//
    }

}

var pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

let query = function (sqlStatement) {
    return new Promise((resolve, reject) => {
        pool.query(sqlStatement, function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
        });
    })
}


module.exports = query