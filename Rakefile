#
# Build JS Files
#
require 'rake/packagetask'

SRC = 'src/core.js'
OUTPUT = 'build/j5g3.js'
JAVA = 'java'

desc "Build JS Script"
task :build do
	directory 'build'
	`cat #{SRC} > #{OUTPUT} `
end

desc "Minify script"
task :minify => [:build]
	`#{JAVA} -jar tools/yuicompressor.jar #{OUTPUT}`	
end

desc "Default Action"
task :default => [:build]
