var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	gls = require('gulp-live-server');

gulp.task('lint', function() {
	return gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
	gulp.src(['src/angular-metro.module.js', 'src/directives/*.js'])
		.pipe(concat('angular-metro.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(gulp.dest('./demo/assets/js'))
		.pipe(rename('angular-metro.min.js'))
		.pipe(sourcemaps.init())
		.pipe(uglify({}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist'))
		.pipe(gulp.dest('./demo/assets/js'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['lint', 'build']);
});

gulp.task('serve', function() {
	var server = gls.static('demo');
	server.start();

	gulp.watch(['demo/**/*.*'], function(file) {
		server.notify.apply(server, [file]);
	});
});

gulp.task('assets', function() {
	gulp.src([
			'bower_components/metro/build/css/metro.min.css',
			'bower_components/metro/build/css/metro-icons.min.css',
			'bower_components/google-code-prettify/bin/prettify.min.css'
		])
		.pipe(gulp.dest('./demo/assets/css'));

	gulp.src([
			'bower_components/metro/build/js/metro.min.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-route/angular-route.min.js',
			'bower_components/google-code-prettify/bin/prettify.min.js'
		])
		.pipe(gulp.dest('./demo/assets/js'));
});

gulp.task('default', ['lint', 'build', 'assets', 'serve']);
gulp.task('dev', ['default', 'watch']);
