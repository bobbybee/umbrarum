module.exports = function(ws, event) {
	console.info("ENROLLMENT REQUEST");
	console.info("NAME: "+event.name);
	console.info("ADDITIONAL INFO: "+event.message);
}