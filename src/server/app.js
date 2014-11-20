#!/usr/bin/env node
/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./routes/utils/errorHandler')();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7202;
var staticFiles = express.static;
var routes;

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(compress());            // Compress response data with gzip
app.use(cors());                // enable ALL CORS requests
app.use(errorHandler.init);

routes = require('./routes/index')(app);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

var source = '';

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment){
    case 'build':
        console.log('** BUILD **');
        app.use('/', express.static('./build/'));
        break;
    default:
        console.log('** DEV **');
        app.use('/bower_components', staticFiles('./bower_components/'));
        app.use('/node_modules', staticFiles('./node_modules/'));
        app.use('/src/client', staticFiles('./src/client/'));
        app.use('/', staticFiles('./src/client/'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});