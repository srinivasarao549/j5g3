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
