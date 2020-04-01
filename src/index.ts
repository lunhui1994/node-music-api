import express = require('express');
import path = require('path');
const cache = require('apicache').middleware
const app = express()

// 路由
import mainRouter from './router/main';

let publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath))

// cache
app.use(cache('5 minutes'));

app.use('/', mainRouter);

app.use(function(req:any, res:any) {
    res.statusCode = 404;
    res.end("404");
})

app.listen(8001, () => {
    console.log('listen on 8001');
})
