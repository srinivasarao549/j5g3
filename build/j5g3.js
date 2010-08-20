/**
 * j5g3 v0.1 - Javascript Game Engine 
 * http://hackerhosting.com/j5g3
 *
 * Copyright 2010, Giancarlo Bellido
 *
 * Dual licensed under the MIT or GPL Version 2
 * http://jquery.org/license
 *
 * Date: 2010-08-20 00:09:35 -0400
 */

(function(window, document, undefined) {

	var VERSION = "0.1",
	    Action,
	    Animate,
	    Clip,
	    Class,
	    DisplayObject,
	    Draw,
	    Image,
	    Property,
	    Range,
	    Rect,
	    Sprite,
	    Spritesheet,
	    Text,
	    Util,

	    canvas,
	    _extend,
	    _typeof,

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
			return canvas.getContext('2d');
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
				self._p.canvas = document.getElementById('screen');

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
			canvas.addEventListener('click', self.onClick, false);

			properties.start($, document);
		}
	;

	this._p = { };

	/**
	 * Starts the execution.
	 */
	this.run= function()
	{
		setInterval(this.gameLoop, this._p.fps);
	};


	this.gameLoop = function()
	{
		var context = getContext();

		self.background.draw(context);
		self.root.draw(context);
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


Animate = { 

	Easing: 
	{
		None: function( )
		{
		},

		RegularOut: function()
		{
			return 0;	
		}
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
		return (val === undefined) ? this._p[name] :
			this._p[name] = val, this.invalidate();
	};
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
	Image: function (context)
	{
		context.drawImage(this._p.source, 0, 0);	
	},
	
	/**
	 * Drawing function for Clips
	 */
	Sprite: function (context) 
	{
		var src = this.source(), 
		    w = this.width(), 
		    h = this.height()
		;

		context.drawImage(src.image, src.x, src.y, src.w, src.h, 0, 0, w ? w : src.w, h ? h : src.h);
	},

	Container: function (context)
	{
		var frame = this.frame();

		for (var i in frame)
			frame[i].draw(context);
	},

	Text: function(context)
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
		this._p = { }
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
	begin : function(context)
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
	end : function(context)
	{
		context.restore();
	},

	/**
	 * Applies Transformations and paints Object in the screen.
	 * To define your custom DisplayObject class implement the paint() function. The paint function receives
	 * the current context for drawing.
	 */
	draw : function(context)
	{
		this.begin(context);
		this.paint(context);
		this.end(context);
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
	 * Collision Check
	 */
	collidesWith : function(obj)
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
	},

	/**
	 * Sets x and y
	 */
	pos : function(x, y)
	{
		this._p.x = x;
		this._p.y = y;
		this.invalidate();
		return this;
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
		};

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

/**
 * j5g3 Image Class
 *
 * Constructor takes properties object, a string with the filename or a HTML Image Element.
 *
 * Properties
 *
 * source: 
 */
Class(
	Image= function(properties)
	{
		switch(_typeof(properties)) {
		case 'string': case 'DOM':
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
				this._p.source = new window.Image;
				this._p.source.src = src;
			} else
				// TODO we assume its an image...
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
		paint : function(context)
		{
			if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;

			context.fillRect(this._p.x, this._p.y, this._p.width, this._p.height);
		}
	}
);

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
		
		_extend(this, properties);
	},
	Object, 
	{
		'width':0, 'height':0, 'source':null, 'sprites':0, cols: 1, rows:1, type: 'grid'
	},
	{

		/**
		 * Creates clip from spritesheet indexes. Takes 
		 */
		clip : function()
		{
			return this.clipArray(arguments); 
		},

		clipArray: function(sprites)
		{
			var s = this.sprites(),
			    frames = []
			;

			for (i = 0; i < sprites.length; i++)
				frames.push([ s[sprites[i]] ]);

			return new Clip({ 'frames': frames });
		},

		clipRange: function(sprites)
		{
			return this.clipArray(sprites.to_a());
		},

		/**
		 * Divides spritesheet into a grid of x rows and y columns.
		 */
		grid : function(x, y)
		{
			var s = [],
			    w = this.width() / x,
			    h = this.height() / y
			;

			for (var r = 0; r < x; r++)
				for (var c = 0; c < x; c++)
					s.push(new Sprite({ source: { image: this.source().source(), 'x': c * w, 'y': r * h, 'w': w, 'h': h }}));

			this._p.sprites = s;

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
		begin : function(context)
		{
			TextOldBegin.apply(this, [context]);

			if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
			if (this._p.font) context.font = this._p.font;
		},

		paint : Draw.Text,

		width : function()
		{
			var ctx = canvas.getContext('2d');
			this.begin(ctx); 
			var metrics = ctx.measureText(this.text());

			return metrics.width;
		}
	}
);

/* TODO This is an ugly hack. */
TextOldBegin = DisplayObject.prototype.begin;
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

    $.Action = Action;
    $.Animate = Animate;
    $.Clip   = Clip;
    $.DisplayObject = DisplayObject;
    $.Draw = Draw;
    $.Image = Image;
    $.Property = Property;
    $.Range = Range;
    $.Rect = Rect;
    $.Sprite = Sprite;
    $.Spritesheet = Spritesheet;
    $.Text = Text;
    $.Util = Util;

})(this, document);
