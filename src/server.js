var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('uuid');

var messages = [];
for (var i = 0; i < 10; i++) {
    messages[i] = []
}

var channels = [];
for (var i = 1; i < 10; i++) {
    channels.push(
        {
            'id' : i,
            'name' : 'channel' + i
        }
    );
}

// static folder
app.use(express.static(path.join(__dirname, '../htdocs')))

// index
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../htdocs/index.html'));
})

// channels
app.get('/channels', function (req, res) {
    res.json(channels);
})


// messages
app.get('/messages', function (req, res) {
    var channel = req.query.id;
    res.json(messages[channel]);
})

io.on('connection', function (socket) {
    socket.on('subscribe', function(channel) { 
        socket.join(channel); 
    })

    socket.on('unsubscribe', function(channel) {  
        socket.leave(channel); 
    })

    socket.on('message', function (obj) {
        var channel = obj.channel

        msg = {
            id : uuid.v1(),
            message : obj.message,
            ts : new Date().toUTCString()
        }

        messages[channel].push(msg);

        io.sockets.in(channel).emit('message', msg);
    })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});