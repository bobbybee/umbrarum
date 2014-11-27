function ViewManager(defaultView, views) {
	this.defaultView = defaultView;
	this.views = views;
	this.currentView = this.defaultView;

	for(var i = 0; i < this.views.length; ++i) {
		if(this.views[i] != this.defaultView) {
			this.hideView(this.views[i]);
		}
	}
}

ViewManager.prototype.switchViews = function(newView) {
	this.hideView(this.currentView);
	this.currentView = newView;
	this.showView(this.currentView);

	if(globals.logger) {
		globals.logger.log({
			event: "switchViews",
			newView: newView
		});
	}
}

ViewManager.prototype.getViewDiv = function(view) {
	return document.getElementById('view '+view);
}

ViewManager.prototype.hideView = function(view) {
	this.getViewDiv(view).style.display = 'none';
}

ViewManager.prototype.showView = function(view) {
	this.getViewDiv(view).style.display = 'block';
}

function Logger(ws) {
	this.ws = ws;
}

Logger.prototype.log = function(message) {
	message.type = "log";

	this.ws.send(message);
}

window.onload = function() {
	globals.viewManager = new ViewManager(globals.defaultView, globals.views);
	
	globals.socket = new WSClient(globals.host, globals.port);
	globals.socket.spell = spellResult;

	globals.socket.onopen = function() {
		globals.logger.log({
			event: "switchViews",
			newView: globals.defaultView
		});
	};

	globals.socket.connect();

	globals.logger = new Logger(globals.socket);
}

function castSpell(spell) {
	globals.socket.send({
		type: "castSpell",
		spell: spell
	});
}

function spellResult(event) {
	if(globals.viewManager.currentView == "wand") {
		alert(event.success+" "+event.info);
	} else {
		console.error("spellResult "+JSON.stringify(event)+" at view "+globals.viewManager.currentView);
	}
}