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

	currentFrame : function() { return this._p._frame; },

	/**
	 * Updates frame.
	 *
	 */
	nextFrame : function() 
	{
		this._frame = (this._frame < this.totalFrames()-1) ? this._frame + 1 : 0; 
	},

	paint : Draw.Container,

	stop: function() { this._playing = false;	},
	play: function() { this._playing = true;	},

	/**
	 * Adds display_objects to current frame. 
	 * If function is passed it converts it to an Action object.
	 */
	add: function(display_object)
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
			for (var i=0; i < display_object.length; i++)
				this.add(display_object[i]);
			return this;
		case 'audio':
			// Create On the Fly display obejct for audio
			// TODO We might have an Audio class... If we need to.
			display_object = { parent: Property('parent'), draw: function() { display_object.play(); } };
			break;
		};

		display_object.parent(this);
		var f = this.frames();
		f[f.length-1].push(display_object);

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

	/**
	 * Returns element at position x,y
	 */
	at: function(x, y)
	{
		var frame = this.frame(), i;

		for (i =0;i<frame.length; i++)
			if (frame[i].visible() && Collision.Point.apply(frame[i], [x, y]))
				return frame[i];
	},

	remove_child: function(child)
	{
		var frames = this.frames(),
		    i,a
		;

		for (i=0; i<frames.length; i++)
			if (a = frames[i].indexOf(child))
			{
				frames.splice(a, 1);
				return this.invalidate();
			}
		
	}
});
