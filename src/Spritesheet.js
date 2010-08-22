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
