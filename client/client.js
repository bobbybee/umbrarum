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

}

WSClient.prototype.onopen = function() {
	console.log("onopen");
}

WSClient.prototype.onerror = function() {
	console.log("onerror");
}

WSClient.prototype.onclose = function() {
	console.log("onclose");
}

WSClient.prototype.write = function(data) {
	this.socket.send(data);
}

WSClient.prototype.send = function(msg) {
	this.write(JSON.stringify(msg));
}