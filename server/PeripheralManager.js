var net = require('net');
var connectedPeripherals = {};
var peripheralSkeleton = {};

// skeleton is in form of:
// key: peripheral name
// value: (potentially anonymous) function for ondata
// stateless protocol; peripheral manager only cares about the handshaking

function PeripheralManager(skeleton, port, onConnect, onDisconnect) {
	peripheralSkeleton = skeleton;

	var log = function(msg, raw) {
		var date = new Date().toString().replace(/ GMT.*/gi, ""),
			_msg = "["+date+"]" + msg;

		if (raw) return _msg;
		else console.log(_msg);
	};

	var logError = function(err) {
		console.error(log(err, true));
	};

	net.createServer(function(conn) {
		var hasHandshaked = false;
		var peripheralType = "";

		conn.on('data', function(message) {
			if(hasHandshaked)
				peripheralSkeleton[peripheralType](message);
			else {
				peripheralType = message.toString().trim(); // remove newline at the end

				if(!peripheralSkeleton[peripheralType]) {
					logError("Peripheral of type '" + peripheralType + "' connected but no entry in skeleton");
					conn.destroy(); // kick
				}

				if(connectedPeripherals[peripheralType]) {
					logError("Peripheral of type '" + peripheralType + "' attempting a connection, but is already connected. Potential security threat.");
					conn.destroy(); // kick
				}

				connectedPeripherals[peripheralType] = conn;
				onConnect(peripheralType, conn);
				hasHandshaked = true;
				
				log(peripheralType + " connected!");
			}
		});

		conn.on('close', function() {
			connectedPeripherals[peripheralType] = null;
			onDisconnect(peripheralType);
		});

		conn.on('error', function() {
			connectedPeripherals[peripheralType] = null;
			onDisconnect(peripheralType);
		});
	}).listen(port);
}

module.exports.start = PeripheralManager;
module.exports.write = function(target, message) {
	if(connectedPeripherals[target])
		connectedPeripherals[target].write(message);
	else
		logError("Attempted to send message "+message+" to non-connected or unknown peripheral "+target);
};