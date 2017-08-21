/**
 * Node Express Socket.io
 * Image
 * Private
 * Memory Database
 */

var express = require('express');
var app = express();

var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('uuid');

// file upload
var multer  = require('multer')
var upload = multer({ dest: './htdocs/static/uploads/' })

// messages in a list
var messages = [];
for (var i = 0; i < 5; i++) {
    messages[i] = []
}

// chat list
var channels = [];
for (var i = 0; i < 5; i++) {
    channels.push({
        'id' : i,
        'name' : 'channel' + i,
        'private': false,
        'users' : []
    });
}

// login users
var users = {};

// static folder
app.use(express.static(path.join(__dirname, '../htdocs')))

// index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../htdocs/index.html'));
})

// list all channels
app.get('/channels', function (req, res) {
    data = []
    var email = req.query.email;

    for (var i = 0; i < channels.length; i++) {
        if (channels[i].private == false) {
            data.push(channels[i])
        } else {
            if (channels[i].users[0] == email || channels[i].users[1] == email) {
                // channel display name
                channels[i].name = channels[i].users[0] == email ? channels[i].users[1] : channels[i].users[0]
                data.push(channels[i])                
            }
        }

    }
    res.json(data);
})


// list all messages from a channel
app.get('/messages', function (req, res) {
    var channel = req.query.id;
    res.json(messages[channel]);
})

// image upload
app.post('/upload', upload.single('image'), function (req, res, next) {
    var url = '/static/uploads/' + req.file.filename;
    res.json(url);
})

// socket io
io.on('connection', function (socket) {

    socket.on('login', function(email) { 
        users[email] = socket;
    })

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
            email: obj.email,
            img : obj.url,
            ts : new Date().toUTCString()
        }

        messages[channel].push(msg);

        io.sockets.in(channel).emit('message', msg);
    })

    // create private message chennel
    socket.on('private', function(obj) {

        var from = obj.from;
        var to = obj.to;

        
        // only one private channel between 2 users
        var found = false;
        for (var i = 0; i < channels.length; i++) {
            var element = channels[i];
            if (element['users'].indexOf(from) != -1 && element['users'].indexOf(to) != -1 ) {
                found = true;
            }
        }

        if ( !found ) {
            messages[channels.length] = []
            
            var privateChannel = {
                'id' : channels.length,
                'name' : 'PM',
                'private': true,
                'users' : [from, to]
            }
    
            channels.push(privateChannel);
    
            users[from].emit('private');
            users[to].emit('private');
        }

    })

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});