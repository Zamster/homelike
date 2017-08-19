var express = require('express');
var app = express();
var path = require('path');

// static folder
app.use(express.static(path.join(__dirname, '../htdocs')))

// index
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../htdocs/index.html'));
})

// channels
app.get('/channels', function (req, res) {

    var channels = [];
    for (var i = 0; i < 10; i++) {
        channels.push(
            {
                'id' : i,
                'name' : 'channel' + i
            }
        );
    }

    res.json(channels);
})


// channels
app.get('/messages', function (req, res) {

    var messages = [];
    for (var i = 0; i < 10; i++) {
        messages.push(
            {
                'id' : i,
                'text' : 'asdasdasdasdasdasdasdasdasdasdasdasdasd' + i,
                'ts' : i
            }
        );
    }

    res.json(messages);
})


app.listen(5000, function () {
    console.log('Example app listening on port 5000')
})