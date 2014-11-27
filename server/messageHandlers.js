var net = require('net');

function ping(ws, event) {
	return {
		'type': 'pong'
	}
}

function log(ws, event) {
	console.log("[ LOG ] ("+ws.logID+"): "+JSON.stringify(event));
}

var peripherals = {

}

// evil clue
net.createServer(function(conn) {
	if(!peripherals.evilClue) {
		peripherals.evilClue = conn;
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
		peripherals.evilClue.write('\x0C\x11\x80');
		//spellLED.write('0');
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