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
            '*.js',
          ],
          dest: 'dist',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'src',
          src: [
            '*.js',
          ],
          dest: 'dist',
          ext: '.js'
        }, {
          expand: true,
          cwd: './',
          src: [
            'tests/**/*.js'
          ],
          dest: 'dist',
          ext: '.js'
        }]
      }
    },
    copy: {
      dist: {
        files: [
          {expand: true, src: ['lib/**'], dest: 'dist/'},
        ],
      },
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist',
            '*.log',
            '!node_modules/**/*',
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
        'lib/**/*.js',
        'tests/**/*.js'
      ]
    },
    mochaTest: {
      all: {
        src: ['tests/**/*.js']
      }
    },
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', [
    'copy:dist',
    'babel:test',
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'babel:dist',
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
