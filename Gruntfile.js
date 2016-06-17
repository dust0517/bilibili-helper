module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle:true,
                sourceMap: false,
                sourceMapName: 'dest/srcmap.map'
            },
            release: {
                files: [{
                    expand:true,
                    cwd: 'src',
                    src: ['**/*.js','!**/*.min.js'],
                    ext: '.min.js',
                    dest: 'dest/'
                }]
            }
        },
        htmlmin: {
          main: {
            options: {
              collapseWhitespace: true,
              minifyCSS: true,
              minifyJS: true,
              removeComments: true,
            },
            files: [{
                expand:true,
                cwd: 'src',
                src: ['**/*.html'],
                dest: 'dest/'
            }]
          },
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd:'src',
                    src: ['**/**','!**/*.html','!**/*.js','**/*.min.js','_locales/**'],
                    dest: 'dest/'
              }]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'bilibili_helper.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dest/',
                    src: ['**/*'],
                    dest: '/'
                 }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['uglify:release','htmlmin:main','copy:main','compress:main']);
    grunt.registerTask('debug', ['uglify:release','copy:main']);
}
