const gulp = require('gulp');
const terser = require('gulp-terser');

// compile js
gulp.task('js', function (done) {
    gulp.src('src/index.js')
        .pipe(terser())
        .pipe(gulp.dest('./dist'));

    done();
});

//watch
gulp.task('dev', gulp.series(['js'], function dev(done) {
    gulp.watch(['src/index.js'], gulp.series(['js']));
    done();
}));

// build
gulp.task('build', gulp.series(['js'], function (done) {
    done();
}));

gulp.task('default', gulp.series(['dev']));