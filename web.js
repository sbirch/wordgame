var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/static'));

function WordGame(){
	this.p1 = null;
	this.p2 = null;
}

WordGame.prototype.join = function(){
	
}



io.sockets.on('connection', function(socket){
	console.log('connected!')

	socket.emit('handshake', 'Hello, world!')
    
    socket.on('disconnect', function(){
        console.log('disconnect!', arguments);
    });
});


server.listen(9090);