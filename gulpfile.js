var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var nunjucksRender = require('gulp-nunjucks-render');
var scsslint = require('gulp-scss-lint');

var paths = {
    //sass: ['src/scss/**/*.scss','!src/scss/**/_*.scss'],
    sass: ['src/scss/**/*.scss'],
    nunjucks: ['src/templates/**/*.+(html|nunjucks)','!src/templates/**/_*.+(html|nunjucks)'],
    environment: 'public'
};



// Complile general sass Files
gulp.task('sass', function () {
    return gulp.src(paths.sass)
      .pipe(sourcemaps.init())
      //.pipe(prefix())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.environment+'/css/'));
});




 
gulp.task('lint', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(scsslint({
      'config': 'config/sass-lint.yml'
    }));
});


gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['src/templates']);

  // Gets .html and .nunjucks files in pages
  return gulp.src(paths.nunjucks)
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest(paths.environment));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass', 'nunjucks'], {watch: false});
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass', 'nunjucks']);