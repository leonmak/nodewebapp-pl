
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var nav = [{
      link:'/books',text:'book'
    },{
      link:'/authors',text:'author'
    }];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

// static directories, url
app.use(express.static('public'));

// app.use auth middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

// app.use(passport.initialize());
// app.use(passport.session());
require('./src/config/passport.js')(app);

// app.use(express.static('src/views'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

// Routes
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req,res){
  res.render('index', {
    title:'LendRead',
    nav: nav
  });
});


app.listen(port, function(err){
  console.log('running on '+ port);
});
