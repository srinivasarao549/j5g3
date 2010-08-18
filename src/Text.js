
j5g3.Text = function(properties)
{
	if (typeof properties == 'string')
		properties = { text: properties };

	properties = j5g3.extend({ fillStyle: 'white' }, properties);

	j5g3.DisplayObject.apply(this, [ properties ]);
	j5g3.properties(this, ['text', 'fillStyle', 'font']);

	this._applyContext = function(context)
	{
		if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
		if (this._p.font) context.font = this._p.font;
	};

	this.paint = function(context)
	{
		this._applyContext(context);
		context.fillText(this.text(), 0, 0);
	};

	this.width = function()
	{
		var ctx = j5g3.Engine.canvas().getContext('2d');
		this._applyContext(ctx);
		var metrics = ctx.measureText(this.text());
		return metrics.width;
	};
};
