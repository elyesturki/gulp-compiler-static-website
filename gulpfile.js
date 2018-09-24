var gulp = require('gulp');
var uglify = require('gulp-uglify');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require("browserify");
var babelify = require('babelify');
var del = require('del');
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var stripCssComments = require('gulp-strip-css-comments');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var config = {
    src: './dist',
    cssFiles: {
        //source: 'css/**/*.css',
        source: [
            'css/font-awesome.min.css',
            'css/bootstrap.min.css',
            'css/style.css',
            'css/responsive.css',
        ],
        dest: 'dist/css',
        concatName: 'app.min.css'
    },
    jsFiles: {
        //source: 'js/**/*.js',
        source: [
            'js/jquery-3.2.1.min.js',
            'js/popper.min.js',
            'js/bootstrap.min.js',
            'js/theme.js',
            'js/contact.js'
        ],
        dest: 'dist/js',
        concatName: 'app.js'
    },
    imgFiles: {
        source: './img',
        dest: 'dist/img',
    },
    htmlFiles: {
        source: './*.html',
        dest: 'dist/',
    },
    pluginsCssFiles: {
        source: 'plugins/**/*.css',
        dest: 'dist/css',
        concatName: 'plugins.css'
    },
    pluginsJsFiles: {
        source: 'plugins/**/*.js',
        dest: 'dist/js',
        concatName: 'plugins.js'
    },
};

//gulp default test
gulp.task('default', defaultTask);

function defaultTask(done) {
    console.log("default fonctionne bien !!!");
    done();
}

// task js compression
gulp.task('compress:js', function() {
    return gulp.src(config.jsFiles.source)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(config.jsFiles.concatName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.jsFiles.dest))
        .pipe(browserSync.stream())
        .on('finish', function() {
            console.log("compress jsFiles files OK !!!");
        });
});

// task css compression
gulp.task('compress:css', function() {
    return gulp.src(config.cssFiles.source)
        .pipe(stripCssComments())
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            relativeTo: config.cssFiles.dest,
            target: config.cssFiles.dest,
        }))
        .pipe(concat(config.cssFiles.concatName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.cssFiles.dest))
        .pipe(browserSync.stream())
        .on('finish', function() {
            console.log("compress cssFiles files OK !!!");
        });
});

gulp.task('browser-sync', function() {
    browserSync.init({
       // open: false,
        injectChanges: true,
        //proxy: 'http://gulpwebsite.dev',
        server: {
            baseDir: config.src
        }
    })
});

//task cpy images
gulp.task('imagesCopy', function() {
    return gulp.src('./img/**/*.{gif,jpg,png,svg}')
        .pipe(gulp.dest(config.imgFiles.dest))
  });

//task compress html
gulp.task("compress:html", function(event) {
    return gulp.src(config.htmlFiles.source)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.htmlFiles.dest));
});

gulp.task('cleanjs', function () {
    return gulp.src('dist/**/*.js', {read: false})
    //.pipe(clean({ force: true }))
      .pipe(clean());
  });

//gulp task app
gulp.task('build', ['compress:css', 'compress:js', 'compress:html', 'imagesCopy']);

gulp.task('watch', ['build', 'browser-sync'], function() {
    gulp.watch(config.jsFiles.source, ['compress:js',reload]);
    gulp.watch(config.cssFiles.source, ['compress:css',reload]);
    gulp.watch(config.htmlFiles.source, ['compress:html',reload]);
});