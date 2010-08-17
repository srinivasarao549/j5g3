/**
 * JS Game Engine
 *
 * Core Library.
 */

(function(window, undefined) {

	
	var Engine = function()
	{
		this.canvas = document.getElementById('screen');
		this.fps    = 100;
		this.backgroundStyle = 'black';
		this.width  = 640;
		this.height = 480;

	var 
		self = this,
		canvas = this.canvas,

		getContext= function()
		{
			return self.canvas.getContext('2d');
		},
		gameLoop= function()
		{
			var context = getContext();

			self.background.draw(context);
			self.root.draw(context);
		};

		/**
		 * Starts the execution.
		 */
		this.run= function()
		{
			setInterval(gameLoop, this.fps);
		};

		this.initialize = function()
		{
			this.background = new j5g3.Rect({ fillStyle: this.backgroundStyle, width: this.width, height: this.height });
			
			this.root = new j5g3.Clip({ width: this.width, height: this.height });

			canvas.width = this.width;
			canvas.height = this.height;
			canvas.addEventListener('click', this.onClick, false);
		};
	
		/**
		 * You should always call this method first.
		 */
		this.start= function(initfunc)
		{
			this.initialize();
			initfunc(this);
		};
	};

	window.j5g3 = new Engine();
})(window);



(function($, undefined) {

	/**
	 * This are all the core drawing algorithms. "this" will point to the DisplayObject.
	 */
	$.Draw = 
	{
		Image: function (context)
		{
			context.drawImage(this.source(), 0, 0);	
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
		}

	};

})(j5g3);
/**
 *
 * j5g3 Utilities
 */

(function($, undefined) {

	/**
	 * Extends object a with b
	 */
	$.Util.extend= function(a, b)
	{
		for (var i in b)
			a[i] = b[i];
		return a;
	};

	/**
	 * Extends Caller with b
	 * @param b is the class to extend
	 */
	$.Util.inherits= function(obj, klass, args)
	{
		klass.apply(obj, args);
	};

})(j5g3);

j5g3.Action = function(properties)
{
	this.draw = (typeof properties == 'function') ? properties : properties.code;
	this.parent = function() { };
};

/**
 * Rotates object forever. Clockwise by default.
 */
j5g3.Action.rotate = function(obj)
{
	return function() { 
		var r = obj.rotation();
		obj.rotation(r < 6.1 ? r+0.1 : 0);
	};
}



j5g3.Animate = { };

j5g3.Animate.Easing =
{
	None: function( )
	{
	},

	RegularOut: function()
	{
		return 0;	
	}
};
/**
 *
 * Properties:
 *
 * canvas:   Canvas object where the game will be rendered. If not present it will default to element with id 'screen'.
 *
 *
 *
 */




j5g3.Util = {


	getType: function(obj)
	{
		var result = typeof(obj);

		if (result == 'object')
		{
			if (obj instanceof Array)
				result = 'array';
			else if (obj._j5g3===true)
				result = 'j5g3';
		}

		return result;
	}

};

/**
 * j5g3
 *
 * display.Spritesheet
 *
 * Properties:
 *
 * source	Image of the spritesheet. If a string passed it will be converted to a j5g3.Image
 *
 */
j5g3.Spritesheet = function(properties)
{
	if (typeof properties == 'string')
		properties = { source: new j5g3.Image(properties) };

	if (typeof properties.source == 'string')
		properties.source = new j5g3.Image(properties.source);
	
	if (properties.width === undefined && properties.source)
		properties.width = properties.source.width();
	
	if (properties.height === undefined && properties.source)
		properties.height = properties.source.height();
	
	this._p = j5g3.extend({ cols: 1, rows: 1, type: 'grid' }, properties);

	j5g3.properties(this, ['width', 'height', 'source', 'sprites']);
	
	/**
	 * Creates clip from spritesheet indexes.
	 */
	this.clip = function()
	{
		var s = this.sprites(),
		    frames = []
		;

		for (i = 0; i < arguments.length; i++)
			frames.push([ s[arguments[i]] ]);

		return new j5g3.Clip({ 'frames': frames });
	};

	/**
	 * Divides spritesheet into a grid of x rows and y columns.
	 */
	this.grid = function(x, y)
	{
		var s = [],
		    w = this.width() / x,
		    h = this.height() / y
		;

		for (var r = 0; r < x; r++)
			for (var c = 0; c < x; c++)
				s.push(new j5g3.Sprite({ source: { image: this.source().source(), 'x': c * w, 'y': r * h, 'w': w, 'h': h }}));

		this._p.sprites = s;

		return this;
	};
}

