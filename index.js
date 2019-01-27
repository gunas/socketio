var path = require('path')
var fs = require('fs')
var express = require('express');
var app = express()
var http = require('http').Server()
var io = require('socket.io')(http)


io.on('connection', function(socket) {
    console.log('a connection happened');
    socket.on('disconnect', () => {
        console.log('disconnection happened');
    });
    socket.on('rotation_command', function(command){
        io.emit('rotation_command_from_user', command);
    });
});
http.listen(80, () => {console.log('listening on 80')});