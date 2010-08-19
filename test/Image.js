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
	    src = '../examples/soccer-ball.gif',
	    b = new $.Image({source: src})
	;

	equals(a.source(), null);
	ok(b.source());
	ok(b.source().src.indexOf('soccer-ball.gif'));
});

