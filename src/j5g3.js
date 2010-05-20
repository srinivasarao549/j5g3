/**
 * JS Game Engine
 *
 * Core Library.
 */

var j5g3 = {

	Easing:
	{
		RegularOut: function()
		{
			return 0;	
		}
	},

	Util:
	{
		extend: function(a, b) {
			for (var i in b)
				a[i] = b[i];
			return a;
		},

		getType: function(obj)
		{
			var result = typeof(obj);

			if (result == 'object')
			{
				if (obj instanceof Array)
					result = 'array';
			}

			return result;
		}
	},

	Engine:
	{
		canvas: null,
		root: null, /** Root Node **/

		algorithms: {

			drawImage: function(context)
			{
				context.drawImage(this.source(), 0, 0);	
			},
			
			/**
			 * Drawing function for Clips
			 */
			drawSprite: function(context) 
			{
				var src = this.source();
				var w = this.width();
				var h = this.height();

				context.drawImage(src.image, src.x, src.y, src.w, src.h, 0, 0, w ? w : src.w, h ? h : src.h );
			},

			drawContainer: function(context)
			{
				var frame = this.frame();

				for (var i in frame)
					frame[i].draw(context);
			}
		},

		onClick: function()
		{
			
		},

		/**
		 * Properties:
		 *
		 * canvas:   Canvas object where the game will be rendered. If not present it will default to element with id 'screen'.
		 *
		 */
		initialize: function(properties)
		{
			
			if (properties)
			{
				this.canvas = properties.canvas;
				this.fps = properties.fps;
			}

			if (!this.canvas)
				this.canvas = document.getElementById('screen');

			this.canvas.width  = 640;
			this.canvas.height = 480;

			if (!this.fps) this.fps = 100;

			this.background = new j5g3.Rect({ width: 640, height: 480 });
			
			this.root = new j5g3.Clip({ width: 640, height: 480 });

			this.canvas.addEventListener('click', this.onClick, false);

			return this;
		},

		getContext: function()
		{
			return this.canvas.getContext('2d');
		},

		gameLoop: function()
		{
			var context = this.getContext();

			this.background.draw(context);
			this.root.draw(context);
		},

		run: function()
		{
			setInterval('j5g3.Engine.gameLoop()', this.fps);
		}
	}
};

/**
 * Base for all classes
 */
j5g3.DisplayObject = function(properties)
{
	this._p = j5g3.Util.extend({
		x: 0, y:0, width: null, height: null, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1
	}, properties);

	this._dirty = false;

	/**
	 * Save Transform Matrix and apply transformations.
	 */
	this.begin = function(context)
	{
		context.save();
		context.globalAlpha *= this._p.alpha;
		context.translate(this.x(), this.y());
		context.scale(this.scaleX(), this.scaleY());
		context.rotate(this.rotation());
	};

	/**
	 * Restores Transform Matrix
	 */
	this.end = function(context)
	{
		context.restore();
	};

	/**
	 * Applies Transformations and paints Object in the screen.
	 * To define your custom DisplayObject class implement the paint() function. The paint function receives
	 * the current context for drawing.
	 */
	this.draw = function(context)
	{
		this.begin(context);
		this.paint(context);
		this.end(context);
	};

	this.source = function() { return this._p.source; };

	this.invalidate = function()  { this._dirty = true; }
	this.isDirty = function()  { return this._dirty; };

	this.alpha  = function(value) { return value ? (this.invalidate(), (this._p.alpha  = value), this) : this._p.alpha;  };
	this.width  = function(value) { return value ? (this.invalidate(), (this._p.width  = value), this) : this._p.width;  };
	this.height = function(value) { return value ? (this.invalidate(), (this._p.height = value), this) : this._p.height; };
	this.x      = function(value) { return value ? (this.invalidate(), (this._p.x      = value), this) : this._p.x;      };
	this.y      = function(value) { return value ? (this.invalidate(), (this._p.y      = value), this) : this._p.y;      };
	this.scaleX = function(value) { return value ? (this.invalidate(), (this._p.scaleX = value), this) : this._p.scaleX; };
	this.scaleY = function(value) { return value ? (this.invalidate(), (this._p.scaleY = value), this) : this._p.scaleY; };

	this.rotation = function(value) { return value ? (this.invalidate(), (this._p.rotation = value), this) : this._p.rotation; };

	this.align = function(alignment, container) 
	{
		switch (alignment) {
		case 'center': 	this.x(container.width() / 2); 	break;
		case 'left':    this.x(0); break;
		case 'right':   this.x(container.width() - this.width()); break;
		case 'middle':  this.y(container.height() / 2); break;
		}
	};

	/**
	 * Collision Check
	 */
	this.collidesWith = function(obj)
	{
		var dx = this.x() - obj.x();
		var dy = this.y() - obj.y();
		var w  = this.width();

		if (Math.abs(dx) > w || Math.abs(dy) > w)
			return false;

		var d2 = dx*dx + dy*dy;

		if (d2 > w*w)
			return false;

		return true;
	}
};

j5g3.Rect = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	this.fillStyle = function(value) { return value ? (this.invalidate(), (this._p.fillStyle = value), this) : this._p.fillStyle; };

	this.paint = function(context) {
		if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
		context.fillRect(this._p.x, this._p.y, this._p.width, this._p.height);
	};
};

j5g3.Image = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	if (typeof(this._p.source)=='string')
	{
		this._p.source = new Image;
		this._p.source.src = properties.source;
	}

	if (this._p.width === null)  this._p.width  = this._p.source.width;
	if (this._p.height === null) this._p.height = this._p.source.height;
	
	this.paint = j5g3.Engine.algorithms.drawImage;
}

j5g3.Sprite = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	this.paint = j5g3.Engine.algorithms.drawSprite;
}

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
			display_object = new j5g3.Action({ code: display_object });
			break;
		case 'string':
			display_object = new j5g3.Image({ source: display_object });
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

j5g3.Text = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	this.text = function() { return this._p.text; };
	this.paint = function(context)
	{
		if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
		context.fillText(this.text(), 0, 0);
	};
};

j5g3.Action = function(properties)
{
	this.draw = properties.code;
};
