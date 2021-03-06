module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
      },
      emberTemplates: {
        files: 'app/templates/**/*.handlebars',
        tasks: ['emberTemplates']
      },
      jshint: {
        files:  [ 'app/**/*.js', '!app/server.js', '!app/templates.js' ],
        task:   [ 'jshint' ]
      },
      express: {
        files:  [ 'app/server.js', 'app/index.html' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // Without this option specified express won't be reloaded
        }
      }
    },
    emberTemplates: {
      options: {
        templateBasePath: /app\/templates/
      },
      compile: {
        files: {
          "app/templates.js": "app/templates/**/*.handlebars"
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js', '!app/templates.js', '!app/public/**']
    },
    express: {
      options: {
      },
      dev: {
        options: {
          script: 'app/server.js'
        }
      },
      prod: {
        options: {
          script: 'path/to/prod/server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'path/to/test/server.js'
        }
      }
    }
  });

  grunt.registerTask('default', ['emberTemplates', /*'jshint',*/ 'express:dev', 'watch']);
};