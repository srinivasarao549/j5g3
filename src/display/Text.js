
j5g3.Text = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	this.text = function() { return this._p.text; };
	this.paint = function(context)
	{
		if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
		context.fillText(this.text(), 0, 0);
	};
};
