/*global module:false*/
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-testem');

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'src/sickle.js']
        },
        testem: {
            test_page: 'test/qunit.html'
        },
        uglify: {
            my_target: {
                files: {
                    'dist/sickle.min.js': ['src/sickle.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {src: 'src/sickle.js', dest: 'dist/', expand: true, flatten: true}
                ]
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'testem']);
    grunt.registerTask('publish', ['uglify', 'copy']);
};