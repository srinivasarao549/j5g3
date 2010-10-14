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

