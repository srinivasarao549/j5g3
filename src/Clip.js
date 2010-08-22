/**
 * j5g3 Clip
 *
 * Properties:
 *
 * frames	Array of array      Frames of clip.
 *
 */

Class(
	Clip= function(properties)
	{
		_extend(this, properties);

		if (!this._p.frames)
			this._p.frames = [ [ ] ];

		this._frame = 0;
		this._playing = true;
	},
	DisplayObject, 
	{ frames: null }, 
	{
	
	/**
	 * Returns current frame objects.
	 */
	frame : function() 
	{
		f = this.frames()[this._frame]; 
		if (this._playing)
			this.nextFrame();
		return f; 
	},

	totalFrames  : function() { return this.frames().length; },

	currentFrame : function() { return _frame; },

	/**
	 * Updates frame.
	 *
	 */
	nextFrame : function() 
	{
		this._frame = (this._frame < this.totalFrames()-1) ? this._frame + 1 : 0; 
	},

	paint : Draw.Container,

	stop : function() { this._playing = false;	},
	play : function() { this._playing = true;	},

	/**
	 * Adds display_objects to current frame. 
	 * If function is passed it converts it to an Action object.
	 */
	add : function(display_object)
	{
		switch (_typeof(display_object)) {
		case 'function':
			display_object = new Action(display_object);
			break;
		case 'string':
			display_object = new Image({ source: display_object });
			break;
		/* NOTE j5g3 Objects return j5g3 and not object */
		case 'object':
			display_object = new Image(display_object);
			break;			
		case 'array':
			for (var i in display_object)
				this.add(display_object[i]);
			return this;
		case 'audio':
			// Create On the Fly display obejct for audio
			// TODO We might have an Audio class... If we need to.
			display_object = { parent: Property('parent'), draw: function() { display_object.play(); } };
			break;
		};

		if (display_object.parent) display_object.parent(this);
		var f = this.frames();
		f[f.length-1].push(display_object);
		//this.frames()[this._frame].push(display_object);
		return this;
	},

	/**
	 * Goes to frame 
	 */
	gotoFrame : function(frame)
	{
		this._frame = frame;
		return this;
	},

	/**
	 * Goes To Frame number and plays.
	 */
	gotoAndPlay : function(frame)
	{
		this.gotoFrame(frame);
		this.play();
		return this;
	},

	gotoAndStop : function(frame)
	{
		this.gotoFrame(frame);
		this.stop();
		return this;
	},

	alignChildren : function(alignment)
	{
		var frm = this.frame();

		for (var i in frm)
			if (frm[i].align)
				frm[i].align(alignment, this);
		return this;
	},

	animateTo : function(target, duration, alg)
	{
		var start = {};

		if (alg===undefined)
			alg = Animate.Easing.None;

		for (var p in target)
			start[p] = target;

		return function() {
			alg(start, target, this._iframe);			
		};
	}
});
