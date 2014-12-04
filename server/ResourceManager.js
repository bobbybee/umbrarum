var fs = require('fs');

console.log("ResourceManager loading resources. This may take a moment..")

var resources = (function(read, list) {
    var obj = {};
    list("server/rsrc/").forEach(function(uuid) {
        obj[uuid.replace('.rsrc','')] = read("server/rsrc/cr0yGHWDGA.rsrc").toString();
    });
    return obj;
})(fs.readFileSync, fs.readdirSync);

console.log("Done!");

module.exports.get = function(uuid) {
    return resources[uuid];
}
