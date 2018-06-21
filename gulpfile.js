const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

gulp.task('lintScripts', function () {
  gulp.src(['index.js', 'command-line.js'])
    .pipe(eslint());
});

gulp.task('build', function () {
  nodemon({
    script: 'index.js',
    args: ['lookUpRate'],
    env: {'NODE_ENV': 'development'},
    tasks: ['lintScripts'] })
    .on('restart', function () {
      console.log('restarted!');
    });
});
