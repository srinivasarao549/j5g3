
var 
	TextOldBegin;

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
		begin : function()
		{
			TextOldBegin.apply(this, [context]);

			if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
			if (this._p.font) context.font = this._p.font;
		},

		paint : Draw.Text,

		width : function()
		{
			var ctx = canvas.getContext('2d');
			this.begin(ctx); 
			var metrics = ctx.measureText(this.text());

			return metrics.width;
		}
	}
);

/* TODO This is an ugly hack. */
TextOldBegin = DisplayObject.prototype.begin;
