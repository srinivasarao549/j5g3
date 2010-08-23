/**
 * j5g3 Tween Class
 *
 * Properties
 *
 * properties can be a DisplayObject or a properties Object.
 *
 * auto_remove Boolean         Removes tween from clip at the end.
 * target    DisplayObject     Object to animate.
 * from      Object            Start Value(s)
 * to        Object            Final Value(s)
 * duration  int               Duration of tween in frames.
 * repeat    int               How many times to repeat.
 * t         int               Current Time of the animation.
 *
 * Replaceable Methods: 
 *
 * easing    function
 *
 */

Class(Tween = function(properties)
{
	if (_typeof(properties) == 'j5g3')
		properties = { target: properties };

	this.draw = this.start;

	_extend(this, properties);
},
Object,
{
	auto_remove: false,
	repeat: Infinity,
	duration: 100,
	parent: null,
	is_playing: false,
	from: null,
	target: null,
	to:   null,
	t: 0,
	/* EVENTS */
	on_stop: null,
	on_remove: null,
	visible: false
},
{
	pause: function() { this._olddraw = this.draw; this.draw = function() { }; return this; },
	resume: function() { this.draw = this._olddraw ? this._olddraw : this.start; return this;},
	rewind: function() { this._p.repeat -= 1; return this.t(0); },
	
	stop: function() { this.pause(); this.rewind(); if (this._p.on_stop) this._p.on_stop(); return this;},
	easing: Animate.Easing.None,
	remove: function() { this.parent().remove_child(this); if (this._p.on_remove) this._p.on_remove(); return this;},

	_calculate: function()
	{
		var target=this.target(), i, to=this.to(), t=this.t();
		for (i in to)
			target[i](this.easing(i, to[i],t ));

		if (t<this.duration())
			this.t(t+1);
		else 
		{
			if (this.auto_remove())
				this.remove();
			else if (this.repeat())
				this.rewind();
			else
				this.stop();
		}
	},

	start: function()
	{
		var to = this.to(), i, target=this.target();

		// Setup function it will be replaced after setting up.
		if (this._p.from === null)
		{
			this._p.from = {};
			for (i in to)
				this._p.from[i] = target[i]();
		}

		this.draw = this._calculate;
	},

	draw: null,

	invalidate: function() { return this; }
	
});
