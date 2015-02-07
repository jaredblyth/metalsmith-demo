module.exports = function(grunt) {
	
	grunt.initConfig({
		server: {
	    	port: 3001,
	    	base: './public'
	    },
		execute: {
	        compile: {
	        	src: ['compile.js']
	        }
	    },
	    watch: {
	    	content: {
				files: ['src/**', 'templates/**', 'plugins/**'],
				tasks: ['execute:compile']
			}
	    }
		
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-execute');

    grunt.registerTask('start', ['execute:compile', 'server', 'watch']);

	grunt.registerTask('default', ['start']);

	grunt.registerTask('server', 'Start a custom web server', function() {
	    grunt.log.writeln('Started web server on port 3001');
	    require('./app.js');
	});

};