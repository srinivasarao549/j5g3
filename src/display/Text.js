
j5g3.Text = function(properties)
{
	if (typeof properties == 'string')
		properties = { text: properties };

	properties = j5g3.extend({ fillStyle: 'white' }, properties);

	j5g3.DisplayObject.apply(this, [ properties ]);
	j5g3.properties(this, ['text', 'fillStyle']);

	this.paint = function(context)
	{
		if (this._p.fillStyle) context.fillStyle = this._p.fillStyle;
		context.fillText(this.text(), 0, 0);
	};
};
