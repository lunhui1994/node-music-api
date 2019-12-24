/**
 * 福利 api
 * 1. /list 图片列表
 * 
 */ 
const express = require('express')
const router = express.Router()
const service = require('../util/service.js')

router.get('/list', (req, res) => {
    service.asyncGetWelfareList(req.query).then((data)=>{
        res.end(JSON.stringify({
            code: 0,
            data: data
        }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

module.exports = router;