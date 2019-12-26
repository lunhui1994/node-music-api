// 总路由入口文件

const express = require('express')
const router = express.Router()

const musicRouter = require('./music.js')       // 音乐路由
const welfareRouter = require('./welfare.js')   // 福利路由

router.use('/music', musicRouter);
router.use('/welfare', welfareRouter);

module.exports = router;