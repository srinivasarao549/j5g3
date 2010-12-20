# Word Count Analysis
FILE = 'build/j5g3-min.js'

word = /\w\w+/
words = { }

data = File.read(FILE);

data.scan(word) do |w|
	words[w] = (words[w] ? words[w] : 0) + 1
end

words = words.sort do |a, b|
	a[1] <=> b[1]
end

words.each do |k, v| 
	puts "#{k}: #{v}" if v > 3
end
