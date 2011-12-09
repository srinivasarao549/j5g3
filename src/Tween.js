
Tween = 

/**
 * @class Tween Class
 *
 * @property {Boolean}             auto_remove    Removes tween from clip at the end. Defaults to false.
 * @property {j5g3.DisplayObject}  target         Object to animate.
 * @property {Object}              from           Start Value(s)
 * @property {Object}              to             Final Value(s)
 * @property {Number}              duration       Duration of tween in frames. Default to 100 frames.
 * @property {Number}              repeat         How many times to repeat.
 * @property {Number}              t              Current Time of the animation.
 *
 * @property {function}   on_remove 
 * @property {function}   on_stop
 *
 */
j5g3.Tween = Class.extend(/**@scope j5g3.Tween.prototype */ {
	
	/**
	 * @param properties  DisplayObject or an Object containing properties.
	 */
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

	/** Recalculates Tween */
	restart: function()
	{
		return this.stop().start();
	},
	
	stop: function() { this.pause(); this.rewind(); if (this.__on_stop) this.__on_stop(); return this;},
	easing: Animate.Easing.None,
	remove: function() { this.parent().remove_child(this); if (this.__on_remove) this.__on_remove(); return this;},

	_calculate: function()
	{
	var 
		me = this,
		target=me.__target, i, to=me.__to, t=me.__t
	;
		for (i in to)
			target[i](me.easing(i, to[i],t ));

		if (t<me.duration())
			me.t(t+1);
		else 
		{
			if (me.auto_remove())
				me.remove();
			else if (me.repeat())
				me.rewind();
			else
				me.stop();
		}
	},

	/**
	 * Sets up Tween to act on next Frame draw
	 */
	start: function()
	{
	var 
		me = this,
		to = me.to(), i, target=me.target()
	;

		// Setup function it will be replaced after setting up.
		if (me.__from === null)
		{
			me.__from = {};
			for (i in to)
				me.__from[i] = target[i]();
		}

		me.draw = me._calculate;
		return this;
	},

	draw: null,

	invalidate: function() { return this; }
	
}).properties(
/** @scope j5g3.Tween.prototype */
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
}),
