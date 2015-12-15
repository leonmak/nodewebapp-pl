npm init

touch app.js
```js
^4.xx.x     // won't be 5.xx.x
~4.12.x     // won't be 4.13.x
```
package.json
```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node app.js"
},
// so you can do $ npm start
```
```js
// app.js
var express = require('express');
var app = express();

var port = 5000;

//  for static directories,
//  check these url first
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req,res){
  res.send('Hello Hello');
});

app.get('/books', function(req,res){
  res.send('Hello Bokos');
});

app.listen(port, function(er){
console.log("running on 5000");
});
```
### bower
```
npm bower install -g
bower init
bower install --save bootstrap
```
make bower install into public/lib directory
```
// create new file .bowerrc in root
{
  "directory" : "public/lib"
}
```

### gulp for dev dependencies
dev - local only, once production won't use gulp
```js
// create gulpfile.js in root
var gulp = require('gulp');
var jscs = require('gulp-jscs');      // coding style
var jshint = require('gulp-jshint');  // coding standard
var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function(){        // can do $ gulp style
  return gulp.src(jsFiles) //return so can chain
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish',{
    verbose : true
  }))
  .pipe(jscs());
});
```
```sh
npm install gulp gulp-jshint gulp-jscs jshint-stylish gulp-inject --save-dev
gulp style
```

### wire-dep
links bower dependencies and injects reference into html
```js
gulp.task('inject', function () {
// wiredep - for bower install dependencies
    var wiredep = require('wiredep').stream; // from docs
    var options = {
        bowerJson: require('./bower.json'),  // looks at all bower dep
        directory: './public/lib',           
        ignorePath: '../../public'           // when output is from /
    }

// gulp-inject - for our own css    
    var inject = require('gulp-inject');    
    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {
        read: false // just get name, don't read file
    });
    var injectOptions = {
        ignorePath: '/public'
    };

    return gulp.src('./src/views/*.html') // pull in all html files
        .pipe(wiredep(options))           // wiredep options
        // .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
})
```
```sh
bower install --save-dev wiredep
gulp inject
```
```html
<!-- bower:css -->
/* reference gets injected here */
<!-- endbower -->
<!-- bower:js -->
<!-- endbower -->
```
/bower.json, cos in lib's bower.json
"main": [
  "less/font-awesome.less",
  "scss/font-awesome.scss"
],
```json
,
  "overrides": {
      "bootstrap": {
          "main": [
              "dist/js/bootstrap.js",
              "dist/css/bootstrap.css",
              "less/bootstrap.less"
          ]
      },
      "font-awesome": {
          "main": [
              "less/font-awesome.less",
              "css/font-awesome.css",
              "scss/font-awesome.scss"
          ]
      }
  }
```

### gulp serve
```js
// does gulp serve and gulp inject concurrently first
gulp.task('serve', ['style', 'inject'], function(){
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 5000
    },
    watch: jsFiles
  };

// then restart passing options to nodemon
  return nodemon(options)
  .on('restart',function(err){
    console.log('RESTARTING..');
  });
});
```

## Using jade
<!-- sudo npm install --save jade -->
```js
app.use(express.static('public'));
// app.use(express.static('src/views'));
app.set('views','./src/views');
app.set('view engine', 'jade');
app.get('/', function(req,res){
  // res.send('Hello Hello');
  res.render('index');
});
// create src/views/index.jade file
```
Jade works as javascript
```js
html
    head
        //- bower:css
        //- endbower

        //- inject:js        
        //- endinject
        title MyApp
    body(class='myClass')
        h1(id='MyId') My App
        h3 sub heading
        ul  
            each val in list
                li= val
```
```js
//  app.js can pass in data
res.render('index', {list:['a','b']});

// gulpfile.js change src to jade ext
 return gulp.src('./src/views/*.jade')
```

## Using Handlebars
```js
// app.js
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname:'.hbs'}));
app.set('view engine','.hbs');
```

## Using ejs
```js
app.set('views','./src/views');
app.set('view engine', 'ejs');
```
```html
<% for(var i=0; i<nav.length; i++){%>
// no equals = no evaluation
<li><a href="<%=nav[i].link%>"><%=nav[i].text%></a></li>
// <%= i %> evaluates i
<%}%>
```

# Routing
```js
// app.js
var bookRouter = require('./src/routes/bookRoutes');
app.use('/Books', bookRouter);
```
```js
// bookRoutes.js
var express = require('express');
var bookRouter = express.Router();
...
bookRouter.route('/')
  .get(function(req,res){
    res.render('books', {
      title : 'DA TITLE',
      nav : [{
        link:'/books',text:'books'
      },{
        link:'/authors',text:'authors'
      }],
      books : books
    });
  });
...
module.exports = bookRouter;
```
