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
var browserSync = require('browser-sync').create();


