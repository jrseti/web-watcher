const PORT = 3001;

var fs = require('fs');
var socketio = require('socket.io');
var app = require('http').createServer().listen(PORT);
var io = socketio.listen(app);

var connected = false;

console.log("Started");

// Add your own directories to watch...

var watcher_www = fs.watch("/home/sonata/www");
watcher_www.on('change', function name(event, filename) {
    if(filename.includes(".swp")) return;
    if(filename.includes(".swx")) return;
    console.log(event);
    console.log(filename);
    emitMessage("changed");
});

var watcher_css = fs.watch("/home/sonata/www/css");
watcher_css.on('change', function name(event, filename) {
    if(filename.includes(".swp")) return;
    if(filename.includes(".swx")) return;
    console.log(event);
    console.log(filename);
    emitMessage("changed");
});

var watcher_js = fs.watch("/home/sonata/www/js");
watcher_js.on('change', function name(event, filename) {
    if(filename.includes(".swp")) return;
    if(filename.includes(".swx")) return;
    console.log(event);
    console.log(filename);
    emitMessage("changed");
});

io.on('connection', function(socketconnection) {

    connected = true;

    console.log("Connected to browser");

    socketconnection.on('disconnect', function() {
        connected = false;
        console.log("Disonnected to browser");
    });
});

function emitMessage(message) {
    if(connected == true) {
        io.emit('message', message);
        console.log("File changed, message sent to browser");
    }
    else {
        console.log("File changed, but no browser connected");
    }

}

console.log("Listening for connections of port " + PORT + " ...");
