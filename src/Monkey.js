/*
 * j5g3 Monkey Patching Module.
 */

Array.prototype.shuffle = function()
{
	for(var i=0; i<this.length; i++)
		this.swap(i, parseInt(Math.random() * this.length));
};

Array.prototype.swap = function(a, b)
{
	var t = this[a];
	this[a] = this[b];
	this[b] = t;
};

Array.prototype.each = function(fn)
{
	for (var i=0; i<this.length; i++)
		fn.apply(this[i], [i]);
};
