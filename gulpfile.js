var gulp = require('gulp');
var browserSync =require('browser-sync');
var karma = require('karma').server;

gulp.task('serve', function(){//
    browserSync.init({
        notify: false,
        port: 8085,
        server:{
            baseDir: ["app"],
            routes:{
                '/bower_components': 'bower_components'
            }
        }
    })
    
    gulp.watch(['app/**/*.*'])
        .on('change',browserSync.reload);
})

gulp.task('test-browser', function(done){//runs the tests with karma
    karma.start({
        configFile: __dirname+'/karma.conf.js',
        singleRun:true,
        reporters:['mocha','coverage']
    },function(){
        done();
    })
})

gulp.task('serve-coverage',['test-browser'], function(){//runs the tests on the browser
    browserSync.init({
        notify: false,
        port: 7777,
        server:{
            baseDir: ["test/coverage"]
        }
    })
    
    gulp.watch(['app/**/*.*'])
        .on('change',browserSync.reload);
})

gulp.task('serve-test', function(){//runs the tests on the browser
    browserSync.init({
        notify: false,
        port: 8081,
        server:{
            baseDir: ["test","app"],
            routes:{
                '/bower_components': 'bower_components'
            }
        }
    })
    
    gulp.watch(['app/**/*.*'])
        .on('change',browserSync.reload);
})
