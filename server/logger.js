var log = function(msg, raw) {
	var date = new Date().toString().replace(/ GMT.*/gi, ""),
		_msg = "["+date+"] " + msg;

	if (raw) return _msg;
	else console.log(_msg);
};

var logError = function(err) {
	console.error(log(err, true));
};

module.exports = log;
module.exports.error = logError;