var http = require('http'); // this is new
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

var server = http.createServer(app); // this is new

// add socket.io
var io = require('socket.io').listen(server);

// your server code here

// changed from *app*.listen(8080);
server.listen(9090);