/**
 * Base for all classes
 */
j5g3.DisplayObject = function(properties)
{
	this._j5g3 = true;
	this._p = {
		x: 0, y:0, width: null, height: null, rotation: 0, scaleX: 1, scaleY: 1, alpha: 1
	};

	j5g3.extend(this._p, properties);

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

	/**
	 * Define Basic Properties.
	 */
	j5g3.properties(this, ['alpha', 'width', 'height', 'x', 'y', 'scaleX', 'scaleY', 'rotation', 'parent']);

	/**
	 * Sets position of the object according to alignment and container.
	 */
	this.align = function(alignment, container) 
	{
		switch (alignment) {
		case 'center': 	this.x(container.width() / 2); 	break;
		case 'left':    this.x(0); break;
		case 'right':   this.x(container.width() - this.width()); break;
		case 'middle':  this.y(container.height() / 2); break;
		}
		return this;
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

	/**
	 * Sets x and y
	 */
	this.pos = function(x, y)
	{
		this._p.x = x;
		this._p.y = y;
		this.invalidate();
		return this;
	}
};
/*
 * j5g3 Sprite
 *
 * Properties:
 *
 * source     Object    { image: HTML_Image_Spritesheet, x: xpos, y: ypos, w: sprite_width, h: sprite_height }
 *
 */
j5g3.Sprite = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	this.paint = j5g3.Engine.algorithms.drawSprite;
}

