var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');

var paths = {
    sass: ['src/scss/**/*.scss','!src/scss/**/_*.scss'],
    environment: 'public'
};


gulp.task('default', function () {
    sass('src/app.scss', {sourcemap: true, style: 'compact'})
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});


// Complile general sass Files
gulp.task('sass', function () {
    return gulp.src(paths.sass)
      .pipe(sourcemaps.init())
      .pipe(prefix())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.environment+'/css/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass']);