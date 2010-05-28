
j5g3.Image = function(properties)
{
	if (typeof properties == 'string')
		properties = { source: properties };

	j5g3.DisplayObject.apply(this, [ properties ]);

	this.paint = j5g3.Engine.algorithms.drawImage;

	/**
	 * Sets the source. If src is a string it will create an Image object.
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
