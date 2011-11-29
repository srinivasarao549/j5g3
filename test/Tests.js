
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


module('Action');



module('Image');

test('Class Constructor', function()
{
	var img = $.id('img'),
	    I = new $.Image(img)
	;

	equals(I.source(), img);

});

test('Class Properties', function()
{
	var a = new $.Image,
	    src = 'img',
	    b = new $.Image({source: src})
	;

	equals(a.source(), undefined);
	ok(b.source());
	ok(b.source().src.indexOf('explosion17'));
});



module('Range');

test('Range Construction', function()
{
	var r = new $.Range(0, 25),
	    a = new $.Range( { start: 0, end: 25 })
	;

	equals(r.start(), a.start());
	equals(r.end(), a.end());
	same(r.to_a(), a.to_a());
});

