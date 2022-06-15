function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = '';
            ctx.req.addListener('data', (data) => {
                postdata += data;
            });
            ctx.req.on("end", function () {
                resolve(postdata);
            })
        } catch (error) {
            reject(error);
        }
    });
}

function parseQueryStr(queryStr) {
    return JSON.parse(queryStr);
}
//  
async function postData(data) {
    let postData = await parsePostData(data)
    return parseQueryStr(postData)
}
async function getData(data) {
    return data.query
}
module.exports = { postData, getData }