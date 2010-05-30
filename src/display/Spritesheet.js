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
