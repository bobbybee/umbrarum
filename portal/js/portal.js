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

ViewManager.prototype.getViewDiv = function(id) {
	return document.getElementById(id);
}

ViewManager.prototype.hideView = function(view) {
	var div = this.getViewDiv(view);
    //move(div).set('width', 0).end();
    setTimeout(function(){
        div.style.display = 'none';
    }, 500);
}

ViewManager.prototype.showView = function(view) {
	var div = this.getViewDiv(view);
    //move(div).set('width', 400).end();
    setTimeout(function(){
        div.style.display = 'block';
    }, 500);
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
	globals.socket.newClue = newClue;

	globals.socket.onopen = function() {
		globals.logger.log({
			event: "switchViews",
			newView: globals.defaultView
		});
	};

	globals.socket.connect();

	globals.logger = new Logger(globals.socket);

	if('webkitSpeechRecognition' in window) {
		// enable experimental speech recognition for casting spells in supporting browsers
		// that is, recent versions of Google Chrome, and possibly Android
		globals.recognition = new webkitSpeechRecognition();
		globals.lang = 'la'; // set the recognition language to Latin

		globals.recognition.onstart = function() {

		};

		globals.recognition.onresult = function(event) {
			var result = "";
			for(var i = event.resultIndex; i < event.results.length; ++i) {
				if(event.results[i].isFinal) {
					result += event.results[i][0].transcript;
				}
			}

			if(result.length) {
				console.info(result);
			}
		};

		globals.recognition.onerror = function() {

		};
	}
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

function newClue(event) {
	alert("New clue! "+event.text);
}