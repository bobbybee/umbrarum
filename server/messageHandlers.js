var net = require('net');

var gameState = {
	evilClueActive: true,
	evilClueState: {
		currentState: 0
	}
};

var evilClue = require("./evilClue");

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
			evilClue.connect();
		}
	},

	function(type) { // onDisconnect

	}
)

function log(ws, event) {
	console.log("[ LOG ] ("+ws.logID+"): "+JSON.stringify(event));

	if(event.event == "switchViews" && gameState.evilClueActive) {
		evilClue.view(event.newView);
	}
}

function castSpell(ws, event) {
	if(event.spell == "pande") {
		if(gameState.evilClueActive) {
			evilClue.reveal(ws);
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
	'log': log,
	'castSpell': castSpell
}