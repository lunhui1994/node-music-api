/**
 * 福利 api
 * 1. /list 图片列表
 * 
 */ 
const express = require('express')
const router = express.Router()
const service = require('../util/service.js')

router.get('/list', (req: { query: any }, res: { end: (arg0: string) => void }) => {
    service.asyncGetWelfareList(req.query).then((data: any)=>{
        res.end(JSON.stringify({
            code: 0,
            data: data
        }));
    }, (err: any) => {
        res.end(JSON.stringify(err));
    })
})

export default router;