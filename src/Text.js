
Text = 
/**
 * @class j5g3.Text
 */
j5g3.Text = DisplayObject.extend({

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
		if (this.__strokeStyle) context.strokeStyle = this.__strokeStyle;
		if (this.__font) context.font = this.__font;
	},

	paint : Paint.Text,

	width : function()
	{
		this.begin(); 
		var metrics = context.measureText(this.text());
		this.end();

		return metrics.width;
	}
}).properties(
	{ text: '', strokeStyle: null, fillStyle: 'white', font: null }
),

/* TODO This is an ugly hack. */
TextOldBegin = DisplayObject.prototype.begin,

