/// <binding BeforeBuild='css' />
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css');
var del = require('del');
var bower = require('gulp-bower');
var strip = require('gulp-strip-comments');
var sass = require('gulp-sass');

var config = {
   vendorSrc: [
      'bower_components/underscore/underscore-min.js',
        'bower_components/angular/angular.min.js',
         "bower_components/angular-animate/angular-animate.min.js",
        'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
    ],

    cssSrc: [
       'bower_components/ionicons/css/ionicons.min.css',
        'bower_components/angular-toastr/dist/angular-toastr.min.css',
         'app/assets/css/*.css'
    ],


    iconfonts: 'bower_components/ionicons/fonts/*.*',

    fontsout: 'app/assets/fonts',
    cssout: 'app/assets/css'

}

//Create a bundled file
gulp.task('vendor-bundle', ['bower-restore'], function () {
    return gulp.src(config.vendorSrc)
     .pipe(concat('vendor-bundle.min.js'))
     .pipe(gulp.dest('app/assets/vendor'));
});


gulp.task('clean-scripts', ['vendor-bundle'], function () {
    del(['app/assets/vendor/vendor-bundle.min.js']);
});


// Combine and the vendor files from bower into bundles (output to the Scripts folder)
gulp.task('scripts', ['clean-scripts'], function () {

});

gulp.task('clean-css',  function () {
    del(['app/assets/css/*.css']);
});

gulp.task('sass', ['clean-css'], function () {
    gulp.src('./app/assets/sass/*.scss')
      .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
      .pipe(gulp.dest(config.cssout));
});

gulp.task('sass:watch', function () {
    gulp.watch('app/assets/sass/*.scss', ['css']);
});

gulp.task('css', ['bower-restore', 'sass'], function () {
    return gulp.src(config.cssSrc)
     .pipe(concat('app.min.css'))
     .pipe(minifyCSS({ 'keepSpecialComments': 0 }))
     .pipe(gulp.dest(config.cssout));
});

gulp.task('fonts', ['bower-restore'], function () {
    gulp.src(config.iconfonts)
        .pipe(gulp.dest(config.fontsout));
});

// Combine and minify css files and output fonts
gulp.task('styles', ['css', 'fonts'], function () {

});

//Restore all bower packages
gulp.task('bower-restore', function () {
    return bower();
});

//Set a default tasks
gulp.task('default', ['scripts', 'styles'], function () {

});