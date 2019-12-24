const express = require('express')
const router = express.Router()

const musicRouter = require('./music.js')
const welfareRouter = require('./welfare.js')

router.use('/music', musicRouter);
router.use('/welfare', welfareRouter);

module.exports = router;