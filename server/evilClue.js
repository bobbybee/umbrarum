var PeripheralManager = require("./PeripheralManager");

var clear = "\x0C\x11\x80";

module.exports = {
	view: function(state, newView) {
		if(state.currentState == 0) {
			state.currentState++;
			PeripheralManager.write("evil clue", clear);
			PeripheralManager.write("evil clue","Can't enchant me");
			PeripheralManager.write("evil clue","\x94Don't waste time");
		} else if(state.currentState == 1 && newView == "wand") {
			PeripheralManager.write("evil clue", clear);
			PeripheralManager.write("evil clue","Authorization...");
			PeripheralManager.write("evil clue","\x94DENIED! Go away.");
			state.currentState++;
		}
	},
	reveal: function(ws) {
		PeripheralManager.write("evil clue", clear);
		PeripheralManager.write("evil clue","OK, master :)");
		
		setTimeout(function() {
			PeripheralManager.write("evil clue", clear);
			PeripheralManager.write("evil clue","Venefici, summon");
			setTimeout(function() {
				PeripheralManager.write("evil clue","\x94----Clue sent");
				ws.send(JSON.stringify({
					'type': 'newClue',
					'text': 'Lorem ipsum dolor sit amet'
				}));
			}, 1000);
		}, 3000);
	},
	connect: function() {
		PeripheralManager.write("evil clue", "I've the clue.");
		PeripheralManager.write("evil clue", "\x94You don't. Haha.");
	}
}