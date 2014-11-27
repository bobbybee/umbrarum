var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
	port: 8080
});

wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		try {
			var event = JSON.parse(message);
			console.info(event);
		} catch(e) {
			console.error(e);
		}
	})
	console.log("Hello");
});