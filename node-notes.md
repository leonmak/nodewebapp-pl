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
npm install gulp gulp-jshint gulp-jscs jshint-stylish --save-dev
gulp style
```

### wire-dep
links bower dependencies and injects reference into html
```js
gulp.task('inject', function () {
    var wiredep = require('wiredep').stream; // from docs

    var options = {
        bowerJson: require('./bower.json'),  // looks at all bower dep
        directory: './public/lib',           
        ignorePath: '../../public'          // when output is from /
    }

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
