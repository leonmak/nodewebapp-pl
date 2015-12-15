var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var nav = [{
      link:'/books',text:'book'
    },{
      link:'/authors',text:'author'
    }];

var bookRouter = require('./src/routes/bookRoutes')(nav);

// static directories, url
app.use(express.static('public'));
// app.use(express.static('src/views'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

// Routes
app.use('/Books', bookRouter);

app.get('/', function(req,res){
  res.render('index', {
    title:'DA TITLE',
    nav: nav
  });
});


app.listen(port, function(err){
  console.log('running on '+ port);
});
