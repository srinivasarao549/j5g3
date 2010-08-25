
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
