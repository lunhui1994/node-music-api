const express = require('express')
const path = require('path')
const cache = require('apicache').middleware
const service = require('./util/service.js')
const app = express()

let publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath))

// cache
app.use(cache('5 minutes'));

app.get('/list', (req, res) => {
    service.asyncGetMusicList(req.query).then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
            }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

app.get('/music', (req, res) => {
    req.query.aggr = 1;
    req.query.flag_qc = 0;
    req.query.cr = 1;
    service.asyncgetMusicToken(req.query).then((data)=>{
        res.setHeader('Cache-Control', 'public, max-age=86400 ');
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

app.get('/top', (req, res) => {
    service.asyncgetMusicTop().then((data)=>{
        res.end(JSON.stringify({
            code: '0',
            data: data
        }));
    }, err => {
        res.end(JSON.stringify(err));
    })
})

app.use(function(req, res) {
    res.statusCode = 404;
    res.end("404");
})

app.listen(8001, () => {
    console.log('listen on 8001');
})
