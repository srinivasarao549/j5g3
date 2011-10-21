/**
 * j5g3.Clip
 *
 * Properties:
 *
 * frames	Array of array      Frames of clip.
 *
 *
 */
Clip = $.Clip = DisplayObject.extend(
{
	/**
	 * @constructor
	 */
	init: function(properties)
	{
		if (properties instanceof Array)
			properties = { frames: properties };

		_extend(this, properties);

		// TODO This might be dangerous if we decide to change the internal storage of
		//      properties. Be careful.
		if (!this.__frames)
			this.__frames = [ [ ] ];

		this._frame = 0;
		this._playing = true;
	},
	
	/**
	 * Returns current frame objects.
	 */
	frame: function() 
	{
		return this.frames()[this._frame]; 
	},

	/**
	 * Sets next frame index.
	 */
	nextFrame : function() 
	{
		this._frame = (this._frame < this.__frames.length-1) ? this._frame + 1 : 0; 
	},

	paint : Draw.Container,

	stop: function() { this._playing = false; return this;},
	play: function() { this._playing = true; return this; },

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
			display_object = { parent: window.property('parent'), draw: function() { display_object.play(); } };
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
	go: function(frame)
	{
		this._frame = frame;
		return this;
	},

	/**
	 * Returns all children in all frames
	 */
	children: function()
	{
		var fs = this.frames(), l=fs.length, i=0, a, children=[], cf, cfl;
		for(;i<l;i++)
		{
			cf = fs[i]; cfl=cf.length;			
			for (a=0; a<cfl; a++)
				children.push(cf[a]);
		}

		return children;
	},

	/**
	 * Aligns all children
	 */
	align_children : function(alignment)
	{
		var frm = this.children(), i=frm.length;

		while (i--)
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
		var frames = this.frames(), i=frames.length,a ;

		while (i--)
			if (-1 != (a = frames[i].indexOf(child)))
			{
				frames[i].splice(a, 1);
				return this.invalidate();
			}
		
	}
}).properties(
	{ frames: null }
),
