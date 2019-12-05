const express = require('express')
const path = require('path')
const axios = require('axios')

const app = express()

let publicPath = path.resolve(__dirname, 'public');

const searchUrl = '/soso/fcgi-bin/client_search_cp';
const albumimgUrl = 'http://imgcache.qq.com/music/photo/album_300/';
const tokenUrl = '/base/fcgi-bin/fcg_music_express_mobile3.fcg';
const lyricUrl = '/lyric/fcgi-bin/fcg_query_lyric_new.fcg';


const jsonpRegExp = new RegExp(/(?<=callback\().*(?=\))/);

app.use(express.static(publicPath))

let musicInterface = axios.create({
    baseURL: 'https://c.y.qq.com',
    timeout: 2 * 1000
})
// 获取音乐列表
function getMusicList(params, callback) {
    return new Promise((resolve, reject) => {
        musicInterface({
            method: 'get',
            url: searchUrl,
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
                    albumimg: albumimgUrl + item.albumid % 100 + '300_albumpic_' + item.albumid + '_0.jpg'
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
            url: tokenUrl,
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
                    musicUrl: musicUrl
                });
            }, err => {
                reject(err);
            })
    })
}

async function asyncGetMusicList(params) {
    return await getMusicList(params);
}

async function asyncgetMusicToken(params) {
    return await getMusicToken(params);
}

app.get('/list', (req, res) => {
    asyncGetMusicList(req.query).then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
            }));
    }, err => {
        res.end(err);
    })
})

app.get('/music', (req, res) => {
    asyncgetMusicToken(req.query).then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, err => {
        res.end(err);
    })
})

app.use(function(req, res) {
    res.statusCode = 404;
    res.end("404");
})


app.listen(8001, () => {
    console.log('listen on 8001');
})