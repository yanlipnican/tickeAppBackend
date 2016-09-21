var gulp = require("gulp");
var babel = require("gulp-babel");
var nodemon = require("gulp-nodemon");
var clean = require("gulp-clean");
var mergeStream = require("merge-stream");

gulp.task("es6-node", function () {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("app/"));
});

gulp.task('clean', function () {
    var folders = ['app'];
    var tasks = folders.map(function(folder){
      return gulp.src(folder, {read: false})
        .pipe(clean());
    })
    return mergeStream(tasks);
});

gulp.task('nodemon', function () {
    nodemon({ 
      script: 'app/app.js',
        ext: 'js',
        ignore: [
            'app/',
            'node_modules/',
            'gulpfile.js'
          ],
        tasks: ['build'] 
      })
    .on('restart', function () {
      console.log('server restarted!');
    });
});

gulp.task('build', ['es6-node']);

gulp.task('devel', ['nodemon']);

gulp.task('run', function(){
	nodemon({script: 'app/app.js'});
});