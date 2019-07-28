const gulp = require("gulp");
const ts = require("gulp-typescript");

let project = ts.createProject("tsconfig.json");

// transpile Ts to ES5 / CommonJS
gulp.task("build", function() {
  return project
    .src()
    .pipe(project())
    .js.pipe(gulp.dest("build"));
});

gulp.task("protos", function() {
  return gulp
    .src("../protos/**/*.proto", { base: "../protos/" })
    .pipe(gulp.dest("build"));
});

gulp.task("default", gulp.series("build", "protos"));
