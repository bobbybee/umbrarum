var net = require('net');

var gameState = {
	evilClueActive: true,
	evilClueState: {
		currentState: 0
	}
};

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
			peripherals.evilClue.write("\x0C\x11\x80");
			peripherals.evilClue.write("Can't enchant me");
			peripherals.evilClue.write("\x94Don't waste time");
		} else if(gameState.evilClueState.currentState == 1 && event.newView == "wand") {
			peripherals.evilClue.write("\x0C\x11\x80");
			peripherals.evilClue.write("Authorization...");
			peripherals.evilClue.write("\x94DENIED! Go away.");
			gameState.evilClueState.currentState++;
		}
	}
}

var peripherals = {
	evilClue: new Buffer(0)
}

// evil clue
net.createServer(function(conn) {
	if(!peripherals.evilClue) {
		peripherals.evilClue = conn;
		peripherals.evilClue.write("I have the clue.");
		peripherals.evilClue.write("\x94You don't. Haha.");
		console.info("Evil clue connected");
	} else {
		console.warn("Evil clue is already connected, but someone else is connecting");
	}
}).listen(1234);

function castSpell(ws, event) {
	peripherals.evilClue.write(event.spell);

	if(event.spell == "open sesame") {
		return {
			'type': 'spell',
			'success': false,
			'info': 'If you are trying to cheat, you really ought to try harder.'
		};
	} else if(event.spell == "illustra") {
		//spellLED.write('1');
	} else if(event.spell == "exstingue") {
		if(gameState.evilClueActive)
			peripherals.evilClue.write('\x0C\x11\x80');
	} else if(event.spell == "pande") {
		if(gameState.evilClueActive) {
			peripherals.evilClue.write('\x0C\x11\x80');
			peripherals.evilClue.write("OK, master :)");
			
			setTimeout(function() {
				peripherals.evilClue.write('\x0C\x11\x80');
				peripherals.evilClue.write("Venefici, summon");
				setTimeout(function() {
					peripherals.evilClue.write("\x94----Clue sent");
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