var id2ws = {};

var messageHandlers = require('./messageHandlers');
messageHandlers.callFromMain(0xDEADBEEF, {
	'send': function(id, msg) {
		try {
			id2ws[id].send(JSON.stringify(msg));
		} catch(e) {
			console.error(e);
		}
	}
})

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
				var res = JSON.stringify(messageHandlers[event.type](ws, event));
				
				if(res)
					ws.send(res);
			} else {
				console.error("Unknown message type: "+event.type);
			}

		} catch(e) {
			console.error(e);
		}
	})

	ws.logIP = ws._socket.remoteAddress;
	ws.logID = ws.logIP+":"+ws._socket.remotePort;
	id2ws[ws.logID] = ws;
	console.log("Hello");
});