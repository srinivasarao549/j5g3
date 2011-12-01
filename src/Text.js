
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

	paint : Paint.Text,

	width : function()
	{
		this.begin(); 
		var metrics = context.measureText(this.text());
		this.end();

		return metrics.width;
	}
}).properties(
	{ text: '' }
),

