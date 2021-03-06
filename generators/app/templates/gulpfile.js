const gulp = require('gulp');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');
const del = require('del');

const config = require('./webpack.config');

const dist = 'dist';

gulp.task('clean', () => del([dist]));

gulp.task('webpack', () => {
  return gulp.src(['src/**/*.js'], { base: 'src' })
  .pipe(webpack(config))
  .pipe(gulp.dest(dist));
});

gulp.task('json', () => {
  return gulp.src(['src/**/*.json'], { base: 'src' })
  .pipe(gulp.dest(dist));
});

gulp.task('xml', () => {
  return gulp.src('src/**/*.xml', { base: 'src' })
  .pipe(rename({
    extname: '.wxml',
  }))
  .pipe(gulp.dest(dist));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.{js,css}', ['webpack']);
  gulp.watch('src/**/*.json', ['json']);
  gulp.watch('src/**/*.xml', ['xml']);
});

gulp.task('build', ['webpack', 'json', 'xml']);
