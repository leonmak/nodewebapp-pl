var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bookRouter = require('./src/routes/bookRoutes');

// static directories, url
app.use(express.static('public'));
// app.use(express.static('src/views'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

// Routes
app.use('/Books', bookRouter);

app.get('/', function(req,res){
  // res.send('Hello Hello');
  res.render('index', {
    title:'DA TITLE',
    nav:[{
      link:'/books',text:'books'
    },{
      link:'/authors',text:'authors'
    }]
  });
});

app.get('/books', function(req,res){
  res.send('Hello Bokos');
});

app.listen(port, function(err){
  console.log('running on '+ port);
});
