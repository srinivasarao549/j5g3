/**
 * j5g3 Tween Class
 *
 * Properties
 *
 * properties can be a DisplayObject or a properties Object.
 *
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

	_extend(this, properties);
},
Object,
{
	auto_emove: true,
	duration: 100,
	parent: null,
	is_playing: false,
	from: null,
	target: null,
	to:   null,
	t: 0
},
{
	pause: function() { this._p.isPlaying= false; },
	resume: function() { this._p.isPlaying= true; },
	
	stop: function() { this.pause(); this.rewind(); },
	easing: Animate.Easing.None,

	_calculate: function()
	{
		var target=this.target(), i, to=this.to(), t=this.t();
		for (i in to)
			target[i](this.easing(i, to[i],t ));

		if (t<this.duration())
			this.t(t+1);
		else
			this.t(0);
	},

	restart: function()
	{
		
	},

	draw: function() {
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

	invalidate: function() { return this; }
	
});
