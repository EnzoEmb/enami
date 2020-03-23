const gulp = require('gulp');
const terser = require('gulp-terser');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

// compile js
gulp.task('js', function (done) {
    gulp.src('src/index.js')
        .pipe(plumber())
        .pipe(terser())
        .pipe(gulp.dest('./dist'));

    done();
});

// compile sass
gulp.task('sass', function (done) {
    gulp.src('src/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/'));

    done();
});

//watch
gulp.task('dev', gulp.series(['js', 'sass'], function dev(done) {
    gulp.watch(['src/index.js'], gulp.series(['js']));
    gulp.watch(['src/*.scss'], gulp.series(['sass']));
    done();
}));

// build
gulp.task('build', gulp.series(['js', 'sass'], function (done) {
    done();
}));

gulp.task('default', gulp.series(['dev']));