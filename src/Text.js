
Class(
	Text = function(properties)
	{
		if (typeof properties == 'string')
			properties = { text: properties };

		_extend(this, properties);
	},
	DisplayObject, 

	{ text: '', fillStyle: 'white', 'font': null },
	{
		_applyContext : function(context)
		{
			if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
			if (this._p.font) context.font = this._p.font;
		},

		paint : function(context)
		{
			this._applyContext(context);
			context.fillText(this.text(), 0, 0);
		},

		width : function()
		{
			var ctx = canvas.getContext('2d');
			this._applyContext(ctx);
			var metrics = ctx.measureText(this.text());
			return metrics.width;
		}
	}
);
