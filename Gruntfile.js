/*global module:false*/
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/* <%= pkg.name %> v<%= pkg.version %> */\n'
        },
        jshint: {
            all: ['Gruntfile.js', 'src/sickle.js']
        },
        qunit: {
            all: ['test/qunit.html']
        },
        uglify: {
            main: {
				options: {
					sourceMap: true,
					sourceMapName: 'dist/sickle.min.map',
					beautify: {
						'ascii_only': true
					}
				},
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
            tpl: 'test/tpl/**',
            dist: 'dist/**'
        },
        usebanner: {
            dist: {
                options: {
                    banner: '<%= meta.banner %>',
                    linebreak: false
                },
                files: {
                    src: ['dist/*.js']
                }
            }
        },
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: 'version',
							replacement: '<%= pkg.version %>'
						}
					]
				},
				files: [
					{src: 'dist/sickle.js', dest: 'dist/', expand: true, flatten: true},
					{src: 'dist/sickle.min.js', dest: 'dist/', expand: true, flatten: true}
				]
			}
		}
    });

    grunt.registerTask('test', ['templates', 'jshint', 'qunit']);
    grunt.registerTask('default', ['test', 'publish']);
    grunt.registerTask('publish', ['uglify', 'copy:dist', 'usebanner:dist', 'replace:dist', 'syncversion']);
    grunt.registerTask('templates', ['includereplace', 'copy:tpl', 'clean:tpl']);

	grunt.registerTask('syncversion', 'Sync package.json and bower.json version property', function () {
		var pkg = grunt.file.readJSON('package.json'),
			bower = grunt.file.readJSON('bower.json');

		bower.version = pkg.version;

		grunt.file.write('./bower.json', JSON.stringify(bower, null, 2));
	});
};