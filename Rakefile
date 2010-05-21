#
# Build JS Files
#
require 'rake/packagetask'

SRC = 'src/core.js'
OUTPUT = 'build/j5g3.js'
MINOUTPUT = 'build/j5g3-min.js'
JAVA = 'java'
JS = 'js'

desc "Build JS Script"
task :build do
	directory 'build'
	`cat #{SRC} > #{OUTPUT} `
end

desc "Minify script"
task :minify => [:build] do
	`#{JAVA} -jar tools/yuicompressor.jar #{OUTPUT} -o #{MINOUTPUT}`	
end

desc "Lint"
task :lint do
	puts `#{JS} tools/jslint.js #{SRC}`
end

desc "Default Action"
task :default => [:build]
