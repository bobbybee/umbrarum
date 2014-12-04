var fs = require('fs');

module.exports = function(ws, event) {
	fs.appendFile('enrollment.txt',
		event.name + "\n" +
		event.message + "\n" +
		"------" + "\n"
	, function(){});

	return {
		type: "registered"
	};
}