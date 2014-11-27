function WSClient(target, port) {
	this.target = target;
	this.port = port;
	this.destination = "ws://"+this.target+":"+this.port;
	this.socket = null;
}

WSClient.prototype.connect = function() {
	this.socket = new WebSocket(this.destination);

	var that = this;

	this.socket.onmessage = function(e) {
		that.message(e.data);
	};

	this.socket.onopen = this.onopen;
	this.socket.onerror = this.onerror;
	this.socket.onclose = this.onclose;
}

WSClient.prototype.message = function(msg) {
	this.onmessage(JSON.parse(msg));
}

WSClient.prototype.onmessage = function(msg) {
	console.info(msg);

	if(this[msg.type]) {
		this[msg.type](msg);
	} else {
		console.error(msg.type+" response but no method on: ");
		console.info(this);
	}
}

WSClient.prototype.onopen = function() {
	console.info("onopen");
}

WSClient.prototype.onerror = function() {
	console.error("onerror");
}

WSClient.prototype.onclose = function() {
	console.error("onclose");
}

WSClient.prototype.write = function(data) {
	this.socket.send(data);
}

WSClient.prototype.send = function(msg) {
	this.write(JSON.stringify(msg));
}