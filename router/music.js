/**
 * 音乐 api
 * 1. /list 音乐列表
 * 2. /song 音乐地址
 * 3. /top 排行榜
 * 4. /lyric 歌词
 */

// URLSearchParams 处理url参数 
// var paramsString = "q=URLUtils.searchParams&topic=api"
// var searchParams = new URLSearchParams(paramsString);

const express = require('express')
const router = express.Router()
const service = require('../util/service.js')

router.get('/list', (req, res) => {
    service.asyncGetMusicList(req.query).then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
            }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

router.get('/song', (req, res) => {
    service.asyncGetMusicToken(req.query).then((data)=>{
        res.setHeader('Cache-Control', 'public, max-age=86400 ');
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

router.get('/top', (req, res) => {
    service.asyncGetMusicTop().then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

router.get('/lyric', (req, res) => {
    service.asyncGetLyric(req.query).then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: {
                lyric: data.lyric
            }
        }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

module.exports = router;