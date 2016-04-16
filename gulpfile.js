// grab our gulp packages
var source = './source',
    html = source + '/html',
    js = source + '/js',
    scss = source + '/sass',
    fonts = source + '/fonts',
    images = source + '/images',
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyJS = require('gulp-minify'),
    minifyCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    paths = {
        'jquery': './bower_components/jquery/',
        'jqueryUI': './bower_components/jquery-ui/',
        'bootstrap': './bower_components/bootstrap-sass/assets/',
        'fontawesome': './bower_components/font-awesome/'
    };

gulp.task('serve', ['font-vendors', 'fonts', 'images', 'js', 'scss', 'html'], function () {

    browserSync.init({
        server: {
            baseDir: "./public"
        },
        notify: false
    });

    gulp.watch(scss + '/*.scss', ['scss']);
    gulp.watch(js + '/*.js', ['js']);
    gulp.watch(html + '/*.html', ['html']);
    gulp.watch(images + '/*.*', ['images']);
    gulp.watch(fonts + '/*.*', ['fonts']);

});

gulp.task('scss', function () {
    gulp.src(scss + '/app.scss')
        .pipe(sass({
            includePaths: [
                paths.bootstrap + 'stylesheets',
                paths.fontawesome + 'scss'
            ]
        }))
        .pipe(concat('app.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    gulp.src(html + '/**')
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    gulp.src(fonts + '/**')
        .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('images', function () {
    gulp.src(images + '/**')
        .pipe(gulp.dest('./public/images/'));
});

gulp.task('font-vendors', function () {
    gulp.src(paths.bootstrap + 'fonts/bootstrap/**')
        .pipe(gulp.dest('./public/fonts/bootstrap/'));
    gulp.src(paths.fontawesome + 'fonts/**')
        .pipe(gulp.dest('./public/fonts/fontawesome/'));
});

gulp.task('js', function () {
    gulp.src([
            paths.jquery + 'dist/jquery.js',
            paths.jquery + 'jquery-ui.js',
            paths.bootstrap + 'javascripts/bootstrap.js',
            js + '/*.js'
        ])
        .pipe(concat('app.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.stream());
});

// create a default task and just log a message
gulp.task('default', ['serve']);