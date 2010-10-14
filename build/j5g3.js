/**
 * j5g3 v0.1 - Javascript Game Engine 
 * http://hackerhosting.com/j5g3
 *
 * Copyright 2010, Giancarlo Bellido
 *
 * Dual licensed under the MIT or GPL Version 2
 * http://jquery.org/license
 *
 * Date: 2010-10-14 19:40:28 -0400
 */

(function(window, document, undefined) {

	var VERSION = "0.1",
	    Action,
	    Animate,
	    // Requires js-class library.
	    Class,
	    Clip,
	    Collision,
	    DisplayObject,
	    Draw,
	    Image,
	    Physics,
	    Range,
	    Rect,
	    Sprite,
	    Spritesheet,
	    Text,
	    Tween,
	    Util,
	    J5G3,

	    canvas,
	    _extend,
	    _typeof,
	    context,

/* core.js defines $ */
	
$ = window.j5g3 = new (function()
{
	var 
		/* PRIVATE MEMBERS */
		self = this,
		callee = arguments.callee,

		getContext= function()
		{
			return context;
		},
		initialize = function(properties)
		{
			// TODO this is horrible.
			Class.properties.apply(callee, [{
				'canvas' : null,
				backgroundStyle : 'black',
				width  : 640,
				height : 480
			}]);	
			_extend(self, properties);

			if (self.canvas() === null)
				self.canvas($.id('screen'));

			self.__fps = 31;

			canvas = self.canvas();

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
		setInterval(this.gameLoop, this.__fps);
	};

	this.gameLoop = function()
	{
		self.background.draw();
		self.root.draw();
	}; 

	this.fps = function(val)
	{
		if (val === undefined) return 1000 / this.__fps;
		this.__fps = 1000 / val;
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
 * js-class
 *
 * Object Oriented Class Implementation in Javascript.
 *
 * To create a class use Object.extend({ methods });
 *
 */

window.Class = function() { };

/**
 *
 * Uses methods.init as the constructor. If not passed it will define a function and call the base
 * constructor. Sets 'super' as the base class.
 * 
 */
window.Class.extend = function(methods)
{
	var i,
	    init   = methods.init ? methods.init : function() { this.__super.apply(this, arguments); }
	;

	init.prototype = new this();

	for(i in methods)
		if (this[i]!=methods[i])
			init.prototype[i] = methods[i];

	init.properties = window.Class.properties;
	init.extend = window.Class.extend;
	init.prototype.__super = this;

	return init;
};
/*
 * Property emulation for Javascript
 */


/**
 * Define a property.
 */
window.property = function(name)
{
	var pid='__'+name;
	return function(val)
	{
		return (val===undefined) ? this[pid] : (this[pid]=val, this);
	}
}

/**
 * Define a read only property.
 */
window.property.read = function(name, def)
{
	var pid='__'+name;
	return function() { return this[pid]; }
}

/**
 * Define properties in props.
 * { name: default_value }
 */
window.Class.properties = function(props)
{
	var i;

	for (i in props)
		if (props[i] !== this[i])
		{
			this.prototype[i] = window.property(i);
			this.prototype['__'+i] = props[i];
		}

	return this;
};
/**
 * j5g3 Animation Module.
 * This is the first module included.
 */

Class = window.Class;

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
 * Extends Properties by initializing the _p object.
 *
 * @return obj._p Object
 */
_extend = function(obj, p)
{
	var i;

	for (i in p)
		obj['__'+i] = p[i];
	
	return obj;
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
	}

};

_typeof = Util.getType = function(obj)
	{
		var result = typeof(obj);

		if (result == 'object')
		{
			if (obj instanceof Array) return 'array';
			if (obj instanceof HTMLAudioElement) return 'audio';
			if (obj instanceof HTMLElement) return 'DOM';
			if (obj.init) return 'j5g3';
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
		context.drawImage(this.__source, 0, 0);	
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
DisplayObject = Class.extend({

	init: function(properties)
	{
		_extend(this, properties);
		this._dirty = true;
	}, 

	/**
	 * Save Transform Matrix and apply transformations.
	 */
	begin: function()
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
	end: function()
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
	pos: function(x, y)
	{
		this.__x = x;
		this.__y = y;

		return this.invalidate();
	},

	size: function(w, h)
	{
		this.__width = w;
		this.__height = h;
		return this.invalidate();
	},

	scale: function(sx, sy)
	{
		this.scaleX(sx);
		return this.scaleY(sy);
	},

	remove: function()
	{
		this.parent().remove_child(this);
	},

	visible: function()
	{
		return this.__alpha > 0;
	}
	
}).properties({
	source: null, parent: null, x: 0, y:0, width: null, height: null, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1
});
/**
 * j5g3 Clip
 *
 * Properties:
 *
 * frames	Array of array      Frames of clip.
 *
 */

Clip = DisplayObject.extend(
{
	init: function(properties)
	{
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
	frame : function() 
	{
		f = this.frames()[this._frame]; 
		if (this._playing)
			this.nextFrame();
		return f; 
	},

	totalFrames  : function() { return this.frames().length; },

	currentFrame : function() { return this.__frame; },

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
}).properties(
	{ frames: null }
);

/**
 * j5g3 Image Class
 *
 * Constructor takes properties object, a string with the id of an Image or an HTML Image Element.
 *
 * Properties
 *
 * source: 
 */
Image = DisplayObject.extend(
{
	init: function(properties)
	{
		switch(_typeof(properties)) {
		case 'string': 
			properties = { source: $.id(properties) }; break;
		case 'DOM':
			properties = { source: properties }; break;
		}

		_extend(this, properties);

		if (this.__source)
			this.source(this.__source);
	}, 

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
				this.__source = $.id(src);
			} else
				this.__source = src;

			if (this.__width === null)  this.width(this.__source.width);
			if (this.__height === null) this.height(this.__source.height);

			this.invalidate();
			return this;
		}
		return this.__source;
	}
	
});
/*
 * j5g3 Range Class
 *
 * Constructor takes a property object, or a start and end values.
 */
Range = Class.extend({

	init: function(start, end)
	{
		if (typeof start != 'object')
			start = { 'start': start, 'end': end };
			
		_extend(this, start);
	},
	to_a: function()
	{
		var i=this.__start, result=[],
		    e=this.end();

		for (; i < e; i++)
			result.push(i);

		return result;
	}
	
}).properties(
	{ start: 0, end: 0 }
);

/*
 * Displays a Rect
 */

Rect = DisplayObject.extend({

	init: function(properties)
	{
		_extend(this, properties);
	}, 
	paint : function()
	{
		if (this.__fillStyle) context.fillStyle = this.__fillStyle;

		context.fillRect(this.__x, this.__y, this.__width, this.__height);
	}

}).properties(
{
	fillStyle: null
});

/**
 * j5g3 Physics Class
 *
 * Properties
 *
 * obj     Object to apply physics to.
 * v       Velocity 2D Vector
 */

Physics = Class.extend({

	init: function(properties)
	{
		_extend(this, properties);
	},

	draw: function()
	{
		var o = this.__obj,
		    v = this.__v
		;

		o.x(o.x() + v[0]);
		o.y(o.y() + v[1]);
	},

	/**
	 * Applies force [fx, fy] for 1 frame.
	 */
	force: function(fx, fy, x, y)
	{
		var m = this.__m,
		    v = this.__v
		; 

		v[0] = (m*v[0]+fx)/m;
		v[1] = (m*v[1]+fy)/m;

		return this;
	},

	impulse: function()
	{
	},

	invalidate: function() { }
}).properties(
{
	obj: null, v: null, m: 1, parent: null
});

/*
 * j5g3 Sprite
 *
 * Properties:
 *
 * source     Object    { image: HTML_Image_Spritesheet, x: xpos, y: ypos, w: sprite_width, h: sprite_height }
 *
 */
Sprite = DisplayObject.extend({

	init: function(properties)
	{
		_extend(this, properties);
	},
	paint: Draw.Sprite
});
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

Spritesheet = Class.extend({

	init: function(properties)
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

		p.__sprites = p.__sprites || [];

	},

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
		    frames = [], i
		;

		for (i = 0; i < sprites.length; i++)
			frames.push([ s[sprites[i]] ]);

		return new Clip({ 'frames': frames });
	},

	clip_range: function(sprites)
	{
		return this.clip_array(sprites.to_a());
	},

	/**
	 * Returns a Sprite object from a section of the Spritesheet. It also adds it to the sprites list.
	 *
	 * @param r Rect structure. { x, y, w, h } or Rect array [ x, y, w, h ]
	 */
	cut: function(x, y, w, h)
	{
		var s = new Sprite(_typeof(x) == 'object' ? 
			{ width: x.w, height: x.h, source: { image: this.source().source(), 'x': x.x, 'y': x.y, 'w': x.w, 'h': x.h } }
		:
			{ width: w, height: h, source: { image: this.source().source(), 'x': x, 'y': y, 'w': w, 'h': h } }
		);

		this.__sprites.push(s);

		return s;
	},

	/**
	 * Divides spritesheet into a grid of x rows and y columns.
	 */
	grid: function(x, y)
	{
		var s = this.__sprites = [],
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

}).properties(
	{
		'width':0, 'height':0, 'source':null, 'sprites': null, cols: 1, rows:1, type: 'grid'
	}
);

var 
	TextOldBegin;

Text = DisplayObject.extend({

	init: function(properties)
	{
		if (typeof properties == 'string')
			properties = { text: properties };

		_extend(this, properties);
	},

	begin : function()
	{
		TextOldBegin.apply(this);

		if (this.__fillStyle) context.fillStyle = this.__fillStyle;
		if (this.__font) context.font = this.__font;
	},

	paint : Draw.Text,

	width : function()
	{
		this.begin(); 
		var metrics = context.measureText(this.text());
		this.end();

		return metrics.width;
	}
}).properties(
	{ text: '', fillStyle: 'white', 'font': null }
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
$.range  = function(a, b) { return new Range(a, b); };
$.rect   = f(Rect);
$.sprite = f(Sprite);
$.spritesheet = f(Spritesheet);
$.text   = f(Text);
$.tween  = f(Tween);
$.physics= f(Physics);

})(this, document);
