var path = require('path');

var express = require('express'),
    gulp = require('gulp'),
    templateCache = require('gulp-angular-templatecache'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    liveReload = require('gulp-livereload'),
    preprocess = require('gulp-preprocess'),
    protractor = require('gulp-protractor').protractor,
    protractorQA = require('gulp-protractor-qa'),
    rename = require('gulp-rename'),
    sourceMaps = require('gulp-sourcemaps'),
    karma = require('karma').server;

var config = require('./gulp.config');
var paths = config.paths;

var buildFolder = 'src/build';


//////////
// DEV //
////////

gulp.task('default', ['dev'], function () {
});

gulp.task('dev', [
    'buildDev',
    'startDevServer',
    'watchSource',
    'protractor-qa'
], function () {
});

gulp.task('buildDev', [
    'buildJs',
    'cacheTemplates',
    'buildMockBackendData'
], function () {
});

gulp.task('buildJs', function () {
    gulp.src(paths.jsSource)
        .pipe(jshint())
        .pipe(jshint.reporter('default')) // TODO Stylish
        .pipe(sourceMaps.init())
        .pipe(concat('all-source.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(buildFolder))
        .pipe(liveReload());
});

gulp.task('cacheTemplates', function () {
    gulp.src(paths.templates)
        .pipe(templateCache({module: 'app'}))
        .pipe(gulp.dest(buildFolder))
        .pipe(liveReload());
});

gulp.task('buildMockBackendData', function () {
    gulp.src(paths.mockBackendData)
        .pipe(jshint())
        .pipe(jshint.reporter('default')) // TODO Stylish
        .pipe(concat('all-mock-backend-data.js'))
        .pipe(gulp.dest('src/build'))
        .pipe(liveReload());
    //gulp.src(paths.indexFile)
    //    .pipe(preprocess({
    //        context: {mockBackend: true}
    //    }))
    //    .pipe(rename('index-mb.html'))
    //    .pipe(gulp.dest(paths.srcFolder));
});

gulp.task('startDevServer', function () {
    var devServer = express();
    devServer.use(express.static(paths.srcFolder));
    devServer.all('/*', function (req, res) {
        res.sendFile('index.html', {root: 'src'});
    });
    devServer.listen(config.port);
});


/////////////////////
// WATCH & RELOAD //
///////////////////

gulp.task('watchSource', function () {
    liveReload.listen();
    gulp.watch(paths.jsSource, ['buildJs']);
    gulp.watch(paths.indexFile, ['reloadIndex']);
    gulp.watch(paths.templates, ['cacheTemplates']);
    gulp.watch(paths.mockBackendData, ['buildMockBackendData']);
});

gulp.task('reloadIndex', function () {
    gulp.src(paths.indexFile)
        .pipe(liveReload());
});


///////////////////
// UNIT TESTING //
/////////////////

var pathToKarmaConfigFile = path.resolve(paths.karmaConfigFile);

gulp.task('unit', function (done) {
    karma.start({
        configFile: pathToKarmaConfigFile,
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('tdd', function (done) {
    karma.start({
        configFile: pathToKarmaConfigFile
    }, done);

});


//////////////////
// E2E TESTING //
////////////////

// TODO Test production
// TODO Exit gulp task when tests have run
gulp.task('e2e', [
    'buildDev',
    'startDevServer'
], runProtractor);

function runProtractor(cb) {
    gulp.src(paths.e2eTests)
        .pipe(protractor({
            configFile: paths.protractorConfigFile,
            args: ['--baseUrl', 'http://localhost:' + config.port]
        }))
        .on('error', function (e) { // Swallow
        })
        .on('end', cb);
}

gulp.task('protractor', runProtractor);

///////////
// MISC //
/////////

gulp.task('protractor-qa', function () {
    protractorQA.init({
        testSrc: [paths.e2eTests, paths.pageObjects],
        viewSrc: [paths.indexFile, paths.templates]
    });
});