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

Class(
	Spritesheet = function(properties)
	{
		if (typeof properties == 'string')
			properties = { source: new Image(properties) };

		if (typeof properties.source == 'string')
			properties.source = new Image(properties.source);
		
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
		 * Creates clip from spritesheet indexes.
		 */
		clip : function()
		{
			var s = this.sprites(),
			    frames = []
			;

			for (i = 0; i < arguments.length; i++)
				frames.push([ s[arguments[i]] ]);

			return new Clip({ 'frames': frames });
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
