var fs = require('fs');

console.log("ResourceManager loading resources. This may take a moment..")

var resources = {
	'cr0yGHWDGA': fs.readFileSync("rsrc/cr0yGHWDGA.rsrc").toString()
};

console.log("Done!");

module.exports.get = function(uuid) {
	return resources[uuid];
}