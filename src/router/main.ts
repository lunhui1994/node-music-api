// 总路由入口文件

import express = require('express');
const router = express.Router()

import musicRouter from './music';       // 音乐路由
import welfareRouter from './welfare';   // 福利路由
import { nextTick } from 'process';

router.use('*', (req, res, next) => {
    // let getClientIp = function (req:any) {
    //     return req.headers['x-forwarded-for'] ||
    //         req.connection.remoteAddress ||
    //         req.socket.remoteAddress ||
    //         req.connection.socket.remoteAddress || '';
    // };
     
    // console.log(getClientIp(req));
    // let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
    // console.log(ip);
    // ip = ip ? ip.join('.') : null;
    // console.log(ip);
    console.log(req.headers)
    next()
})
router.use('/music', musicRouter);
router.use('/welfare', welfareRouter);

export default router;