var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
 
gulp.task('browserify', function() {
	var bundler = browserify({
		entries: ['./src/index.js'], // Only need initial file, browserify finds the deps
		debug: true, // Gives us sourcemapping
		cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
	});
	var watcher  = watchify(bundler);

	return watcher
	.on('update', function () { // When any files update
		var updateStart = Date.now();
		console.log('Updating!');
		watcher.bundle() // Create new bundle that uses the cache for high performance
		.pipe(source('index.js'))
	// This is where you add uglifying etc.
		.pipe(gulp.dest('./'));
		console.log('Updated!', (Date.now() - updateStart) + 'ms');
	})
	.bundle() // Create the initial bundle when starting the task
	.pipe(source('index.js'))
	.pipe(gulp.dest('./'));
});

// I added this so that you see how to run two watch tasks
// gulp.task('css', function () {
// 	gulp.watch('styles/**/*.css', function () {
// 		return gulp.src('styles/**/*.css')
// 		.pipe(gulp.dest('build/'));
// 	});
// });

// Just running the two tasks
gulp.task('default', ['browserify']);