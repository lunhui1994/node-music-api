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
import service from '../util/service'

router.get('/list', (req: { query: any }, res: { end: (arg0: string) => void }) => {
    service.asyncGetMusicList(req.query).then((data: any)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
            }));
    }, (err: any) => {
        res.end(JSON.stringify(err));
    })
})

router.get('/song', (req: { query: any }, res: { setHeader: (arg0: string, arg1: string) => void; end: (arg0: string) => void }) => {
    service.asyncGetMusicToken(req.query).then((data: any)=>{
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, (err: any) => {
        res.end(JSON.stringify(err));
    })
})

router.get('/top', (req: any, res: { end: (arg0: string) => void }) => {
    service.asyncGetMusicTop().then((data: any)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, (err: any) => {
        res.end(JSON.stringify(err));
    })
})

router.get('/lyric', (req: { query: any }, res: { end: (arg0: string) => void }) => {
    service.asyncGetLyric(req.query).then((data: any)=>{
        res.end(JSON.stringify({
            code: '0',
            data: {
                lyric: data.lyric
            }
        }));
    }, (err: any) => {
        res.end(JSON.stringify(err));
    })
})

export default router