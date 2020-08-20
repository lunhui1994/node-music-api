// 接口函数

import axios from 'axios';
import util from './index';
import { getSign } from '../vender/sign';
const regExp = util.regExp;
const json2url = util.json2url;

/**
 * @TODO 音乐 axios实例
 */
let musicInterface = axios.create({
    baseURL: 'https://c.y.qq.com',
    timeout: 2 * 1000
})
/**
 * @TODO 音乐url axios实例
 */
let musicTokenInterface = axios.create({
    baseURL: 'https://u.y.qq.com',
    timeout: 2 * 1000
})
/**
 * @TODO 福利 axios实例
 */
let welfareInterface = axios.create({
    baseURL: 'http://gank.io',
    timeout: 2 * 1000
})

// apiUrl 实际代理地址 
const apiUrl = {
    searchUrl: '/soso/fcgi-bin/client_search_cp',
    albumimgUrl: 'http://imgcache.qq.com/music/photo/album_300/',
    tokenUrl: '/cgi-bin/musics.fcg', ///base/fcgi-bin/fcg_music_express_mobile3.fcg
    lyricUrl: '/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    top100Url: '/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923',
    welfareUrl: '/api/data/福利/',
};

// 获取音乐列表
function getMusicList(params: any) {
    return new Promise((resolve, reject) => {
        musicInterface({
            method: 'get',
            url: apiUrl.searchUrl,
            params: params
        }).then((res: { data: { match: (arg0: any) => string[]; song: { curnum: any; curpage: any; list: any; }; }; }) => {
            res = JSON.parse(res.data.match(regExp.jsonpRegExp)[0]);
            class paramC {
                curnum: number = res.data.song.curnum
                curpage: number = res.data.song.curpage
                list: any[] = []
            }
            let params = new paramC();
            for (let item of res.data.song.list) {
                params.list.push({
                    songname: item.songname,
                    singer: item.singer[0],
                    albumname: item.albumname,
                    songmid: item.songmid,
                    albumimg: apiUrl.albumimgUrl + (item.albumid % 100) + '/300_albumpic_' + item.albumid + '_0.jpg'
                })
            }
            resolve(params);
        }, (err: any) => {
            reject(err);
        })
    })
}

/**
    * @TODO: 获取token 拼接播放地址
    * @param: format 'json205361747',
    * @param: platform 'yqq',
    * @param: cid '205361747',
    * @param: guid //126548448 5043253136
    * @param: songmid 歌曲songmid，需要在搜索歌曲后获取
    * @param: filename 文件名
    */

interface tokenParams {
    guid: string
    songmid: string
}
interface tokenLyricData {
    lyric: string
    code: string
} 
// 获取sign所需信息，发送请求
class tokenData {
    req = {
        "module": "CDN.SrfCdnDispatchServer",
        "method": "GetCdnDispatch",
        param: {}
    }
    req_0 =  {
        "module": "vkey.GetVkeyServer",
        "method": "CgiGetVkey",
        "param": {
            "guid": '',
            "songmid": [''],
            "songtype": [
                0
            ],
            "uin": "562032497",
            "loginflag": 1,
            "platform": "20"
        }
    }
    comm = {
        "uin": 562032497, // 自定义qq号
        "format": "json",
        "ct": 24,
        "cv": 0
    }
    constructor(parameters: tokenParams) {
        this.req.param = {
            "guid": parameters.guid,
            "calltype": 0,
            "userip": ""
        }
        this.req_0.param.guid = parameters.guid
        this.req_0.param.songmid = [parameters.songmid]
    }
}
function getMusicToken(params: tokenParams, lyricData?: tokenLyricData) {
    let data = new tokenData(params)
    let signStr = getSign(data);
    let params_data = {
        sign: signStr,
        data: data
    }
    return new Promise((resolve, reject) => {
        musicTokenInterface({
            method: 'get',
            headers: {
                Referer: "https://y.qq.com",
                Origin: "https://y.qq.com"
            },
            url: apiUrl.tokenUrl,
            params: params_data
        }).then((res: any) => {
            let filename = 'C400' + params.songmid + '.m4a';
            console.log("https://ws.stream.qqmusic.qq.com/" + filename + "?fromtag=66&uin=0&guid=" + params.guid + '&vkey=' + res.data.req_0.data.midurlinfo[0].vkey)
            // let musicUrl = "https://ws.stream.qqmusic.qq.com/" + filename + "?fromtag=66&uin=0&guid=" + params.guid + '&vkey=' + res.data.req_0.data.midurlinfo[0].vkey
            let musicUrl = "https://ws.stream.qqmusic.qq.com/" + res.data.req_0.data.midurlinfo[0].purl;
            let lyric = (lyricData && lyricData.code == '0') ? lyricData.lyric : '无';
            resolve({
                vkey: res.data.req_0.data.midurlinfo[0].vkey,
                musicUrl: musicUrl,
                lyric: lyric
            });
        }, (err: any) => {
            reject(err);
        })
    })
}

