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
        'private': false
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

// channels
app.get('/channels', function (req, res) {
    data = []
    var email = req.query.email;

    for (var i = 0; i < channels.length; i++) {
        if (channels[i].private == false) {
            data.push(channels[i])
        } else {
            if (channels[i].users[0] == email || channels[i].users[1] == email) {
                channels[i].name = channels[i].users[0] == email ? channels[i].users[1] : channels[i].users[0]
                data.push(channels[i])                
            }
        }

    }
    res.json(data);
})


// messages
app.get('/messages', function (req, res) {
    var channel = req.query.id;
    res.json(messages[channel]);
})

app.post('/upload', upload.single('image'), function (req, res, next) {
    var url = '/static/uploads/' + req.file.filename;
    res.json(url);
})


// socket io
io.on('connection', function (socket) {

    socket.on('login', function(email) { 
        users[email] = socket;
        console.log(users);
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

    socket.on('newPrivate', function(obj) {  
        var email = obj.email1;
        var email2 = obj.email2;
    
        messages[channels.length] = []

        var privateChannel = {
            'id' : channels.length,
            'name' : 'PM',
            'private': true,
            'users' : [email, email2]
        }

        channels.push(privateChannel);

        users[email].emit('newPrivate');
        users[email2].emit('newPrivate');
    })

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});