module('Util');

test('Class', function()
{
	var Base = function()
	{
		this.a = 1;
		this.b = 2;
	};

	var A = function()
	{
		this.a = 3;
	};

	var B = function()
	{
		this.b = 3;
	};

	Base.prototype.hi = function() { return 'Base'; };

	$.Util.Class(A, Base, { c: 4 }, { hi: function() { return 'A'; } });
	$.Util.Class(B, Base, { c: 5 }, { hi: function() { return 'B'; } });


});
