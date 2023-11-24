const {src, dest, watch, parallel, series} = require('gulp');

//минимизация и конвертация scss файлов
const scss         = require('gulp-sass')(require('sass'));
//объединение и перенаименование css файлов
const concat       = require('gulp-concat');
//отслеивание изменений в css и html файлах
const browserSync  = require('browser-sync').create();
//минимизация файлов
const uglify       = require('gulp-uglify-es').default;
//Префиксы для лучшей совместимости со старыми браузерами
const autoprefixer = require('gulp-autoprefixer');
//сжатие картинок
const imagemin     = require('gulp-imagemin');
//удалениe папки dist
const del          = require('del');

//Автоматическое отслеживание изменений в файлах html, js
function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'app/'
    }
  });
}

//Команда для удаления папки dist
function cleanDist() {
  return del('dist')
}

//Команда для сжатия картинок
function images() {
  return src('app/images/**/*')
  .pipe(imagemin(
    [
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]
  ))
  .pipe(dest('dist/images'))
}

//минимизация и объединение js файлов
function scripts() {
  //return src([
    //пример подключения сторонней библиотеки
    //'node_modules/jquery/dist/jquery.js',
    //'app/js/main.js'
    //])
    return src('app/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

//Конвертация scss в css и минимизация полученного файла
function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html',
  ], {base: 'app'})
  .pipe(dest('dist'))
}

//Автоматическое отслеживание изменений в проекте 
function watching() {
  watch(['app/scss/**/*.scss'], styles);
  //Отключение слежения "!"
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change',  browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

//Пос-ть команд при сборке
exports.build = series(cleanDist, images, build); 
exports.default = parallel(styles, scripts, browsersync, watching);
