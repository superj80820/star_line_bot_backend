const gulp       = require('gulp');
const nodemon    = require('gulp-nodemon')
const webpack = require('webpack-stream')

// legacyWatch is for docker. If not set true. nodemon in docker will not auto.
gulp.task('start', function(){
  nodemon({script: 'src/index.js', ext: 'js hjs json', legacyWatch: true });
})
gulp.task('watch', function() { 
  gulp.watch(['./src/**/*'],
  gulp.series(
    'webpack'
    ))
})
gulp.task('webpack', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('dist'));
});
gulp.task('default', gulp.parallel('webpack', 'watch', 'start', function() {
})) 

