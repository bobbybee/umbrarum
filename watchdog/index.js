Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    value: function (item) {
        var removeCounter = 0;

        for (var index = 0; index < this.length; index++) {
            if (this[index] === item) {
                this.splice(index, 1);
                removeCounter++;
                index--;
            }
        }
        return removeCounter;
    }
});

var exec = require("child_process").exec
    , BinaryServer = require("binaryjs").BinaryServer;

var server = new BinaryServer({ port: 666 });

var clients = [];

server.on('connection', function(client) {
    clients.push(client);
});

server.on('close', function(client) {
    clients.remove(client);
});

exec("tail -f /home/git/.forever/6iih.log", function(err, stdout, stderr){
    clients.forEach(function(client) {
        client.send(stdout);
    });
});
