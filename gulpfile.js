var gulp = require('gulp')
var coffee = require('gulp-coffee')
var jade = require('gulp-jade')
var styl = require('gulp-stylus')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var watch = require('gulp-watch')
var connect = require('gulp-connect')
var pkg = require('./package.json')
var lib = require('bower-files')(pkg)
var rupture = require('rupture')


var paths = {
  coffee: [
    './src/javascripts/**/*.coffee',
    './src/javascripts/*.coffee'
  ],
  styl: ['./src/stylesheets/app.styl','./src/stylesheets/**/*.styl'],
  jade: ['./src/templates/*.jade']
}


gulp.task('default', ['vendor', 'source', 'watch']);

gulp.task('source', ['styl','jade', 'coffee'])
gulp.task('vendor', [
  'vendor.styles', 'vendor.scripts',
  'vendor.images'
]);




gulp.task('vendor.scripts', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.js', {newLine: ';\n'}))
    .pipe(gulp.dest('./public/javascripts'))
});

gulp.task('vendor.styles', function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('vendor.images', function() {
  return gulp.src(lib.ext(['jpg', 'png', 'gif']).files)
    .pipe(gulp.dest('./public/images'))
});

gulp.task('styl', function(done) {
  options = {
    use: [ rupture()]
  }
  gulp.src('./src/stylesheets/app.styl')
    .pipe(plumber())
    .pipe(styl(options))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./public/stylesheets/'))
    .pipe(connect.reload())
    .on('end', done);
})

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee)
    .pipe(plumber())
    .pipe(coffee({bare:true}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/javascripts/'))
    .pipe(connect.reload())
    .on('end', done);
})

gulp.task('jade', function(done) {
  gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(rename({dirname:''}))
    .pipe(jade({
      pretty: true
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./public/templates'))
    .on('end', done);
})

gulp.task('watch', function(done) {
  watch(paths.coffee, function() {
    gulp.start('coffee')
  })
  watch(paths.jade, function() {
    gulp.start('jade')
  })
  watch('./src/index.jade', function() {
    gulp.start('index')
  })
  watch(paths.styl, function() {
    gulp.start('styl')
  })
})
