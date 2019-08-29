const gulp = require('gulp');
const path = require('path');

gulp
  .src(path.resolve(__dirname, '../release/web/**/**'))
  .pipe(gulp.dest(path.resolve(__dirname, '../../../mscode/node_modules/scratch')))
  .pipe(gulp.dest(path.resolve(__dirname, '../../../mscodemobile/node_modules/scratch')));

gulp
  .src(path.resolve(__dirname, '../release/electron/**/**'))
  .pipe(gulp.dest(path.resolve(__dirname, '../../../mscode-electron/node_modules/scratch')));
