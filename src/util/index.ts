// 解析jsonp返回数据 正则匹配
const jsonpRegExp = new RegExp(/(?<=callback\().*(?=\))/);

const regExp = {
    jsonpRegExp: jsonpRegExp
}

/**
 * {name:'jack',age:12,height:160} => 'jack/12/160'
*/

interface json2urlin {
    name:string
    age:number
    height:number
}

const json2url = (params: json2urlin[]):string => {
    let url = '';
    for (let key in params) {
        url += '/' + params[key];
    }
    return url;
}

export default {
    regExp: regExp,
    json2url: json2url
}
