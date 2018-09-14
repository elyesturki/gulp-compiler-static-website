var gulp = require('gulp');
var uglify = require('gulp-uglify');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
connect = require("gulp-connect")
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
var browserSync = require('browser-sync').create();

var config = {
    cssFiles: {
        source: 'css/**/*.css',
        dest: 'dist/css',
        concatName: 'app.min.css'
    },
    jsFiles: {
        source: 'js/**/*.js',
        dest: 'dist/js',
        concatName: 'app.js'
    },
    htmlFiles: {
        source: '*.html',
        dest: 'dist/',
    },
    pluginsCssFiles: {
        source: 'css/**/*.css',
        dest: 'dist/css',
        concatName: 'plugins.css'
    },
    pluginsJsFiles: {
        source: 'js/**/*.js',
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
        .on('finish', function() {
            console.log("compress jsFiles files OK !!!");
        });
});

// task js plugins compression
gulp.task('compress:js-plugins', function() {
    return gulp.src(config.pluginsJsFiles.source)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(config.pluginsJsFiles.concatName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.pluginsJsFiles.dest))
        .on('finish', function() {
            console.log("compress pluginsJsFiles files OK !!!");
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
        .on('finish', function() {
            console.log("compress cssFiles files OK !!!");
        });
});