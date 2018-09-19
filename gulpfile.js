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
            'js/theme.js'
        ],
        dest: 'dist/js',
        concatName: 'app.js'
    },
    htmlFiles: {
        source: '*.html',
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
        //.pipe(browserSync.stream())
        .on('finish', function() {
            console.log("compress jsFiles files OK !!!");
        });
});

// task js plugins compression
gulp.task('compress:js-plugins', function() {
    return gulp.src(config.pluginsJsFiles.source)
        .pipe(sourcemaps.init())
        //.pipe(uglify())
        //.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(concat(config.pluginsJsFiles.concatName))
        .pipe(sourcemaps.write('.'))
        .pipe(clean({ force: true }))
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
        // .pipe(browserSync.stream())
        .on('finish', function() {
            console.log("compress cssFiles files OK !!!");
        });
});

// task css plugins compression
gulp.task('compress:css-plugins', function() {
    return gulp.src(config.pluginsCssFiles.source)
        .pipe(stripCssComments())
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            relativeTo: config.pluginsCssFiles.dest,
            target: config.pluginsCssFiles.dest,
        }))
        .pipe(concat(config.pluginsCssFiles.concatName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.pluginsCssFiles.dest))
        .on('finish', function() {
            console.log("compress plugins css files OK !!!");
        });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        injectChanges: true,
        //proxy: 'http://gulpwebsite.dev',
        server: {
            baseDir: './'
        }
    })
});

//gulp task app
gulp.task('build', ['compress:css', 'compress:js']);

gulp.task('watch', ['build', 'browser-sync'], function() {
    gulp.watch(config.cssFiles.source, ['compress:css']).on('change', reload);
    gulp.watch(config.jsFiles.source, ['compress:js']).on('change', reload);
});