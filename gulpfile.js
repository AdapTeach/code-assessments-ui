var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat-util'),
    jshint = require('gulp-jshint'),
    runSequence = require('run-sequence'),
    del = require('del'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    copy = require('gulp-copy'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    annotate = require('gulp-ng-annotate'),
    path = require('path'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    rev = require('gulp-rev'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    ngDocs = require('gulp-ngdocs'),
    awspublish = require('gulp-awspublish'),
    config = require('./config/build.config'),
    testConfig = require('./config/test.config'),
    deployConfig = require('./config/deploy.config');




gulp.task('default', ['dev'], function () {
});

gulp.task('dev', [
    'lint',
    'buildDev',
    'startDevServer',
    'watchSource'
], function () {
});

gulp.task('buildDev', [
    'buildJs',
    'buildStyle',
    'cacheTemplates'
], function () {
});

gulp.task('docs',function(){
    var options = {
        scripts: [config.js],
        html5Mode: true,
        startPage: '/',
        title: "Code assessments Docs",
        image: "https://startpage.com/graphics/startpage_logo_res.gif",
        imageLink: "https://startpage.com/graphics/startpage_logo_res.gif"
    };
    gulp.src(config.js)
        .pipe(ngDocs.process(options))
        .pipe(gulp.dest('./docs'));
    var docsServer = express();
    docsServer.use(express.static('docs'));
    docsServer.all('/*', function (req, res) {
        res.sendFile('index.html', {root: 'docs'});
    });
    docsServer.listen(config.port);
});

gulp.task('buildJs', function () {
    gulp.src(config.js)
        .pipe(sourcemaps.init())
        .pipe(concat(config.buildName, {process: function(src) { return (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
        .pipe(concat.header(config.header))
        .pipe(concat.footer(config.footer))
        .pipe(annotate())
        //.pipe(concat(config.buildName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build))
        .pipe(refresh(lrserver));
});

gulp.task('buildStyle', function () {
    gulp.src(config.mainScss)
        .pipe(sass())
        .pipe(gulp.dest(config.build));
    gulp.src(config.index)
        .pipe(refresh(lrserver));
});

gulp.task('cacheTemplates', function () {
    gulp.src(config.tpl)
        .pipe(templateCache({module: config.module}))
        .pipe(gulp.dest(config.build))
        .pipe(refresh(lrserver));
});

gulp.task('startDevServer', function () {
    var devServer = express();
    devServer.use(livereload({port: config.livereloadport}));
    devServer.use(express.static(config.base));
    devServer.all('/*', function (req, res) {
        res.sendFile('index.html', {root: config.base});
    });
    devServer.listen(config.port);
    lrserver.listen(config.livereloadport);
});

gulp.task('watchSource', function () {
    gulp.watch(config.js, ['buildJs', 'lint']);
    gulp.watch(config.scss, ['buildStyle']);
    gulp.watch(config.index, ['reloadIndex']);
    gulp.watch(config.tpl, ['cacheTemplates']);
});


gulp.task('reloadIndex', function () {
    gulp.src(config.index)
        .pipe(refresh(lrserver));
});

gulp.task('lint', function () {
    gulp.src(config.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////


gulp.task('prod', [
    'dist',
    'startProdServer'
], function () {
});

gulp.task('dist', function () {
        runSequence(
            'cleanDistFolder',
            'buildDev',
            'buildDist'
        );
    }
);

gulp.task('cleanDistFolder', function (cb) {
    del(config.dist, cb);
});

gulp.task('buildDist',['copyImages','copyFonts'], function () {
    gulp.src(config.index)
        .pipe(usemin({
            css: [minifyCss()],
            html: [minifyHtml({empty: true})],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('copyImages', function(){
    gulp.src(config.images)
        .pipe(copy(config.dist, {prefix: 1}));});

gulp.task('copyFonts', function(){
    gulp.src(config.fonts)
        .pipe(copy(config.dist+'/assets',{ prefix : 3 }));
});

gulp.task('startProdServer', function () {
    var server = express();
    server.use(express.static(config.dist));
    server.all('/*', function (req, res) {
        res.sendFile('index.html', {root: config.dist});
    });
    server.listen(config.port);
});

gulp.task('s3', function () {
    var publisher = awspublish.create(deployConfig);
    var headers = {
        'Cache-Control': 'max-age=5, no-transform, public' // 5 seconds cache TTL
    };
    return gulp.src('dist/**/*')
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache()) // create a cache file to speed up consecutive uploads
        .pipe(awspublish.reporter());
});