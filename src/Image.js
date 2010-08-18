
Class(
	Image= function(properties)
	{
		if (typeof properties == 'string')
			properties = { source: properties };

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
