function ping(ws, event) {
	return {
		'type': 'pong'
	}
}

function log(ws, event) {
	console.log("[ LOG ] ("+ws.logID+"): "+JSON.stringify(event));
}

function castSpell(ws, event) {
	if(event.spell == "open sesame") {
		return {
			'type': 'spell',
			'success': false,
			'info': 'If you are trying to cheat, you really ought to try harder.'
		};
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