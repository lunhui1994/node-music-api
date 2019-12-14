const express = require('express')
const path = require('path')
const axios = require('axios')
const cache = require('apicache').middleware
const util = require('./util/index.js')
const app = express()

const apiUrl = util.url;

console.log(apiUrl);

let publicPath = path.resolve(__dirname, 'public');

// 解析jsonp返回数据 正则匹配
const jsonpRegExp = new RegExp(/(?<=callback\().*(?=\))/);

app.use(express.static(publicPath))

// cache
app.use(cache('5 minutes'));

let musicInterface = axios.create({
    baseURL: 'https://c.y.qq.com',
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
            res = JSON.parse(res.data.match(jsonpRegExp)[0]);
            let params  = {
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
    return new Promise (resolve => {
            musicInterface({
            method: 'get',
            url: apiUrl.tokenUrl,
            params: {
                format: 'json205361747',
                platform: 'yqq',
                cid: '205361747',
                guid: '126548448',
                songmid: songmid,
                filename: filename
            }}).then(res => {
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
            let params  = {
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


// 目前不需要async
async function asyncGetMusicList(params) {
    return await getMusicList(params);
}

async function asyncgetMusicToken(params) {
    return await getMusicToken(params);
}

async function asyncgetMusicTop() {
    return await getMusicTop();
}

app.get('/list', (req, res) => {
    asyncGetMusicList(req.query).then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
            }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

app.get('/music', (req, res) => {
    req.query.aggr = 1;
    req.query.flag_qc = 0;
    req.query.cr = 1;
    asyncgetMusicToken(req.query).then((data)=>{
        res.setHeader('Cache-Control', 'public, max-age=86400 ');
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

app.get('/top', (req, res) => {
    asyncgetMusicTop().then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

app.use(function(req, res) {
    res.statusCode = 404;
    res.end("404");
})


app.listen(8001, () => {
    console.log('listen on 8001');
})
