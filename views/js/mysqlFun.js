// 插入
function mysqlInsert() { }
// 查询
function mysqlSelect() { }
// 更新
function mysqlUpdate() { }
// 删除
function mysqlDeletedata() { }

function select(obj, name = '*') {

}
// 插入数据：数据库表，插入数据
function insert(mysqlTable, data) {
    let stringify = "INSERT"
    let keynum1 = 0
    let keynum2 = 0
    stringify += " "
    stringify += "INTO"
    stringify += " "
    stringify += mysqlTable
    stringify += " "
    stringify += "("
    for (var key in data) {
        if (!key) {
            break;
        }
        if (keynum1 == 0) {
            stringify += key
        } else {
            stringify += ","
            stringify += key
        }
        keynum1 += 1
    }
    stringify += ")"
    stringify += " "
    stringify += "VALUES"
    stringify += " "

    stringify += "("
    for (var key in data) {
        if (!key) {
            break;
        }
        if (keynum2 == 0) {
            stringify += '"'
            stringify += data[key]
            stringify += '"'
        } else {
            stringify += ","
            stringify += '"'
            stringify += data[key]
            stringify += '"'
        }
        keynum2 += 1
    }
    stringify += ");"
    console.log("stringify", stringify)
    return stringify;
}
// 更新数据: 数据库表，查询条件数据，修改数据
function update(mysqlTable, wheredata, changedata) {
    let stringify = "update"
    let keynum1 = 0
    let keynum2 = 0
    stringify += " "
    stringify += mysqlTable
    stringify += " "
    stringify += "set"
    stringify += " "
    for (var key in changedata) {
        if (keynum1 == 0) {
            stringify += key
            stringify += "="
            stringify += '"' + changedata[key] + '"'
        } else {
            stringify += ","
            stringify += key
            stringify += "="
            stringify += '"' + changedata[key] + '"'
        }
        keynum1 += 1
    }
    stringify += " "
    stringify += "where"
    stringify += " "
    for (var key in wheredata) {
        if (keynum2 == 0) {
            stringify += key
            stringify += "="
            stringify += '"' + wheredata[key] + '"'
        } else {
            stringify += " "
            stringify += "and"
            stringify += " "
            stringify += key
            stringify += "="
            stringify += '"' + wheredata[key] + '"'
        }
        keynum2 += 1
    }
    stringify += ";"
    console.log("stringify", stringify)
    return stringify
}
// 删除数据：数据库表，查询条件数据，删除数据
function del(mysqlTable, whereData, datalist) { }
// 查询数据：数据库表，查询条件数据，要查询的名称列表
function select(mysqlTable, datalist = {}, namelist = []) {
    let stringify = "select"
    let andNum = 0
    if (namelist.length == 0) {
        stringify += " "
        stringify += "*"
        stringify += " "
    } else {
        stringify += " "
        for (var i = 0; i < namelist.length; i++) {
            stringify += namelist[i]
            if (i != namelist.length - 1) {
                stringify += ","
            }
        }
        stringify += " "
    }
    stringify += "from"
    stringify += " "
    stringify += mysqlTable
    for (var key in datalist) {
        if (!key) {
            break;
        }
        if (andNum == 0) {
            stringify += " "
            stringify += "where"
            stringify += " "
        } else {
            stringify += " "
            stringify += "and"
            stringify += " "
        }
        if (key) {
            andNum += 1
            stringify += key
            stringify += "="
            stringify += '"' + datalist[key] + '"'
        }
    }
    stringify += ";"
    console.log("selectWhere", stringify)
    return stringify;
}
module.exports = { insert, select, update }
