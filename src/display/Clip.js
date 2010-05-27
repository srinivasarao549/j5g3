
j5g3.Clip = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	if (!this._p.frames)
		this._p.frames = [ [ ] ];

	this._frame = 0;
	this._playing = true;

	this.frames = function(value) { return value ? (this.invalidate(), (this._p.frames = value), this) : this._p.frames; };

	/**
	 * Returns current frame objects.
	 */
	this.frame = function() 
	{
		f = this.frames()[this._frame]; 
		if (this._playing)
			this.nextFrame();
		return f; 
	}

	this.totalFrames  = function() { return this.frames().length; };

	this.currentFrame = function() { return _frame; };
	this.nextFrame = function() { this._frame = (this._frame < this.totalFrames()-1) ? this._frame + 1 : 0; }

	this.paint = j5g3.Engine.algorithms.drawContainer;

	this.stop = function() { this._playing = false;	};
	this.play = function() { this._playing = true;	};

	/**
	 * Adds display_objects to current frame. 
	 * If function is passed it converts it to an Action object.
	 */
	this.add = function(display_object)
	{
		switch (j5g3.Util.getType(display_object)) {
		case 'function':
			display_object = new j5g3.Action(display_object);
			break;
		case 'string':
			display_object = new j5g3.Image({ source: display_object });
			break;
		/* NOTE j5g3 Objects return j5g3 and not object */
		case 'object':
			display_object = new j5g3.Image(display_object);
			break;			
		case 'array':
			for (var i in display_object)
				this.add(display_object[i]);
			return this;
		};

		this.frames()[this._frame].push(display_object);
		return this;
	};

	/**
	 * Goes to frame 
	 */
	this.gotoFrame = function(frame)
	{
		this._frame = frame;
		return this;
	};

	/**
	 * Goes To Frame number and plays.
	 */
	this.gotoAndPlay = function(frame)
	{
		this.gotoFrame(frame);
		this.play();
		return this;
	};

	this.gotoAndStop = function(frame)
	{
		this.gotoFrame(frame);
		this.stop();
		return this;
	};

	this.alignChildren = function(alignment)
	{
		var frm = this.frame();

		for (var i in frm)
			if (frm[i].align)
				frm[i].align(alignment, this);
		return this;
	};

	/**
	 * Adds Frames to Clip.
	 */
	this.animateTo = function(property, goal, duration, algorithm)
	{
		var frms = this.frames();

		for (var i = 1; i < duration; i++)
		{
			frms[i] = frms[i-1];
			for (var j in frms[i-1])
			{
				frms[i][j][property] = algorithm.apply(frms[0][j][property], goal, i);
			}
		}
	};

};
