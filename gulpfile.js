const gulp       = require('gulp');
const nodemon    = require('gulp-nodemon')
const spawn = require('child_process').spawn
function commandTask(cmd) {
    return cb => {
        const arr = cmd.split(' ')
        spawn(arr[0], arr.slice(1), { stdio: 'inherit' })
            .on('exit', cb)
    }
}
// legacyWatch is for docker. If not set true. nodemon in docker will not auto.
gulp.task('webpack', commandTask('webpack -w')) 

gulp.task('develop', function () {
  nodemon({script: 'dist/index.bundle.js', ext: 'js hjs json', legacyWatch: true });
  gulp.watch(['./src/*.js'], gulp.series('webpack'))
})
