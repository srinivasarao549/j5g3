#
# Build JS Files
#
require 'rake/packagetask'

# We have to make sure src/core.js is included first.
VERSION = "0.2"
SRC = %w{core Class Animate Collision Util Draw DisplayObject Clip Emitter Image Input Range Rect Physics Sprite Spritesheet Text Tween Action Map Network Group outro}
SRCS = SRC.join(' ')

OUTPUT = 'build/j5g3.js'
DBGOUTPUT = 'build/j5g3-dbg.js'
MINOUTPUT = 'build/j5g3-min.js'

AIOUTPUT = 'build/j5g3-ai.js'
AIMINOUTPUT = 'build/j5g3-ai-min.js'

GDKOUTPUT = 'build/j5g3-gdk.js'
GDKMINOUTPUT = 'build/j5g3-gdk-min.js'

JAVA = 'java'
JS = 'js'

JS_CLASS_REPO = 'git://github.com/giancarlo/js-class.git'
JSDOC = 'java -jar tools/jsdoc/jsrun.jar tools/jsdoc/app/run.js -a -t=tools/jsdoc/templates/jsdoc -d=www/docs '

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

	# Build Debug file
	`cp #{OUTPUT} #{DBGOUTPUT} && cat src/Debug.js >> #{DBGOUTPUT}`
	`cp #{OUTPUT} #{DBGOUTPUT} www`

	`cp src/ai.js #{AIOUTPUT}`
	`cp #{AIOUTPUT} www`

	`cp src/gdk.js #{GDKOUTPUT}`
	`cp #{GDKOUTPUT} www`
end

def compile(file, output)
	#`#{JAVA} -jar tools/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js #{OUTPUT} --js_output_file #{MINOUTPUT} --warning_level VERBOSE`
	`#{JAVA} -jar tools/compiler.jar --js #{file} --js_output_file #{output} --warning_level VERBOSE`
	`cp #{output} www`
	o = File.size(output)
	i = File.size(file)
	p = "%3.2f" % (o.to_f / i.to_f * 100)
	puts "#{output}: #{o.to_s}/#{i.to_s}(#{p}%)"
end

desc "Closure Compile"
task :compile => [:build] do
	compile(OUTPUT, MINOUTPUT)
	compile(AIOUTPUT, AIMINOUTPUT)
	compile(GDKOUTPUT, GDKMINOUTPUT)
end

desc "Lint"
task :lint do
	require 'tempfile'

	code = File.read(OUTPUT)
	code.gsub!("\t", '  ');
	f = Tempfile.new(['j5g3', '.js'])
	f.write code
	f.close
	puts "Linting #{f.path}"
	puts `fixjsstyle #{f.path}`
	puts `gjslint --custom_jsdoc_tags=scope #{f.path}`
	f.unlink
end

desc "Syntax Check"
task :syntax do
	puts `#{JS} -f #{SRCS}`
end

desc "Generate Documentation"
task :docs do
	puts `#{JSDOC} #{DBGOUTPUT} #{AIOUTPUT} #{GDKOUTPUT}`
end

desc "Create Release"
task :release => [:compile] do
	puts `tar -cvzf www/j5g3-#{VERSION}.tar.gz build`
end

desc "Default Action"
task :default => [:build]

