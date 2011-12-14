
Image = 

/**
 * @class Image Class
 *
 * Constructor takes properties object, a string with the id of an Image or an HTML Image Element.
 *
 * @extends j5g3.DisplayObject
 */
j5g3.Image = DisplayObject.extend(
/** @scope j5g3.Image.prototype */ {
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

	paint: Paint.Image,

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

			return this.invalidate();
		}
		return this.__source;
	}
	
}),
