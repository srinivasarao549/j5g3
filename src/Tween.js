/**
 * j5g3 Tween Class
 *
 * Properties
 *
 * properties can be a DisplayObject or a properties Object.
 *
 * auto_remove Boolean         Removes tween from clip at the end. Defaults to false.
 * target    DisplayObject     Object to animate.
 * from      Object            Start Value(s)
 * to        Object            Final Value(s)
 * duration  int               Duration of tween in frames. Default to 100 frames.
 * repeat    int               How many times to repeat.
 * t         int               Current Time of the animation.
 *
 * Replaceable Methods: 
 *
 * easing    function
 *
 */

Tween = Class.extend({
	
	init: function(properties)
	{
		if (_typeof(properties) == 'j5g3')
			properties = { target: properties };

		this.draw = this.start;

		_extend(this, properties);
	},

	pause: function() { this._olddraw = this.draw; this.draw = function() { }; return this; },
	resume: function() { this.draw = this._olddraw ? this._olddraw : this.start; return this;},
	rewind: function() { this.__repeat -= 1; return this.t(0); },
	
	stop: function() { this.pause(); this.rewind(); if (this.__on_stop) this.__on_stop(); return this;},
	easing: Animate.Easing.None,
	remove: function() { this.parent().remove_child(this); if (this.__on_remove) this.__on_remove(); return this;},

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
		if (this.__from === null)
		{
			this.__from = {};
			for (i in to)
				this.__from[i] = target[i]();
		}

		this.draw = this._calculate;
	},

	draw: null,

	invalidate: function() { return this; }
	
}).properties(
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
});