/**
	* @TODO: 获取top100
    */
class paramC {
    code: string = ''
    date: string = ''
    curnum: number = 0
    curpage: number = 1
    list: any[] = []
    topinfo: any = undefined
    constructor(parameters: any) {
        this.code = parameters.code
        this.date = parameters.date
        this.curnum = parameters.total_song_num
        this.topinfo = parameters.topinfo
    }
}
function getMusicTop() {
    return new Promise((resolve, reject) => {
        musicInterface({
            method: 'get',
            url: apiUrl.top100Url
        }).then((res: any) => {
            res = res.data;
            let params = new paramC(res);
            for (let item of res.songlist) {
                params.list.push({
                    cur_count: item.cur_count,
                    songname: item.data.songname,
                    singer: item.data.singer[0],
                    albumname: item.data.albumname,
                    songmid: item.data.songmid,
                    albumimg: apiUrl.albumimgUrl + item.data.albumid % 100 + '/300_albumpic_' + item.data.albumid + '_0.jpg'
                })
            }
            resolve(params);
        }, (err: any) => {
            reject(err);
        })
    })
}

/**
	* @TODO: 获取歌词
	* @param: songmid 歌曲songmid，需要在搜索歌曲后获取
	* @param: format 格式，建议加上format=json
	* @param: nobase64 默认0, 必须填1格式化返回数据
    */
function getLyric(params: { format: string; nobase64: number; }) {
    params.format = 'json';
    params.nobase64 = 1;
    return new Promise((resolve, reject) => {
        musicInterface({
            method: 'get',
            headers: {
                'Referer': 'https://y.qq.com/portal/player.html'
            },
            url: apiUrl.lyricUrl,
            params: params
        }).then((res: { data: unknown; }) => {
            resolve(res.data);
        }, (err: any) => {
            reject(err);
        })
    })
}

// async 
/**
 * 
 * @TODO 后续更改async用法方式。
 */
// 搜索列表
async function asyncGetMusicList(params: any) {
    return await getMusicList(params);
}
// 歌曲地址
async function asyncGetMusicToken(params: any) {
    if (params.lyric == '1') {
        let lyricData: any = await getLyric(params);
        return await getMusicToken(params, lyricData);
    } else {
        return await getMusicToken(params);
    }
}
// top100
async function asyncGetMusicTop() {
    return await getMusicTop();
}
// 歌词
async function asyncGetLyric(params: any) {
    return await getLyric(params);
}

// 获取福利图片列表
function getWelfareList(params: { per_page: string; page: string; }) {
    return new Promise((resolve, reject) => {
        welfareInterface({
            method: 'get',
            url: encodeURI(apiUrl.welfareUrl + params.per_page + '/' + params.page),
        }).then((res: { data: unknown; }) => {
            resolve(res.data);
        }, (err: any) => {
            reject(err);
        })
    })
}

async function asyncGetWelfareList(params: any) {
    return await getWelfareList(params);
}

export default {
    getMusicList: getMusicList,
    asyncGetMusicList: asyncGetMusicList,
    getMusicToken: getMusicToken,
    asyncGetMusicToken: asyncGetMusicToken,
    getMusicTop: getMusicTop,
    asyncGetMusicTop: asyncGetMusicTop,
    getLyric: getLyric,
    asyncGetLyric: asyncGetLyric,
    getWelfareList: getWelfareList,
    asyncGetWelfareList: asyncGetWelfareList,

}
