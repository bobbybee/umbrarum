var net = require('net');

function ping(ws, event) {
	return {
		'type': 'pong'
	}
}

function log(ws, event) {
	console.log("[ LOG ] ("+ws.logID+"): "+JSON.stringify(event));
}

var spellLED = null;

net.createServer(function(conn) {
	spellLED = conn;
}).listen(1234);

function castSpell(ws, event) {
	if(event.spell == "open sesame") {
		return {
			'type': 'spell',
			'success': false,
			'info': 'If you are trying to cheat, you really ought to try harder.'
		};
	} else if(event.spell == "illustra") {
		spellLED.write('1');
	} else if(event.spell == "exstingue") {
		spellLED.write('0');
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