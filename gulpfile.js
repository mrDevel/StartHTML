var gulp 			  = require('gulp'),
		sass        = require('gulp-sass'),
		sourcemaps  = require('gulp-sourcemaps'),
		rigger      = require('gulp-rigger'),
		bs          = require('browser-sync'),
		watch       = require('gulp-watch'),
		concat      = require('gulp-concat'),
		uglify      = require('gulp-uglifyjs'),
		csscomb     = require('gulp-csscomb'),
		reload      = bs.reload;

var libsJs = [
	'app/libs/jquery/dist/jquery.js'
];

var path = {
	build: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	src: {
		html: 'app/*.html',
		js: 'app/js/common.js',
		sass: 'app/sass/main.sass',
		img: 'app/img/**/*.*',
		fonts: 'app/fonts/**/*.*'
	},
	watch: {
		html: 'app/**/*.html',
		js: 'app/js/**/*.js',
		sass: 'app/sass/**/*.sass',
		fonts: 'app/fonts/**/*.*'
	}
};

var serverConfig = {
	server: {
		baseDir: 'dist'
	},
	notify: false,
	// open: false,
	// tunnel: true,
	// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
};

gulp.task('html', function () {
	return gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('js', function () {
	return gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('sass', function () {
	return gulp.src(path.src.sass)
		.pipe(sass({
			outputStyle: 'compressed' // outputStyle: 'compressed' or 'expanded'
		}))
		.on('error', sass.logError)
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({
			stream: true
		}))
});

gulp.task('img', function () {
	return gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img));
})

gulp.task('fonts', function () {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function(){
	watch([path.watch.html], function(event, cb) {
			gulp.start('html');
	});
	watch([path.watch.sass], function(event, cb) {
			gulp.start('sass');
	});
	watch([path.watch.js], function(event, cb) {
			gulp.start('js');
	});
	watch([path.watch.fonts], function(event, cb) {
			gulp.start('fonts');
	});
});

gulp.task('build', [
	'html',
	'js',
	'sass',
	'img',
	'fonts'
]);

gulp.task('server', function () {
	bs(serverConfig);
});

gulp.task('default',['build', 'server', 'watch']);
