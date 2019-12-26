// 解析jsonp返回数据 正则匹配
const jsonpRegExp = new RegExp(/(?<=callback\().*(?=\))/);

const regExp = {
    jsonpRegExp: jsonpRegExp
}

/**
 * {name:'jack',age:12,height:160} => 'jack/12/160'
*/
const json2url = (params) => {
    let url = '';
    for (let key in params) {
        url += '/' + params[key];
    }
    return url;
}

module.exports = {
    regExp: regExp,
    json2url: json2url
}