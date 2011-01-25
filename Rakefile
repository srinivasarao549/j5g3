#
# Build JS Files
#
require 'rake/packagetask'

# We have to make sure src/core.js is included first.
VERSION = "0.1"
SRC = %w{core ../lib/js-class/src/class ../lib/js-class/src/property Animate Collision Property Util Draw DisplayObject Clip Emitter Image Input Range Rect Physics Sprite Spritesheet Text Tween Action Map outro}
SRCS = SRC.join(' ')

OUTPUT = 'build/j5g3.js'
MINOUTPUT = 'build/j5g3-min.js'
JAVA = 'java'
JS = 'js'

JS_CLASS_REPO = 'git://github.com/giancarlo/js-class.git'

def read(name)
	File.read("src/#{name}.js")
end

desc "Update Libraries"
task :libs do
	`rm lib/js-class -fr`
	`git clone #{JS_CLASS_REPO} lib/js-class`
end

desc "Build JS Script"
task :build do
	`mkdir -p build`

	output = read('intro').gsub!('@VERSION', VERSION).sub!('@DATE', Time.new.to_s)

	SRC.each do |file|
		output += read(file)
	end

	File.open(OUTPUT, 'w') do |f|
		f.write output
	end
end

desc "Minify script"
task :minify => [:build] do
	`#{JAVA} -jar tools/yuicompressor.jar #{OUTPUT} -o #{MINOUTPUT}`	
	puts "#{OUTPUT}: " + File.size(OUTPUT).to_s
	puts "#{MINOUTPUT}: " + File.size(MINOUTPUT).to_s
end

desc "Closure Compile"
task :compile => [:build] do
	`#{JAVA} -jar tools/compiler.jar --js #{OUTPUT} --js_output_file #{MINOUTPUT} --warning_level VERBOSE`
	`cp #{OUTPUT} #{MINOUTPUT} www`
	#`#{JAVA} -jar tools/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js #{OUTPUT} --js_output_file #{MINOUTPUT} --warning_level VERBOSE`
	puts "#{OUTPUT}: " + File.size(OUTPUT).to_s
	puts "#{MINOUTPUT}: " + File.size(MINOUTPUT).to_s
end

desc "Lint"
task :lint do
	puts `#{JS} tools/jslint.js #{SRCS}`
end

desc "Syntax Check"
task :syntax do
	puts `#{JS} -f #{SRCS}`
end

desc "Test"
task :test do
	puts `#{JS} test/*.js`
end

desc "Default Action"
task :default => [:compile]

