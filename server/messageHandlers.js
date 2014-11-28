var net = require('net');

var gameState = {
	evilClueActive: true,
	evilClueState: {
		currentState: 0
	}
};

var PeripheralManager = require("./PeripheralManager");

PeripheralManager.start(
	{ // skeleton
		'evil clue': function(message) {
			// evil clue is output only
		}
	},

	1234, // port
	
	function(type, connection) { // onConnect
		if(type == 'evil clue') {
			PeripheralManager.write("evil clue", "I have the clue.");
			PeripheralManager.write("evil clue", "\x94You don't. Haha.");
		}
	},

	function(type) { // onDisconnect

	}
)

function ping(ws, event) {
	return {
		'type': 'pong'
	}
}

function log(ws, event) {
	console.log("[ LOG ] ("+ws.logID+"): "+JSON.stringify(event));
	if(event.event == "switchViews" && gameState.evilClueActive) {
		if(gameState.evilClueState.currentState == 0) {
			gameState.evilClueState.currentState++;
			PeripheralManager.write("evilClue","\x0C\x11\x80");
			PeripheralManager.write("evilClue","Can't enchant me");
			PeripheralManager.write("evilClue","\x94Don't waste time");
		} else if(gameState.evilClueState.currentState == 1 && event.newView == "wand") {
			PeripheralManager.write("evilClue","\x0C\x11\x80");
			PeripheralManager.write("evilClue","Authorization...");
			PeripheralManager.write("evilClue","\x94DENIED! Go away.");
			gameState.evilClueState.currentState++;
		}
	}
}

function castSpell(ws, event) {
	if(event.spell == "pande") {
		if(gameState.evilClueActive) {
			PeripheralManager.write("evilClue",'\x0C\x11\x80');
			PeripheralManager.write("evilClue","OK, master :)");
			
			setTimeout(function() {
				PeripheralManager.write("evilClue",'\x0C\x11\x80');
				PeripheralManager.write("evilClue","Venefici, summon");
				setTimeout(function() {
					PeripheralManager.write("evilClue","\x94----Clue sent");
					ws.send(JSON.stringify({
						'type': 'newClue',
						'text': 'Lorem ipsum dolor sit amet'
					}));
				}, 1000);
			}, 3000);
		}
	} else {
		return {
			'type': 'spell',
			'success': false,
			'info': 'A spell must be created by a master venēficī before it is usable by name.'
		};
	}
}

module.exports = {
	'ping': ping,
	'log': log,
	'castSpell': castSpell
}