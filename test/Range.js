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
