const gulp = require('gulp');
const terser = require('gulp-terser');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

// compile js
gulp.task('js', function (done) {
    gulp.src('src/index.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())

        .pipe(rename('enami.min.js'))
        .pipe(gulp.dest('./dist/'));

    gulp.src('src/index.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename('enami.js'))
        .pipe(gulp.dest('./dist/'));

    done();
});

// compile sass
gulp.task('sass', function (done) {

    gulp.src('src/index.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('enami.min.css'))
        .pipe(autoprefix())
        .pipe(gulp.dest('./dist/'));

    gulp.src('src/index.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(rename('enami.css'))
        .pipe(gulp.dest('./dist/'));

    gulp.src('test/test.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(gulp.dest('./test/'));

    done();
});

//watch
gulp.task('dev', gulp.series(['js', 'sass'], function dev(done) {
    gulp.watch(['src/index.js'], gulp.series(['js']));
    gulp.watch(['src/*.scss', 'test/*.scss'], gulp.series(['sass']));
    done();
}));

// build
gulp.task('build', gulp.series(['js', 'sass'], function (done) {
    done();
}));

gulp.task('default', gulp.series(['dev']));