function ping(ws, event) {
	return {
		'type': 'pong'
	}
}

module.exports = {
	'ping': ping,
}