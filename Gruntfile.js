'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: 'dist',

		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'expanded'
			},
			dist: {
				files: {
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
				}
			}
		},

		autoprefixer: {
			no_dest: {
				src: '<%= app %>/css/app.css'
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'<%= dist %>/index.html': '<%= dist %>/index.html'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**', 'video/**', 'favicon.ico'],
					dest: '<%= dist %>/'
				}, {
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%= dist %>/fonts/',
					filter: 'isFile'
				} ]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},



		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= app %>/',
					open: true,
					livereload: true,
					hostname: '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.html'
				],
				exclude: [
					'modernizr',
					'picturefill'
				]
			}
		}

	});

	grunt.registerTask('compile-sass', ['sass', 'autoprefixer']);
	grunt.registerTask('bower-install', ['wiredep']);
	grunt.registerTask('validate-js', ['jshint']);

	grunt.registerTask('default', ['compile-sass', 'autoprefixer', 'bower-install', 'connect:app', 'watch']);

	grunt.registerTask('server-dist', ['connect:dist']);

	grunt.registerTask('default', ['compile-sass', 'bower-install', 'connect:app', 'watch']);
	grunt.registerTask('publish', ['compile-sass', 'autoprefixer', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};