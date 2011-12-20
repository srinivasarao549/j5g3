Spritesheet = 

/**
 * @class Spritesheet Class
 *
 * Constructor can take properties object, a string with the filename, an HTML Image or j5g3 Image.
 *
 * Properties:
 *
 * source	Image of the spritesheet. If a string passed it will be converted to a j5g3.Image
 *
 */
j5g3.Spritesheet = Class.extend(/** @scope j5g3.Spritesheet.prototype */ {

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
	 * Creates clip from spritesheet indexes. Takes a variable number of arguments.
	 */
	clip: function()
	{
		return this.clip_array(arguments); 
	},

	clip_array: function(sprites)
	{
		var s = this.sprites(),
		    i,
		    sprite, 
		    // Make sure clip starts with no frames...
		    clip = new Clip({ frames: [] })
		;

		for (i = 0; i < sprites.length; i++)
			clip.add_frame([(typeof(sprite=sprites[i]) === 'number') ? (sprite=s[sprite]) : sprite ])
			    .size(sprite.__width, sprite.__height);

		return clip;
	},

	/**
	 * Creates a clip from a range
	 *
	 */
	clip_range: function(sprites)
	{
		return this.clip_array(sprites.to_a());
	},

	/**
	 * Cuts a sprite and returns the ss object.
	 */
	push: function(x, y, w, h)
	{
		this.cut(x, y, w, h);
		return this;
	},

	/**
	 * Returns a Sprite object from a section of the Spritesheet. It also adds it to the sprites list.
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
	 * Divides spritesheet into a grid of y rows and x columns and a border of b. By default b is 0.
	 */
	grid: function(x, y, b)
	{
		b = b || 0;

		var
		    b2= 2*b,
		    w = this.width() / x - b2,
		    h = this.height() / y - b2,
		    r,c,
		    src = this.source().source()
		;

		for (r=0; r < y; r++)
			for (c=0; c < x; c++)
				this.cut(c*(w+b2)+b, r*(h+b2)+b, w, h);

		return this;
	},

	/**
	 * Returns sprite at index 
	 */
	sprite: function(index)
	{
		return this.__sprites[index];
	},

	/**
	 * Returns a map with the sprites property set and the tw and th specified.
	 */
	map: function(tw, th)
	{
		return new Map({ sprites: this.__sprites, tw: tw, th: th });
	}

}).properties(
	{
		'width':0, 'height':0, 'source':null, 'sprites': null 
	}
),
