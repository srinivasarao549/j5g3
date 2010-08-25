/**
 * j5g3 v0.1 - Javascript Game Engine 
 * http://hackerhosting.com/j5g3
 *
 * Copyright 2010, Giancarlo Bellido
 *
 * Dual licensed under the MIT or GPL Version 2
 * http://jquery.org/license
 *
 * Date: 2010-08-25 16:44:06 -0400
 */

(function(window, document, undefined) {

	var VERSION = "0.1",
	    Action,
	    Animate,
	    Clip,
	    Class,
	    Collision,
	    DisplayObject,
	    Draw,
	    Image,
	    Physics,
	    Property,
	    Range,
	    Rect,
	    Sprite,
	    Spritesheet,
	    Text,
	    Tween,
	    Util,

	    canvas,
	    _extend,
	    _typeof,
	    context,

/* core.js defines $ */
	
$ = window.j5g3 = new (function()
{
	var 
		_pg = {
			version: VERSION
		},

		/* PRIVATE MEMBERS */

		self = this,

		getContext= function()
		{
			return context;
		},
		initialize = function(properties)
		{
			$.Property.define(self.constructor, { 
				'canvas' : null,
				backgroundStyle : 'black',
				width  : 640,
				height : 480
			});
			_extend(self, properties);

			if (self._p.canvas === null)
				self._p.canvas = $.id('screen');

			self._p.fps = 31;

			canvas = self._p.canvas;

			self.background = new Rect({ 
				fillStyle: self.backgroundStyle(),
				width: self.width(), 
				height: self.height() 
			});
			
			self.root = new Clip({
				width: self.width(),
				height: self.height()
			});

			canvas.width = self.width();
			canvas.height = self.height();

			context = canvas.getContext('2d');

			properties.start($, document);
		}
	;
	/**
	 * Starts the execution.
	 */
	this.run= function()
	{
		setInterval(this.gameLoop, this._p.fps);
	};


	this.gameLoop = function()
	{
		self.background.draw();
		self.root.draw();
	}; 

	this.fps = function(val)
	{
		if (val === undefined) return 1000 / this._p.fps;
		this._p.fps = 1000 / val;
		return this;
	};

	/**
	 * You should always call this method first.
	 */
	this.start= function(initfunc)
	{
		initialize(typeof(initfunc)=='function' ? { start: initfunc } : initfunc);
	};

	this.invalidate = function() { return this; };

	this.id = function(id) { return document.getElementById(id); };
});
/**
 * j5g3 Animation Module.
 */

Animate = { 
	Easing:
	{
		None: function( prop, to, t)
		{
			var start = this.from(),
			    v = (to - start[prop]) / this.duration()
			;

			return start[prop] + v*t;
		},

		RegularOut: function()
		{
			return 0;	
		}
	}
};

/**
 * Collision Module Algorithsm
 */

Collision = {
	
	/**
	 * Determines if point is inside object.
	 */
	Point: function(x, y)
	{
		var ox = this.x(), oy = this.y();

		return (x >= ox && x <= ox+this.width()) &&
		       (y >= oy && y <= oy+this.height());		
	},

	/**
	 * Circle Collision detection algorithm.
	 */
	Circle: function(b) 
	{
		var dx = this.x() - b.x(),
		    dy = this.y() - b.y(),
		    w  = this.width()
		;

		if (Math.abs(dx) > w || Math.abs(dy) > w)
			return false;

		var d2 = dx*dx + dy*dy;

		return (d2 <= w*w);
	},

	/**
	 * AABB Test
	 */
	AABB: function(b)
	{
		var ax = this.x(),
		    ay = this.y(),
		    bx = b.x(),
		    by = b.y()
		;

		return (ax+this.width() >= bx && ax <= bx+b.width()) && (ay+this.height() > by && ay <= by+b.height());
	}

};
/**
 * Property Functions
 *
 */


/**
 * Declares a j5g3 Property.
 * @param p	Object storing the value.
 * @param name  Property name
 *
 */
Property = function(name)
{
	return function(val) { 
		return val === undefined ? this._p[name] :
			(this._p[name] = val, this.invalidate());
	}
};

/**
 * Declares a read-only j5g3 Property.
 * @param p	Object storing the value.
 * @param name  Property name
 *
 */
Property.get = function(p, name) {
	return function(val)
	{
		return p[name];
	};
};

/**
 * Will declare all the properties of the object in its prototype
 * @param obj   Object to add Properties.
 * @param properties Properties object.
 *
 */
Property.define = function(obj, properties) 
{
	for (var i in properties)
		obj.prototype[i] = Property(i); 

	obj.properties = properties;

	return obj;
};

/**
 * Extends Properties by initializing the _p object.
 *
 * @return obj._p Object
 */
_extend = Property.extend = function(obj, p)
{
	// TODO Check this..
	//obj._p = obj._p ? Util.clone(obj._p) : { };
	obj._p = { };

	var properties = obj.constructor.properties,
	    i;

	if (p)
		for (i in properties)
			obj._p[i] = p[i] || properties[i];
	else
		for (i in properties)
			obj._p[i] = properties[i];
	
	return obj._p;
};
/**
 *
 * j5g3 Utilities
 *
 */

Util = {

	/**
	 * Extends object a with b
	 */
	extend: function(a, b)
	{
		for (var i in b)
			a[i] = b[i];
		return a;
	},

	inherit: function(a, b)
	{
		for (var i in b)
			a[i] = a[i] || b[i];
		return a;
	},

	clone: function(a)
	{
		var x = {};
		for (var i in a)
			x[i] = a[i];
		return x;
	},

	/**
	 * Defines class klass.
	 * @param b is the class to extend
	 */
	Class: function(klass, base, properties, methods)
	{
		Util.extend(klass.prototype, new base);
		Property.define(klass, properties);
		Util.inherit(properties, base.properties);
		Util.extend(klass.prototype, methods);

		return klass;
	}
};


Class = Util.Class;

_typeof = Util.getType = function(obj)
	{
		var result = typeof(obj);

		if (result == 'object')
		{
			if (obj instanceof Array) return 'array';
			if (obj instanceof HTMLAudioElement) return 'audio';
			if (obj instanceof HTMLElement) return 'DOM';
			if (obj._p) return 'j5g3';
		}

		return result;
	}
;



/**
 * This are all the core drawing algorithms. "this" will point to the DisplayObject.
 */
Draw =  
{
	Image: function ()
	{
		context.drawImage(this._p.source, 0, 0);	
	},
	
	/**
	 * Drawing function for Clips
	 */
	Sprite: function () 
	{
		var src = this.source(), 
		    w = this.width(), 
		    h = this.height()
		;

		context.drawImage(src.image, src.x, src.y, src.w, src.h, 0, 0, w ? w : src.w, h ? h : src.h);
	},

	Container: function ()
	{
		var frame = this.frame(),i;

		for (i=0; i<frame.length;i++)
			frame[i].draw(context);
	},

	Text: function()
	{
		context.fillText(this.text(), 0, 0);
	}

};


/**
 * Base for all classes
 */
Class(
	DisplayObject=function(properties)
	{
		//this._p = { }
		_extend(this, properties);
		this._dirty = true;
	}, 
	Object, 
	{
		source: null, parent: null, x: 0, y:0, width: null, height: null, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1
	}, 
	{
	
	/**
	 * Save Transform Matrix and apply transformations.
	 */
	begin : function()
	{
		context.save();
		context.globalAlpha *= this.alpha();
		context.translate(this.x(), this.y());
		context.scale(this.scaleX(), this.scaleY());
		context.rotate(this.rotation());
	},

	/**
	 * Restores Transform Matrix
	 */
	end : function()
	{
		context.restore();
	},

	/**
	 * Applies Transformations and paints Object in the screen.
	 * To define your custom DisplayObject class implement the paint() function. The paint function receives
	 * the current context for drawing.
	 */
	draw : function()
	{
		this.begin();
		this.paint();
		this.end();
	},

	invalidate : function()  
	{ 
		this._dirty = true;
		return this;
	},

	isDirty : function()  
	{ 
		return this._dirty;
	},

	/**
	 * Sets position of the object according to alignment and container.
	 */
	align : function(alignment, container) 
	{
		switch (alignment) {
		case 'center': 	this.x(container.width() / 2); 	break;
		case 'left':    this.x(0); break;
		case 'right':   this.x(container.width() - this.width()); break;
		case 'middle':  this.y(container.height() / 2); break;
		}
		return this;
	},

	/**
	 * Default collision Algorithm is Circle (Collision Module)
	 */
	collides: Collision.Circle,

	/**
	 * Sets x and y
	 */
	pos : function(x, y)
	{
		this._p.x = x;
		this._p.y = y;

		return this.invalidate();
	},

	remove: function()
	{
		this.parent().remove_child(this);
	},

	visible: function()
	{
		return this._p.alpha > 0;
	}
	
});
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

		//if (display_object.parent) 
			display_object.parent(this);
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

/**
 * j5g3 Image Class
 *
 * Constructor takes properties object, a string with the id of an Image or an HTML Image Element.
 *
 * Properties
 *
 * source: 
 */
Class(
	Image= function(properties)
	{
		switch(_typeof(properties)) {
		case 'string': 
			properties = { source: $.id(properties) }; break;
		case 'DOM':
			properties = { source: properties }; break;
		}

		_extend(this, properties);

		if (this._p.source)
			this.source(this._p.source);
	}, 
	DisplayObject, { }, 
	{

	paint: Draw.Image,

	/**
	 * Sets the source. If src is a string it will create an Image object.
	 * NOTE: Chrome and Safari (webkit) loads images and css parallely. So we have to wait for the image to load in order
	 * to get the correct width and height. 
	 */
	source: function(src)
	{
		if (src)
		{
			if (typeof(src)=='string')
			{
				this._p.source = $.id(src);
			} else
				this._p.source = src;

			if (this._p.width === null)  this._p.width  = this._p.source.width;
			if (this._p.height === null) this._p.height = this._p.source.height;

			this.invalidate();
			return this;
		}
		return this._p.source;
	}
	
});
/*
 * j5g3 Range Class
 *
 * Constructor takes a property object, or a start and end values.
 */
Class(
	Range = function(start, end)
	{
		if (typeof start != 'object')
			start = { 'start': start, 'end': end };
			
		_extend(this, start);
	},
	Object,
	{ start: 0, end: 0 },
	{ 
		to_a: function()
		{
			var p = this._p, i=p.start, result=[];

			for (; i < p.end; i++)
				result.push(i);

			return result;
		}
	
	}
);

/*
 * Displays a Rect
 */

Class(
	Rect = function(properties)
	{
		_extend(this, properties);
	}, 
	DisplayObject,
	{
		fillStyle: null
	},
	{
		paint : function()
		{
			if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;

			context.fillRect(this._p.x, this._p.y, this._p.width, this._p.height);
		}
	}
);

/**
 * j5g3 Physics Class
 *
 * Properties
 *
 * obj     Object to apply physics to.
 * v       Velocity 2D Vector
 */

Class(Physics = function(properties)
{
	_extend(this, properties);
},
Object,
{
	obj: null, v: null, m: 1
},
{
	draw: function()
	{
		var o = this._p.obj,
		    v = this._p.v
		;

		o.x(o.x() + v[0]);
		o.y(o.y() + v[1]);
	},

	/**
	 * Applies force [fx, fy] for 1 frame.
	 */
	force: function(fx, fy, x, y)
	{
		var m = this._p.m,
		    v = this._p.v
		; 

		v[0] = (m*v[0]+fx)/m;
		v[1] = (m*v[1]+fy)/m;

		return this;
	},

	impulse: function()
	{
	},

	invalidate: function() { }
});

/*
 * j5g3 Sprite
 *
 * Properties:
 *
 * source     Object    { image: HTML_Image_Spritesheet, x: xpos, y: ypos, w: sprite_width, h: sprite_height }
 *
 */
Class(
	Sprite = function(properties)
	{
		_extend(this, properties);
	},
	DisplayObject, { }, { paint: Draw.Sprite }
);
/**
 * j5g3 Spritesheet Class
 *
 * Constructor can take properties object, a string with the filename, an HTML Image or j5g3 Image.
 *
 * Properties:
 *
 * source	Image of the spritesheet. If a string passed it will be converted to a j5g3.Image
 *
 */

Class(
	Spritesheet = function(properties)
	{
		switch (_typeof(properties)) {
		case 'string': case 'DOM': case 'j5g3':   
			properties = { source: properties }; 
		}

		switch (_typeof(properties.source)) {
		case 'string': case 'DOM':
			properties.source = new Image(properties.source);
			break;
		}
		
		if (properties.width === undefined && properties.source)
			properties.width = properties.source.width();
		
		if (properties.height === undefined && properties.source)
			properties.height = properties.source.height();
		
		var p = _extend(this, properties);

		p.sprites = p.sprites || [];

	},
	Object, 
	{
		'width':0, 'height':0, 'source':null, 'sprites': undefined, cols: 1, rows:1, type: 'grid'
	},
	{

		/**
		 * Creates clip from spritesheet indexes. Takes an Array, Range or a list of arguments.
		 */
		clip: function(sprites)
		{
			return this.clip_array(arguments); 
		},

		clip_array: function(sprites)
		{
			var s = this.sprites(),
			    frames = []
			;

			for (i = 0; i < sprites.length; i++)
				frames.push([ s[sprites[i]] ]);

			return new Clip({ 'frames': frames });
		},

		clip_range: function(sprites)
		{
			return this.clipArray(sprites.to_a());
		},

		/**
		 * Returns a Sprite object from a section of the Spritesheet. It also adds it to the sprites list.
		 *
		 * @param r Rect structure. { x, y, w, h } or Rect array [ x, y, w, h ]
		 */
		cut: function(x, y, w, h)
		{
			var s = new Sprite(_typeof(x) == 'object' ? 
				{ width: r.w, height: r.h, source: { image: this.source().source(), x: r.x, y: r.y, w: r.w, h: r.h } }
			:
				{ width: w, height: h, source: { image: this.source().source(), 'x': x, 'y': y, 'w': w, 'h': h } }
			);

			this._p.sprites.push(s);

			return s;
		},

		/**
		 * Divides spritesheet into a grid of x rows and y columns.
		 */
		grid: function(x, y)
		{
			var s = this._p.sprites = [],
			    w = this.width() / x,
			    h = this.height() / y,
			    r,c,
			    src = this.source().source()
			;

			for (r=0; r < y; r++)
				for (c=0; c < x; c++)
					s.push(new Sprite({ source: { image: src, 'x': c * w, 'y': r * h, 'w': w, 'h': h }}));

			return this;
		}

	}
);

var 
	TextOldBegin;

Class(
	Text = function(properties)
	{
		if (typeof properties == 'string')
			properties = { text: properties };

		_extend(this, properties);
	},
	DisplayObject, 

	{ text: '', fillStyle: 'white', 'font': null },
	{
		begin : function()
		{
			TextOldBegin.apply(this);

			if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
			if (this._p.font) context.font = this._p.font;
		},

		paint : Draw.Text,

		width : function()
		{
			this.begin(); 
			var metrics = context.measureText(this.text());
			this.end();

			return metrics.width;
		}
	}
);

/* TODO This is an ugly hack. */
TextOldBegin = DisplayObject.prototype.begin;
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
/**
 * Executes code on FrameEnter.
 */
Action = function(properties)
{
	this.draw = (typeof properties == 'function') ? properties : properties.code;
	this.parent = function() { };
};

/**
 * Rotates object forever. Clockwise by default.
 */
Action.rotate = function(obj)
{
	return function() { 
		var r = obj.rotation();
		obj.rotation(r < 6.1 ? r+0.1 : 0);
	};
}

var f = function(klass)
{
	return function(properties) { return new klass(properties); }
};

/* MODULES */
$.Animate = Animate;
$.Draw = Draw;
$.Property = Property;
$.Util = Util;
$.Collision = Collision;

/* CLASSES */
$.Action = Action;
$.Clip   = Clip;
$.DisplayObject = DisplayObject;
$.Image = Image;
$.Range = Range;
$.Rect = Rect;
$.Sprite = Sprite;
$.Spritesheet = Spritesheet;
$.Text = Text;
$.Tween = Tween;
$.Physics = Physics;

$.action = f(Action);
$.clip   = f(Clip);
$.image  = f(Image);
$.range  = f(Range);
$.rect   = f(Rect);
$.sprite = f(Sprite);
$.spritesheet = f(Spritesheet);
$.text   = f(Text);
$.tween  = f(Tween);
$.physics= f(Physics);

})(this, document);
