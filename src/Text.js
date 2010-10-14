
var 
	TextOldBegin;

Text = DisplayObject.extend({

	init: function(properties)
	{
		if (typeof properties == 'string')
			properties = { text: properties };

		_extend(this, properties);
	},

	begin : function()
	{
		TextOldBegin.apply(this);

		if (this.__fillStyle) context.fillStyle = this.__fillStyle;
		if (this.__font) context.font = this.__font;
	},

	paint : Draw.Text,

	width : function()
	{
		this.begin(); 
		var metrics = context.measureText(this.text());
		this.end();

		return metrics.width;
	}
}).properties(
	{ text: '', fillStyle: 'white', 'font': null }
);

/* TODO This is an ugly hack. */
TextOldBegin = DisplayObject.prototype.begin;
