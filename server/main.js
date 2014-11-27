var messageHandlers = require('./messageHandlers');

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
	port: 8080
});

wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		try {
			var event = JSON.parse(message);
			console.info(event);

			if(messageHandlers[event.type || '']) {
				ws.send(JSON.stringify(messageHandlers[event.type](ws, event)));
			} else {
				console.error("Unknown message type: "+event.type);
			}

		} catch(e) {
			console.error(e);
		}
	})

	ws.logID = ws._socket.remoteAddress+":"+ws._socket.remotePort;
	console.log("Hello");
});