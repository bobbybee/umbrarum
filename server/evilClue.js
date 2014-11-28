module.exports = {
	view: function(newView) {
		if(gameState.evilClueState.currentState == 0) {
			gameState.evilClueState.currentState++;
			PeripheralManager.write("evil clue","\x0C\x11\x80");
			PeripheralManager.write("evil clue","Can't enchant me");
			PeripheralManager.write("evil clue","\x94Don't waste time");
		} else if(gameState.evilClueState.currentState == 1 && newView == "wand") {
			PeripheralManager.write("evil clue","\x0C\x11\x80");
			PeripheralManager.write("evil clue","Authorization...");
			PeripheralManager.write("evil clue","\x94DENIED! Go away.");
			gameState.evilClueState.currentState++;
		}
	},
	reveal: function(ws) {
		PeripheralManager.write("evil clue",'\x0C\x11\x80');
		PeripheralManager.write("evil clue","OK, master :)");
		
		setTimeout(function() {
			PeripheralManager.write("evil clue",'\x0C\x11\x80');
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
		PeripheralManager.write("evil clue", "I have the clue.");
		PeripheralManager.write("evil clue", "\x94You don't. Haha.");
	}
}