var zmq = require('zmq');
var sock = zmq.socket('req');
var prompt = require('prompt');

var port = process.argv[2]

sock.connect('tcp://127.0.0.1:' + port);

console.log("connected.")

sock.on('message', function() {
    var parts = Array.prototype.slice.call(arguments);
    parts.forEach(function(part) {
        var res = part.toString();
        try {
            res = JSON.stringify(JSON.parse(res), null, '\t');
        } catch (e) {}
        console.log(res);
    });
    getcmds()
});

prompt.start();
getcmds()

function getcmds() {
    prompt.get(['cmd'], function(err, result) {
        var cmd = result.cmd.split(" ");
        sock.send(cmd);
    });
}
