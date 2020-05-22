const {src, dest, watch, parallel} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function js(done) {
  src('src/js/app.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest('dist/js'))
  done();
}

function css(done) {
  src('src/css/style.css')
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
  done();
}

function html(done) {
  src('src/index.html')
    .pipe(dest('dist'))
  done();
}

function watching() {
  watch("src/css/*.css", css);
  watch('src/js/*.js', js);
  watch('src/index.html',html);
}

exports.default = parallel(js, css, html, watching); 