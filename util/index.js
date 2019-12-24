const searchUrl = '/soso/fcgi-bin/client_search_cp';
const albumimgUrl = 'http://imgcache.qq.com/music/photo/album_300/';
const tokenUrl = '/base/fcgi-bin/fcg_music_express_mobile3.fcg';
const lyricUrl = '/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
const top100Url = '/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923'

const welfareUrl = '/api/data/福利/';

const url = {
    searchUrl: searchUrl,
    albumimgUrl: albumimgUrl,
    tokenUrl: tokenUrl,
    lyricUrl: lyricUrl,
    top100Url: top100Url,
    welfareUrl: welfareUrl,
}

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
    url: url,
    regExp: regExp,
    json2url: json2url
}