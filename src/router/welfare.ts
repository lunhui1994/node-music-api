/**
 * 福利 api
 * 1. /list 图片列表
 * 
 */ 
import express = require("express");
import service from '../util/service'
const router = express.Router()

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