require('./utils.js');

var processMessage = require('./process.js');

var path = require('path'),
    fs = require('fs');

var express = require('express'),
    app = express();

app.use(express.static(path.join(__dirname, "public")));

var httpServer = require('http').Server(app);
var Server = require('socket.io')(httpServer);

var cache = [];
cache.len = 5;

var origins = {},
    users = [];
Server.on('connection', function(client) {
    var ip = client.handshake.headers['x-forwarded-for'] || client.handshake.address.address,
        username;

    client.on('get old stuff', function(callback) {
        callback({
            cache: cache,
            users: users
        });
    });

    client.on('join', function(obj, callback) {
        username = obj.username;
        console.log(ip + " chose username \"" + username + "\"");
        if (!users.contains(username)) {
            users.push(username);

            origins[username] = {};
            origins[username]["ip"] = ip;
            origins[username]["time_offset"] = obj.time_offset;


            console.log(ip + " chose a good username");
            callback('good username');

            Server.emit('new user', {
                user: username
            });
        } else {
            console.log(ip + " chose a taken username");
            callback('bad username');
        }
    });
    client.on('chat message', function(obj) {
        var now = new Date(),
            time = new Date(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate(),
                now.getUTCHours(),
                now.getUTCMinutes(),
                now.getUTCSeconds()).getTime();

        // confirm that the client logged in with an ip
        if (obj.user === username && origins[username]["ip"] === ip) {

            // process the message... (markdown.toHTML with sanitization, smartypants, etc.)
            var msg = processMessage(obj.msg);

            /*var sent_time = new Date(time).getTime();
            sent_time.setHours(sent_time.getHours() + origins[username]["time_offset"]);
            sent_time = sent_time.getTime();*/

            var sender_offset = origins[username]["time_offset"];

            console.log("[CHAT] " + obj.user + ": " + obj.msg);

            var sendObj = {
                msg: msg,
                user: obj.user,
                utc_ts: time,
                sender_offset: sender_offset
            };

            Server.emit('chat message', sendObj);
            addToCache(sendObj);
        } // else the user didn't join properly
    });
    console.log(ip + " joined.");

    client.on('disconnect', function() {
        console.log(ip + " left.");
        if (username) {
            Server.emit('gone user', {
                user: username
            });
            users.remove(username);
        }
    });
});

httpServer.listen(3000, function() {
    console.log('listening');
});

function addToCache(obj) {
    for (i = 0; i < cache.len - 1; i++)
        cache[i] = cache[i + 1];

    cache[cache.len - 1] = obj;
}
