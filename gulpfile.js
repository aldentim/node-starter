const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require('gulp-htmlmin');
const browserSync = require("browser-sync").create();

//compile sass into css
function style() {
    return gulp.src("./development/sass/**/main.scss")
        .pipe(sass({ outputStyle: 'compressed' })
            .on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
}

//minify js
function js() {
    return gulp.src("./development/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./public/js"));
}

//minify html
function html() {
    return gulp.src("./development/html/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./public"));
}

//reload browser by changes
function watch() {
    browserSync.init({
        server: "./public",
        notify: false,
        open: true
    });
    gulp.watch("./development/sass/**/*.scss", style).on("change", browserSync.reload);
    gulp.watch("./development/js/**/*.js", js).on("change", browserSync.reload);
    gulp.watch("./development/html/**/*.html", html).on("change", browserSync.reload);
}

exports.watch = watch;