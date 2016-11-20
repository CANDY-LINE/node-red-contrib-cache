'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  var config = {

    babel: {
      options: {
        plugins: ['uglify:after'],
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: [
            '*.es6.js',
          ],
          dest: 'lib',
          ext: '.js'
        }, {
          expand: true,
          cwd: './',
          src: [
            'tests/**/*.es6.js'
          ],
          dest: './',
          ext: '.js'
        }]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'tests/**/*.map',
            'tests/**/*.js',
            'lib/**/*.map',
            'lib/**/*.js',
            '!**/*.es6.js',
            'lib/**/*.es6.js',
            '*.log',
            '!node_modules/**/*',
            '!Gruntfile.js',
            './*.tgz',
          ]
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: __dirname + '/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'lib/**/*.es6.js',
        'tests/**/*.es6.js'
      ]
    },
    mochaTest: {
      all: {
        src: ['tests/**/*.js', '!tests/**/*.es6.js']
      }
    },
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', [
    'babel',
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'babel',
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
