/*module('Util');

	var Base = function()
	{
		$.Property.extend(this);
		this.a = 1;
		this.b = 2;

		this.hi = function() { 'hello'; };
	};

	var A = function()
	{
		$.Property.extend(this);
		this.a = 3;
	};

	var B = function()
	{
		$.Property.extend(this);
		this.b = 3;
		this.a = 'a';
	};

	$.Util.Class(Base, Object, { d: 'd'}, { });

	Base.prototype.hi = function() { return 'Base'; };

	$.Util.Class(A, Base, { c: 4 }, { hi: function() { return 'A'; } });
	$.Util.Class(B, Base, { c: 5 }, { hi: function() { return 'B'; } });

test('Class Properties', function()
{
	ok(Base.properties);
	ok(A.properties);
	ok(B.properties);

	equals(A.properties.length, B.properties.length);
	ok(A.properties.c);
	ok(A.properties.c);
	ok(A.properties.d);
	ok(B.properties.d);
});

test('Class Methods', function()
{
	ok(A.prototype.d)
	ok(A.prototype.c);
	ok(B.prototype.d)
	ok(B.prototype.c);
});

test('Class instance Methods', function()
{
	var a = new A();
	var b = new B();

	equals(a.hi(), 'A');
	equals(b.hi(), 'B');
});

test('Class instance Properties', function()
{
	var a = new A();
	var b = new B();

	equals(a.d(), 'd');
	equals(b.d(), 'd');
	equals(a.c(), 4);
	equals(b.c(), 5);
	equals(b.a, 'a');
		
});

test('Custom Classes Derived from j5g3 Classes.', function()
{
	var D = function() { 
		$.Property.extend(this);
		this.source('../examples/soccer-ball.gif'); 
		
		var oldp = this.paint;

		this.paint = function(context) { return 'Hi'; };
	};
	$.Util.Class(D, $.Image, { }, { });

	var d = new D;

	ok(d.source().src.indexOf('soccer-ball.gif'));
	equals(d.paint(), 'Hi');

	ok(d._p);
	ok(d._p != D.prototype._p, "Ensure d has its own Copy of _p");
	equals(size(d._p), size(D.properties));
	equals(size(d._p), size(D.prototype._p));

	for (var method in $.Image.prototype)
		ok(d[method], "Method " + method);

	for (var prop in $.Image.properties)
		ok(d[prop], "Property " + prop);

	d.paint = function() { return 'Hello'; };
	equals(d.paint(), 'Hello');
	ok(d.paint != D.prototype.paint);

});*/
