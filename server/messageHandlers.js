var dns = require('dns'),
	log = require("./logger");

var globalMain = null;

var gameState = {
	evilClue: {
		active: true,
		currentState: 0
	},
};

var evilClue = require("./evilClue");
var register = require("./register");

var PeripheralManager = require("./PeripheralManager");
var ResourceManager = require("./ResourceManager");

PeripheralManager.start(
	{ // skeleton
		'evil clue': function(message) {
			// evil clue is output only
		},
		'torch': function(message) {

		}
	},

	1234, // port
	
	function(type, connection) { // onConnect
		if(type === 'evil clue') {
			evilClue.connect();
		}
	},
	function(type) { // onDisconnect

	}
);

function castSpell(ws, event) {
	if(event.spell === "pande") {
		if(gameState.evilClue.active)
			evilClue.reveal(ws);
	} else
	if(event.spell == "1" || event.spell == "0") {
		PeripheralManager.write("torch", event.spell);
	}
	else {
		return {
			'type': 'spell',
			'success': false,
			'info': 'A spell must be created by a master venēficī before it is usable by name.'
		};
	}
}

function resource(ws, event) {
	var rsrc = ResourceManager.get(event.uuid);

	if(rsrc) {
		return {
			'type': 'resource',
			'uuid': event.uuid,
			'content': rsrc
		};
	} else {
		return {
			'type': 'resource',
			'uuid': null,
			'content': null
		}
	}
}

function exec(ws, event) {
	log("EXEC RESPONSE " + event.result);
}

function chat(ws, event) {
	log("Chat response: " + event.response);
}

// admin control:
// this is bound only to localhost,
// you'll need to SSH in to use the control panel!

require('net').createServer(function(conn) {
	conn.on('data', function(m) {
		try {
			var msg = JSON.parse(m.toString());
			globalMain.send(msg.id, msg);
		} catch(e) {
			var msg = m.toString().split(' ');
			var id = msg[0];
			var action = msg[1];
			var payload = m.toString().slice(id.length+action.length+2);

			var output = {
				type: action
			};

			log("Payload: " + payload);

			if(action === 'chat') {
				output.request = payload;
			} else if(action === 'exec') {
				output.payload = payload;
			} 

			globalMain.send(id, output);
		}
	})
}).listen(1338, 'localhost');

function logEvent(ws, event) {
	dns.reverse(ws.logIP, function(err, domains) {

						// not available
		var hosts = (err ? "n.a." : domains.join(','));

		// it's ok to use eval here because it's just removing extra ""
		log("("+ws.logID+", "+hosts+"): " + JSON.stringify(event));

		if(event.event === "switchViews" && gameState.evilClue.active)
			evilClue.view(gameState.evilClue, event.newView);

	});
}

module.exports = {
	'callFromMain': function(a, main) {
		if(a == 0xDEADBEEF) { // magic number
			globalMain = main;
		}
	},
	'log': logEvent,
	'castSpell': castSpell,
	'register': register,
	'resource': resource,
	'exec': exec,
	'chat': chat
}
