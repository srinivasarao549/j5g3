module('core');

var $ = j5g3,
    size = function(obj)
    {
    	var c=0;
    	for (var i in obj)
		c++;
	return c;
    };

test('Core', function() {
	expect(2);
	ok(j5g3);
	ok($.start);
});
