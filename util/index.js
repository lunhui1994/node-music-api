const searchUrl = '/soso/fcgi-bin/client_search_cp';
const albumimgUrl = 'http://imgcache.qq.com/music/photo/album_300/';
const tokenUrl = '/base/fcgi-bin/fcg_music_express_mobile3.fcg';
const lyricUrl = '/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
const top100Url = '/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923'

const url = {
    searchUrl: searchUrl,
    albumimgUrl: albumimgUrl,
    tokenUrl: tokenUrl,
    lyricUrl: lyricUrl,
    top100Url: top100Url,
}

module.exports = {
    url: url
}