j5g3.Image = function(properties)
{
	if (typeof properties == 'string')
		properties = { source: properties };

	j5g3.DisplayObject.apply(this, [ properties ]);

	this.paint = j5g3.Engine.Draw.Image;

	
	/**
	 * Sets the source. If src is a string it will create an Image object.
	 * NOTE: Chrome and Safari (webkit) loads images and css parallely. So we have to wait for the image to load in order
	 * to get the correct width and height. 
	 */
	this.source = function(src)
	{
		if (src)
		{
			if (typeof(src)=='string')
			{
				this._p.source = new Image;
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

	if (this._p.source)
		this.source(this._p.source);
}

j5g3.Rect = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	this.fillStyle = function(value) { return value ? (this.invalidate(), (this._p.fillStyle = value), this) : this._p.fillStyle; };

	this.paint = function(context) {
		if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
		context.fillRect(this._p.x, this._p.y, this._p.width, this._p.height);
	};
};

j5g3.Text = function(properties)
{
	if (typeof properties == 'string')
		properties = { text: properties };

	properties = j5g3.extend({ fillStyle: 'white' }, properties);

	j5g3.DisplayObject.apply(this, [ properties ]);
	j5g3.properties(this, ['text', 'fillStyle', 'font']);

	this._applyContext = function(context)
	{
		if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
		if (this._p.font) context.font = this._p.font;
	};

	this.paint = function(context)
	{
		this._applyContext(context);
		context.fillText(this.text(), 0, 0);
	};

	this.width = function()
	{
		var ctx = j5g3.Engine.canvas().getContext('2d');
		this._applyContext(ctx);
		var metrics = ctx.measureText(this.text());
		return metrics.width;
	};
};
/**
 * j5g3 Clip
 *
 * Properties:
 *
 * frames	Array of array      Frames of clip.
 *
 */
j5g3.Clip = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	if (!this._p.frames)
		this._p.frames = [ [ ] ];

	this._frame = 0;
	this._playing = true;

	j5g3.property(this, 'frames');

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

	/**
	 * Updates frame.
	 *
	 */
	this.nextFrame = function() 
	{
		this._frame = (this._frame < this.totalFrames()-1) ? this._frame + 1 : 0; 
	}

	this.paint = j5g3.Engine.Draw.Container;

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

		display_object.parent(this);
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

	this.animateTo = function(target, duration, alg)
	{
		var start = {};

		if (alg===undefined)
			alg = j5g3.Animate.Easing.None;

		for (var p in target)
			start[p] = target;

		return function() {
			alg(start, target, this._iframe);			
		};
	}

};
/**
 * Matrix Library for JSGE
 */

/**
 * Matrix class
 * Constructor takes elements as:
 * new j5g3.Matrix([1, 3, 4]) => Creates a 1x3 Matrix
 * new j5g3.Matrix([[1, 3, 4], [1,3,4]]) => Creates a 2x3 Matrix
 */
j5g3.Matrix = function(elements)
{
	this._elements = (arguments.length > 1) ? [ arguments ] : elements;


	/**
	 * A.add(B) - returns A + B
	 */
	this.add = function(B)
	{
		return this.map(function(v, r, c) { return v + B.e(r,c); });
	};

	/**
	 * Appends matrix B to the right hand side
	 */
	this.augment = function(B)
	{
		var A = this;
		return j5g3.Matrix.Func(this.rows(), this.cols() + B.cols(), function(r, c) {
			return (c >= A.cols()) ? B.e(r, c-A.cols()) : A.e(r, c);
		});
	}

	/**
	 * Returns Column n as a vector.
	 */
	this.col = function(n)
	{
		var a = [];
		for (var i = 0; i < this.rows(); i++)
			a.push(this.e(i, n));

		return new j5g3.Matrix([ a ]);
	};

	/**
	 * Returns number of columns
	 */
	this.cols = function()
	{
		return this._elements[0].length;
	};

	/**
	 * Returns determinant.
	 */
	this.determinant = function()
	{
		if (this.rows() == 2)
			return this.e(0,0) * this.e(1,1) - this.e(0, 1)*this.e(1,0);

		var i = 0;
		
	};

	/**
	 * Returns its leading diagonal elements as a vector.
	 */
	this.diagonal = function()
	{
		a = [];
		for (var i = 0; i < this.rows(); i++)
			a.push(this.e(i, i));
		return new j5g3.Matrix([ a ]);
	};

	/**
	 * Returns a copy of the matrix.
	 */
	this.duplicate = function()
	{
		return new j5g3.Matrix(this._elements.slice(0));
	};

	/**
	 * Returns elements at nth row and mth column.
	 */
	this.e = function(n, m)
	{
		return this._elements[n][m];
	};

	/**
	 * Calls func for every element of the matrix as func(value, row, column)
	 */
	this.each = function(func)
	{
		for (var r = 0; r < this.rows(); r++)
			for (var c = 0; c < this.rows(); c++)
				func(this.e(r,c), r, c);
	};

	/**
	 * Returns true if matrix is equal to B
	 */
	this.eq = function(B)
	{
		for (var y=0; y < this.rows(); y++)
			for (var x = 0; x<this.cols(); x++)
				if (this.e(y,x) != B.e(y,x))
					return false;
		return true;
	};

	this.gaussian = function()
	{	
		var cols = this.cols();
		var rows = this.rows();
		var pivot, c, r, i;
		var arr = this._elements.slice(0);

		for (c = 0; c < cols-1; c++)
			for (r=0; r < rows; r++)
			{
				pivot = this.e(r, c) / this.e(c, c);
				if (r != c)
				{
					for (i = 0; i < cols; i++)
						arr[r][i] = this.e(r, i) - pivot * this.e(c, i);
				}
			}

		for (i = 0; i < rows; i++)
		{
			arr[i][cols-1] /= arr[i][i];
			arr[i][i] = 1;
		}

		return new j5g3.Matrix(arr);
	};

	/**
	 * Returns the inverse of the matrix.
	 */
	this.inverse = function()
	{
		var m = this.augment(new j5g3.Matrix.I(this.rows()));
		m = m.gaussian();		

	//	m.slice(0, this.rows());
		return m;
	};

	/**
	 * Returns true if the matrix is singular ( zero determinant )
	 */
	this.is_singular = function()
	{
		return this.determinant === 0;
	};

	/**
	 * Returns true if the matrix is square
	 */
	this.is_square = function()
	{
		return this.rows() == this.cols();
	};

	/**
	 * Returns a new matrix with the result of func(element, row, col) for every element.
	 */
	this.map = function(func)
	{
		var result = [];
		this.each(function(v, r, c) {
			if (!result[r]) result[r] = [];

			result[r][c] = func(v, r, c);
		});

		return new j5g3.Matrix(result);
	};

	/**
	 * Returns Max Value
	 */
	this.max = function()
	{
		var result;
		this.each(function(v) { if (v > result) result = v; });
		return result;
	};

	/**
	 * Returns minimum value
	 */
	this.min = function()
	{
		var result;
		this.each(function(v) { if (v < result) result = v; });
		return result;
	};

	this.multiply = function()
	{
		
	};

	/**
	 * Returns a copy of the matrix with all its elements rounded
	 */
	this.round = function()
	{
		return this.map(function(v) { return Math.round(v); });	
	};

	/**
	 * Returns row n as a vector
	 */
	this.row = function(n)
	{
		return new j5g3.Matrix([this._elements[n]]);
	};

	/**
	 * Returns number of rows
	 */
	this.rows = function()
	{
		return this._elements.length;
	};

	/**
	 * Slices elements from row r col c to end.
	 */
	this.slice = function(r, c)
	{
		var rows = this.rows();
		for (var i = r; i < rows; i++)
			this._elements[i] = this._elements[i].slice(c);
	};

	this.substract = function(B)
	{		
		return this.map(function(v, r, c) { return v - B.e(r, c); });
	};

	this.to_right_triangular = function()
	{
		
	};

	this.to_str = function(precision)
	{
		if (precision===undefined)
			precision = 4;

		var len = precision + 3;
		var result = '';

		var pad = function(n)
		{
			var x = n.toPrecision(precision);
			if (x.length < len)
				for (var i = 0; i <= len- x.length; i++)
					x += ' ';
			return x;
		};

		for (var r = 0; r < this.rows(); r++)
		{
			result += '[ ';
			for (var c = 0; c < this.cols(); c++)
				result += pad(this.e(r, c)) + ' ';
			result += "]\n";
		}

		return result;
	}

	this.trace = function()
	{
	};

	this.transpose = function()
	{
	};
}

/**
 * Constructor.
 * Returns a n * m matrix where all the elements are calculated by function func.
 */
j5g3.Matrix.Func = function(n, m, func)
{
	var a = [];
	for (var y = 0; y < n; y++)
	{
		a[y] = [];
		for (var x = 0; x < m; x++)
			a[y].push(func(y,x));
	}

	return new j5g3.Matrix(a);
}

/**
 * Constructor.
 * Returns a square matrix whose leading-diagonal elements are the values in the array elements and whose off diagonal elements are zero.
 */
j5g3.Matrix.Diagonal = function()
{
	var elems = arguments;
	return j5g3.Matrix.Func(arguments.length, arguments.length, function(x,y) { return x == y ? elems[y] : 0; });
}

/**
 * Constructor
 * Returns the n*n identity matrix.
 */
j5g3.Matrix.I = function(n)
{
	return j5g3.Matrix.Func(n, n, function(x,y) { return x == y ? 1 : 0 });
};

/**
 * Constructor
 * Returns a matrix with n rows and m columns where all the elements are random numbers between 0 and 1.
 * If m is undefined it will create a n*n matrix.
 */
j5g3.Matrix.Random = function(n, m)
{
	return j5g3.Matrix.Func(n, m === undefined ? n : m, function() { return Math.random(); });
}

/**
 * Constructor
 * Returns a matrix with n rows and m columns where all the elements are zero.
 */
j5g3.Matrix.Zero = function(n, m)
{
	return j5g3.Matrix.Func(n, m, function() { return 0; });
}
/**
 * Property Class
 *
 */

(function($, undefined) {

	/**
	 * Declares a j5g3 Property.
	 * @param prop       Property name
	 */
	$.Property = function(caller, name)
	{
		caller[prop] = function(val) { 
			if (val!==undefined)
			{
				caller.invalidate();
				caller._p[prop] = val;
				return caller;
			}
			return caller._p[prop];
		};
		
		return caller[prop];
	};

	$.Property.get = function(caller, prop) {
		caller[prop] = function () { return caller._p[prop]; }; 
		return caller[prop]; 
	};

	/**
	 * Defines multiple properties for a j5g3 class
	 */
	$.Property.define = function(obj, prop_array)
	{
		var i;
		for (i in prop_array)
			j5g3.property(obj, prop_array[i]);
	};

})(j5g3);
