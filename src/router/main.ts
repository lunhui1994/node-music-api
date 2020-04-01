// 总路由入口文件

import express = require('express');
const router = express.Router()

import musicRouter from './music';       // 音乐路由
import welfareRouter from './welfare';   // 福利路由

router.use('/music', musicRouter);
router.use('/welfare', welfareRouter);

export default router;