var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use("/", express.static(path.join(__dirname, 'static')));

var buffer = "";
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(chunk) {
    buffer += chunk;
    var i = -1;
    while ((i = buffer.indexOf("\n")) !== -1) {
        var rawEntry = buffer.substring(0, i)
        var entry = rawEntry.split("#");
        entry = {
            time: entry[0],
            level: entry[1],
            func: entry[2],
            msg: entry[3],
            params: entry.slice(4)
        }
        io.emit('entry', entry);
        buffer = buffer.substring(i + 1)
    }
});

http.listen(3001);
