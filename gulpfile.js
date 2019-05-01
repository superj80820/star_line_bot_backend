var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');

// legacyWatch is for docker. If not set true. nodemon in docker will not auto.
gulp.task('develop', function () {
  nodemon({script: './bin/www', ext: 'js hjs json', legacyWatch: true });
});

//gulp.task('default', ['develop']);
