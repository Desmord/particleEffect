const gulp = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');

const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const streamify = require('gulp-streamify');




//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------


gulp.task('cleanJS', () => {
    return del('main.js');
});

gulp.task('updateJS', () => {
    console.log(`Uaktualnianie plików react i js.`);

    return browserify([/*'dev/js/DataClass.js'*/,'devMainFunction.js'])  // Pobieranie plików
        .transform(babelify, {presets: ["es2015"]})
        .bundle()
        .pipe(source('devMainFunction.js'))
        // .pipe(gulp.dest('build'))
        .pipe(rename('main.js'))
        .pipe(streamify(concat('main.js')))
        .pipe(streamify(uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'));
});

gulp.task('watchJs', () => {
    
        console.log('Uruchamianie obserwowania plików Js.');
    
        gulp.watch('devMainFunction.js', ['updateJS', browserSync.reload]);
    
    });



//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

gulp.task('serwer', () => {

	console.log('Uruchamianie automatycznego odswieżania plików.');

	browserSync.init({
        // proxy: "localhost:8000"
		server: './'
	});

});


gulp.task('build', () => {
	runSequence('cleanJS','updateJS','watchJs','serwer');
});