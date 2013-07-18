var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/static'));

function WordGame(){
	this.p1 = null;
	this.p2 = null;

	this.letters = 'asdfghk';
}

WordGame.prototype.join = function(socket){
	if (this.p1 === null){
		this.p1 = socket;
		return 1;
	}else if (this.p2 === null){
		this.p2 = socket;
		return 2;
	}
	return -1;
}


var games = {};


io.sockets.on('connection', function(socket){
	console.log('connected!')

	socket.on('join', function(room, fn){
		if (!games.hasOwnProperty(room)){
			games[room] = new WordGame();
		}
		fn(games[room].join(socket));
	})
    
    socket.on('disconnect', function(){
        console.log('disconnect!', arguments);
    });
});


server.listen(9090);