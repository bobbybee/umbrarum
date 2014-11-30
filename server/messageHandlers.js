var gameState = {
	evilClue: {
		active: false,
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
		if(type == 'evil clue') {
			evilClue.connect();
		}
	},

	function(type) { // onDisconnect

	}
)

function log(ws, event) {
	console.log("[ LOG ] ("+ws.logID+"): "+JSON.stringify(event));

	if(event.event == "switchViews" && gameState.evilClue.active) {
		evilClue.view(gameState.evilClue, event.newView);
	}
}

function castSpell(ws, event) {
	if(event.spell == "pande") {
		if(gameState.evilClue.active) {
			evilClue.reveal(ws);
		}
	} else if(event.spell == "1" || event.spell == "0") {
		PeripheralManager.write("torch", event.spell);
	} else {
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

module.exports = {
	'log': log,
	'castSpell': castSpell,
	'register': register,
	'resource': resource
}