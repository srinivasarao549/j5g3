#
# Build JS Files
#
require 'rake/packagetask'

# We have to make sure src/core.js is included first.
sources = Dir.glob("src/**/*.js")
sources.delete('src/core.js')

SRC = 'src/core.js ' + sources.join(' ')
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

desc "Syntax Check"
task :syntax do
	puts `#{JS} -f #{SRC}`
end

desc "Test"
task :test do
	puts `#{JS} test/*.js`
end

desc "Default Action"
task :default => [:build]
