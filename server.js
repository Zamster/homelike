var express = require('express');
var app = express();
var path = require('path');

// static folder
app.use(express.static(path.join(__dirname, '/htdocs')))

// index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'htdocs/index.html'));
})

app.listen(5000, function() {
    console.log('Example app listening on port 5000')
})