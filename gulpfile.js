const { src, dest, symlink, parallel, watch } = require('gulp');
const del = require('del');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Browser Sync
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("*.html").on('change', browserSync.reload);
}

// Sass (scss -> css)
function sass(){
    return src('./sass/import.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());
}

// Watch Sass
function watcher(done){
    //watch('./sass/*.scss', sass)
    watch('./sass/', sass)
    done();
}

// Src + Dest
function srcExemple() {
    return src('./img/*.png')
        //return src('./index.html')
        .pipe(dest('./img-v2'))
}

// Clean
function clean() {
    return del('./img/')
}

// LinkExemple
function linkExemple() {
    return src('./index.html')
        .pipe(symlink('dossier1'));
}

// Tâche 1
// function css(log){
//     console.log('Tâche 1, exemple de compilation')
//     log();
// }

// Tâche 2
// function sass(log){
//     console.log('Tâche 2, exemple de minification')
//     log();
// }

// Export des function()
module.exports = {
    srcExemple,
    clean,
    linkExemple,
    sass,
    watcher,
    browser: parallel(browser, watcher)
    //build: parallel(css, sass)
}