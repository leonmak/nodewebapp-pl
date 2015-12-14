var express = require('express');
var app = express();

var port = 5000;

// static directories, url
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req,res){
  res.send('Hello Hello');
});

app.get('/books', function(req,res){
  res.send('Hello Bokos');
});

app.listen(port, function(er){
console.log('running on'+ port);
});
