/*global module:false*/
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-include-replace');

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'src/sickle.js']
        },
        qunit: {
            all: ['test/qunit.html']
        },
        uglify: {
            main: {
                files: {
                    'dist/sickle.min.js': ['src/sickle.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {src: 'src/sickle.js', dest: 'dist/', expand: true, flatten: true}
                ]
            },
            tpl: {
                files: [
                    {src: 'test/tpl/*.html', dest: 'test/', expand: true, flatten: true}
                ]
            }
        },
        includereplace: {
            main: {
                files: [
                    {src: 'tpl/qunit.html', dest: 'test/'},
                    {src: 'tpl/speed.html', dest: 'test/'}
                ]
            }
        },
        clean: {
            tpl: 'test/tpl'
        }
    });

    grunt.registerTask('test', ['templates', 'jshint', 'qunit']);
    grunt.registerTask('default', ['test', 'publish']);
    grunt.registerTask('publish', ['uglify', 'copy:dist']);
    grunt.registerTask('templates', ['includereplace', 'copy:tpl', 'clean:tpl']);
};