var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	browserify = require('gulp-browserify');

var env = process.env.NODE_ENV || 'development';

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = [
	'components/scripts/*.js'
];
var sassSources = ['components/sass/style.scss']
var htmlSources = ['builds/development/*.html']

gulp.task('coffee',function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare:true})
			.on('error',gutil.log))
		.pipe(gulp.dest('components/scripts'))
});

gulp.task('js',function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
});

gulp.task('compass',function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass:'components/sass',
			image:'builds.development/images',
			style:'expanded'
		}))
		.on('error',gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())

});

gulp.task('watch',function(){
	gulp.watch(coffeeSources,['coffee']);
	gulp.watch(jsSources,['js']);
	gulp.watch('components/sass/*.scss',['compass']),
	gulp.watch(htmlSources,['html']);
})

gulp.task('connect',function(){
	connect.server({
		root:'builds/development/',
		livereload:true
	})
})

gulp.task('html',function(){
	gulp.src(htmlSources)
	.pipe(connect.reload())
})

gulp.task('default',['html','coffee','js','compass','connect','watch']);