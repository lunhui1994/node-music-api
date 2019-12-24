const axios = require('axios')
const util = require('./index.js')

const apiUrl = util.url;
const regExp = util.regExp;
const json2url = util.json2url;

let musicInterface = axios.create({
    baseURL: 'https://c.y.qq.com',
    timeout: 2 * 1000
})

let welfareInterface = axios.create({
    baseURL: 'http://gank.io',
    timeout: 2 * 1000
})

// 获取音乐列表
function getMusicList(params, callback) {
    return new Promise((resolve, reject) => {
        musicInterface({
            method: 'get',
            url: apiUrl.searchUrl,
            params: params
        }).then(res => {
            res = JSON.parse(res.data.match(regExp.jsonpRegExp)[0]);
            let params = {
                curnum: res.data.song.curnum,
                curpage: res.data.song.curpage,
                list: []
            }

            for (let item of res.data.song.list) {
                params.list.push({
                    songname: item.songname,
                    singer: item.singer[0],
                    albumname: item.albumname,
                    songmid: item.songmid,
                    albumimg: apiUrl.albumimgUrl + item.albumid % 100 + '/300_albumpic_' + item.albumid + '_0.jpg'
                })
            }
            resolve(params);
        }, err => {
            reject(err);
        })
    })
}

// 获取token 拼接播放地址
function getMusicToken(params) {
    let songmid = params.songmid;
    let filename = 'C400' + params.songmid + '.m4a';
    return new Promise(resolve => {
        musicInterface({
            method: 'get',
            url: apiUrl.tokenUrl,
            params: {
                format: 'json205361747',
                platform: 'yqq',
                cid: '205361747',
                guid: '5043253136', //126548448
                songmid: songmid,
                filename: filename
            }
        }).then(res => {
            let musicUrl = "http://ws.stream.qqmusic.qq.com/" + res.data.data.items[0].filename + "?fromtag=0&guid=" + params.guid + '&vkey=' + res.data.data.items[0].vkey
            resolve({
                vkey: res.data.data.items[0].vkey,
                musicUrl: musicUrl
            });
        }, err => {
            reject(err);
        })
    })
}

// 获取top100
function getMusicTop() {
    return new Promise((resolve, reject) => {
        musicInterface({
            method: 'get',
            url: apiUrl.top100Url
        }).then(res => {
            res = res.data;
            let params = {
                code: res.code,
                date: res.date,
                curnum: res.total_song_num,
                curpage: 1,
                list: [],
                topinfo: res.topinfo
            }

            for (let item of res.songlist) {
                params.list.push({
                    cur_count: item.cur_count,
                    songname: item.data.songname,
                    singer: item.data.singer[0],
                    albumname: item.data.albumname,
                    songmid: item.data.songmid,
                    albumimg: apiUrl.albumimgUrl + item.data.albumid % 100 + '300_albumpic_' + item.data.albumid + '_0.jpg'
                })
            }
            resolve(params);
        }, err => {
            reject(err);
        })
    })
}


// async
async function asyncGetMusicList(params) {
    return await getMusicList(params);
}

async function asyncGetMusicToken(params) {
    return await getMusicToken(params);
}

async function asyncGetMusicTop() {
    return await getMusicTop();
}


// 获取福利图片列表
function getWelfareList(params, callback) {
    return new Promise((resolve, reject) => {
        welfareInterface({
            method: 'get',
            url: encodeURI(apiUrl.welfareUrl + params.per_page + '/' + params.page),
        }).then(res => {
            resolve(res.data);
        }, err => {
            reject(err);
        })
    })
}

async function asyncGetWelfareList(params) {
    return await getWelfareList(params);
}

module.exports = {
    getMusicList: getMusicList,
    asyncGetMusicList: asyncGetMusicList,
    getMusicToken: getMusicToken,
    asyncGetMusicToken: asyncGetMusicToken,
    getMusicTop: getMusicTop,
    asyncGetMusicTop: asyncGetMusicTop,
    getWelfareList: getWelfareList,
    asyncGetWelfareList: asyncGetWelfareList,
}