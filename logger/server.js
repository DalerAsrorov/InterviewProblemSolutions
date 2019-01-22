let express = require('express');
let fs = require('fs');

// initialize api
let app = express();
let hits = [];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/hits', function(req, res, next) {
    res.json({hits});

    next();
});

app.post('/hits', function(req, res, next) {
    hits.push(Date.now());

    next();
});

let server = app.listen(8080, function() {
    const {address: host, port} = server.address();
    console.log(server.address())
    console.log(`Hit logging server has started at http://${host}:${port}`);
});