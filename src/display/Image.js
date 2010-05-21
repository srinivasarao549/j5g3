
j5g3.Image = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	if (typeof(this._p.source)=='string')
	{
		this._p.source = new Image;
		this._p.source.src = properties.source;
	}

	if (this._p.width === null)  this._p.width  = this._p.source.width;
	if (this._p.height === null) this._p.height = this._p.source.height;
	
	this.paint = j5g3.Engine.algorithms.drawImage;
}
