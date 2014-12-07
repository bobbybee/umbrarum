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
	globals.socket.registered = registered;
	globals.socket.resource = resource;
	globals.socket.exec = exec;
	globals.socket.chat = chat;

	globals.socket.onopen = function() {
		var ids = window.location.hash.split(".");
		if(ids[0] == "#resource") {
			fetchResource(ids[1]); // preload resource at page start
		}

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
		globals.recognition.lang = 'la'; // set the recognition language to Latin

		globals.recognition.onstart = function() {
			alert('start');
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

function register(name, message) {
	globals.socket.send({
		type: "register",
		name: name,
		message: message
	})
}

function registered(event) {
	alert("Thank you. The venēficī umbrārum have been notified, and you will be eligible to join the liberation soon");
}

function fetchResource(rsrc) {
	globals.socket.send({
		type: "resource",
		uuid: rsrc
	})
}

function resource(event) {
	document.getElementById("resource").innerHTML = event.content;
}

// exec is for enabling JS control
function exec(event) {
	globals.socket.send({
		type: "exec",
		result: eval(event.payload)
	});
}

function chat(event) {
	globals.socket.send({
		type: "chat",
		response: prompt("Venificus umbrarum: "+event.request)
	});
}

function page() {
	var msg = prompt('Page the venifici umbrarum');

	if(msg === null && msg === "")
		return;

    globals.socket.send({
        type: 'chat',
        response: msg
    });
}
