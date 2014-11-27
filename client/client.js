function WSSClient(target, port) {
	this.target = target;
	this.port = port;
	this.destination = "ws://"+this.target+":"+this.port;
	this.socket = null;
}

WSSClient.prototype.connect = function() {
	this.socket = new WebSocket(this.destination);

	var that = this;

	this.socket.onmessage = function(e) {
		that.message(e.data);
	};

	this.socket.onopen = this.onopen;
	this.socket.onerror = this.onerror;
	this.socket.onclose = this.onclose;
}

WSSClient.prototype.message = function(msg) {

}

WSSClient.prototype.onopen = function() {
	console.log("onopen");
}

WSSClient.prototype.onerror = function() {
	console.log("onerror");
}

WSSClient.prototype.onclose = function() {
	console.log("onclose");
}

WSSClient.prototype.write = function(data) {
	this.socket.send(data);
}

WSSClient.prototype.