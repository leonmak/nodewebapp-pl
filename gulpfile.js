var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function(){
  return gulp.src(jsFiles)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish',{
    verbose : true
  }))
  .pipe(jscs());
});

gulp.task('inject', function () {
  // wiredep - for bower install dependencies
  var wiredep = require('wiredep').stream;
  var options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  };

  // gulp-inject - for our own css
  var inject = require('gulp-inject');
  var injectSrc = gulp.src(['./public/css/*.css',
  './public/js/*.js'], {
    read: false
  });
  var injectOptions = {
    ignorePath: '/public'
  };

  return gulp.src('./src/views/*.html')
  .pipe(wiredep(options))
  .pipe(inject(injectSrc, injectOptions))
  .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function(){
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: jsFiles
  };

  return nodemon(options)
  .on('restart',function(err){
    console.log('RESTARTING..');
  });
});
