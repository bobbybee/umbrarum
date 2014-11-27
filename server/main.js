var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
	port: 8080
});

wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		console.log(message);
	})
	console.log("Hello");
});