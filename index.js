var path = require('path')
var fs = require('fs')
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser')
var url = require('querystring')
var cache = require('memory-cache');



app.use(cookieParser())
app.use(session({secret: 'secret', 
                 saveUninitialized: true,
                 resave: true}))

app.get('/sstore', function(req, res) {
let lastcommand = req.query.lastcommand;
cache.put(req.query.sid, req.query.lastcommand);
res.send();
});

app.get('/lastcommand', function(req, res) {
let lastcommand = req.session.lastcommand;
res.send(cache.get(req.query.sid));
});

io.on('connection', function(socket) {
    console.log('a connection happened');
    socket.on('disconnect', () => {
        console.log('disconnection happened');
    });
    socket.on('rotation_command', function(command){
        io.emit('rotation_command_from_user', command);
    });
    socket.on('move_command', function(command){
        io.emit('move_command_from_user', command);
    });
});
http.listen(80, () => {console.log('listening on 80')});