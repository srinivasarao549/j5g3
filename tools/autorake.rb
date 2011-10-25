#
# Calls Rake When A File Inside SRC constant in Rakefile is modified
#
#

class String
	attr_accessor :modified
end

def update
	$src = Dir.glob('src/*') # + Dir.glob('resources/*.css')
	$src.each do |file|
		file.modified = File.mtime(file)
	end
end

if (`ls ~/talk` && $?.exitstatus==0)
	def talk(msg)
		puts msg
		`~/talk "#{msg}"`
	end
else
	def talk(msg)
		puts msg
	end
end

update
talk "AutoRake started: #{$src.size} files being tracked."

# Initialize

while true do
	$src.each do |file|
		mtime = File.mtime(file) rescue nil
		if (file.modified != mtime)
			puts "AutoRake: #{file} modified."
			talk "Executing Rake"
			puts `rake compile`

			talk $?.exitstatus==1 ? "Rake Failed" : "Rake successful"
			break
		end
	end
	update
	sleep 1
end


